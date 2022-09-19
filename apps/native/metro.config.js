/* eslint-disable no-undef */
module.exports = {
   transformer: {
      getTransformOptions: async () => ({
         transform: {
            experimentalImportSupport: false,
            inlineRequires: true,
         },
      }),
   },
}
