module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@lib': './src/lib',
            '@common': './src/common',
            '@typings': './src/typings',
            '@repositories': './src/repositories',
            "@utils": "./src/utils",
            "@style": "./src/style",
          },
        },
      ],
      'react-native-reanimated/plugin',
    ]
  };
};
