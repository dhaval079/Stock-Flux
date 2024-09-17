import React, { useRef, useState, useEffect, useReducer } from 'react';
import Components from 'stockflux-components';
import { StockFlux } from 'stockflux-core';
import NewsItem from './components/news-item/NewsItem';
import { useOptions } from 'openfin-react-hooks';
import './App.css';

const SEARCHING = 'searching';
const SUCCESS = 'success';
const ERROR = 'error';

const initialSearchState = {
  isSearching: false,
  hasErrors: false,
  results: []
};

function App() {
  const searchReducer = (state, { type, results }) => {
    switch (type) {
      case SEARCHING:
        return {
          ...state,
          hasErrors: false,
          isSearching: true,
          results: []
        };
      case SUCCESS:
        return {
          ...state,
          isSearching: false,
          results
        };
      case ERROR:
        return {
          ...state,
          hasErrors: true,
          isSearching: false,
          results: []
        };
      default:
        throw new Error();
    }
  };

  const [searchState, dispatch] = useReducer(searchReducer, initialSearchState);
  const [symbol, setSymbol] = useState(null);
  const [options] = useOptions();
  const listContainer = useRef(null);

  const { isSearching, results } = searchState;

  useEffect(() => {
    if (options && options.customData.symbol) {
      setSymbol(options.customData.symbol);
    }
  }, [options, setSymbol, symbol]);

  useEffect(() => {
    if (symbol) {
      dispatch({ type: SEARCHING });
      StockFlux.getSymbolNews(symbol)
        .then(results => {
          dispatch({ type: SUCCESS, results });
        })
        .catch(() => dispatch({ type: ERROR }));
    }
  }, [symbol]);

  return (
    <div className="stockflux-news">
      <Components.Titlebar title="News" />
      <Components.ScrollWrapperY>
        <div className="container" ref={listContainer}>
          {isSearching ? (
            <div className="spin-container">
              <Components.Spinner />
            </div>
          ) : results.length > 0 ? (
            results.map((newsItem, index) => (
              <NewsItem
                key={index}
                headline={newsItem.title}
                source={newsItem.source}
                copy={newsItem.summary}
                link={newsItem.url}
                time={newsItem.time}
              />
            ))
          ) : (
            <div className="no-articles">
              Sorry, no news stories found for that symbol.
            </div>
          )}
        </div>
      </Components.ScrollWrapperY>
    </div>
  );
}

export default App;
