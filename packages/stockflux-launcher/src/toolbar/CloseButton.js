import React from 'react';
import Components from 'stockflux-components';
import { OpenfinApiHelpers } from 'stockflux-core';

export default (
  <Components.Popups.ConfirmationWindow
    message="Are you sure you wish to quit?"
    onConfirm={() => OpenfinApiHelpers.getCurrentWindowSync().close()}
  >
    <Components.Shortcuts.Close />
  </Components.Popups.ConfirmationWindow>
);
