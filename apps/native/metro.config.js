/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path')

module.exports = {
   projectRoot: path.resolve(__dirname, '../../'),
   resolver: { blacklistRE: /apps\\server\\/ },
   transformer: {
      getTransformOptions: async () => ({
         transform: {
            experimentalImportSupport: false,
            inlineRequires: false,
         },
      }),
   },
}
