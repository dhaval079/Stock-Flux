import cx from 'classnames';
import React from 'react';
import Components from 'stockflux-components';
import './ToolBar.css';

export default ({ tools, style }) => {
  return (
    <div className={style}>
      {tools
        .filter(tool => tool.visible)
        .map((tool, index) => (
          <Components.Buttons.Round
            key={index}
            onClick={() => tool.onClick()}
            disabled={!!tool.disabled}
            className={cx({ [tool.className]: tool.className })}
          >
            {tool.label}
            {tool.description}
          </Components.Buttons.Round>
        ))}
    </div>
  );
};
