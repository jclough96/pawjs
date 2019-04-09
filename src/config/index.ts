import defaultsDeep from 'lodash/defaultsDeep';
import defaultConfig from './defaults.json';

interface IConfig {
  port?: string;
  host?: string;
  appRootUrl?: string;
  cdnUrl?: string;
  serverSideRender?: boolean;
  serviceWorker?: boolean;
  singlePageApplication?: boolean;
  asyncCSS?: boolean;
  polyfill?: string;
  clientRootElementId?: string;
  hstsEnabled?: boolean;
  hstsmaxAge?: number;
  hstsIncludeSubDomains?: boolean;
  hstsPreload?: boolean;
  resourcesBaseUrl?: string;
  hashedRoutes?: boolean;
  react?: string;
}
let config: IConfig = {};
try {
  const pawConfigPath = process.env.PAW_CONFIG_PATH;
  if (typeof pawConfigPath !== 'undefined') {
    // eslint-disable-next-line
    config = require(pawConfigPath);
  }
} catch (ex) {
  config = {};
}
config = defaultsDeep(config, defaultConfig);

if (config.appRootUrl && config.appRootUrl.startsWith('http')) {
  throw new Error(
    'App root url cannot have a scheme in the string. should be like \'/\' or \'/subdir\'',
  );
}
if (config.appRootUrl && config.appRootUrl.endsWith('/')) {
  config.appRootUrl = config.appRootUrl.replace(/\/$/, '');
}

// Calculate resource base url via options provided by config itself!
let resourcesBaseUrl = config.cdnUrl ? config.cdnUrl : config.appRootUrl;
if (resourcesBaseUrl && !resourcesBaseUrl.endsWith('/')) {
  resourcesBaseUrl = `${resourcesBaseUrl}/`;
}
config.resourcesBaseUrl = resourcesBaseUrl;

// Give higher priority to env PORT than any other settings, until and unless changed by user
// in hook beforeStart!
if (
  typeof process.env.PORT !== 'undefined'
  && process.env.PORT.length
  && process.env.PORT.trim().length
) {
  config.port = process.env.PORT.trim();
}

// If not set hashedRoutes, and staticoutput is set, then set hashedRoutes to true
if (typeof config.hashedRoutes === 'undefined' && config.singlePageApplication) {
  config.hashedRoutes = true;
}

// Managing polyfill
if (config.polyfill) {
  config.polyfill = config.polyfill.toLowerCase();
}

if (config.polyfill !== 'cdn' && config.polyfill !== 'internal') {
  config.polyfill = 'internal';
}

if (config.react) {
  config.react = config.react.toLowerCase();
}

if (config.react !== 'cdn' && config.react !== 'internal') {
  config.react = 'internal';
}

export default Object.assign({}, config);