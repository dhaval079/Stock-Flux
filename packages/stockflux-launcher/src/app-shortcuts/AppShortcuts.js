import React, { useEffect, useState } from 'react';
import { OpenfinApiHelpers } from 'stockflux-core';
import Components from 'stockflux-components';
import './AppShortcuts.css';

export default ({ showTitle }) => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    OpenfinApiHelpers.getAllApps()
      .then(setApps)
      .catch(console.error);
  }, []);

  return (
    <div className="app-shortcuts">
      {apps
        .filter(
          app =>
            app.customConfig !== undefined &&
            app.customConfig.showInLauncher &&
            app.appId.indexOf('stockflux-') === 0
        )
        .map(app => {
          const AppShortcut =
            Components.Shortcuts[
              app.appId
                .split('stockflux-')[1]
                .charAt(0)
                .toUpperCase() + app.appId.slice(11)
            ];
          return (
            <AppShortcut
              key={app.appId}
              symbol="TSLA"
              name="Tesla"
              small={false}
              title={showTitle && app.title}
            />
          );
        })}
      {apps
        .filter(
          app =>
            app.customConfig !== undefined &&
            app.customConfig.showInLauncher &&
            app.appId.indexOf('stockflux-') === -1
        )
        .map(app => {
          return (
            <Components.Shortcuts.External
              key={app.appId}
              className="shortcut"
              manifest={app}
              small={false}
            ></Components.Shortcuts.External>
          );
        })}
    </div>
  );
};
