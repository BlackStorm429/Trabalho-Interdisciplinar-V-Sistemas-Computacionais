const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.server = {
  rewriteRequestUrl: (url) => {
    if (!url.endsWith('.bundle') && !url.endsWith('.map')) {
      return url;
    }
    return url;
  },
};

module.exports = config;
