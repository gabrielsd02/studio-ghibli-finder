module.exports = function(api) {
    api.cache(true);
    return {
      plugins: [
        "@babel/plugin-syntax-import-assertions"
      ],
    };
};
  