import * as OpenfinApiHelpers from '../openfin-api-utils/openfinApiHelpers';

const createChildWindow = async options => {
  const childWindows = await OpenfinApiHelpers.getChildWindows();
  const currentOptions = await OpenfinApiHelpers.getCurrentWindowOptions();

  options.uuid = currentOptions.uuid;
  for (let i = 0; i < childWindows.length; i++) {
    const childWindowOptions = await childWindows[i].getOptions();
    if (childWindowOptions.name === options.name) {
      if (childWindows[i]) {
        childWindows[i].bringToFront();
        return true;
      }
      break;
    }
  }

  await OpenfinApiHelpers.createWindow(options);
  return true;
};

const getChildWindowOptions = async manifest => {
  const manifestUrl =
    typeof manifest === 'string' ? manifest : manifest.manifest;

  const response = await fetch(manifestUrl);
  if (!response.ok) {
    throw new Error('Could not retrieve manifest');
  }

  const body = await response.json();
  return body.startup_app;
};

export const launchChildWindow = async (manifest, modifyOptions) => {
  modifyOptions = modifyOptions === undefined ? o => o : modifyOptions;

  return await createChildWindow(
    modifyOptions(await getChildWindowOptions(manifest))
  );
};
