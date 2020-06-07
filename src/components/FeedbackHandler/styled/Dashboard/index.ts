const exports: any = {}

const req = require.context('./', false, /^\.\/(?!index).*\.ts$/)

req.keys().forEach(fileName => {
    const exportName = fileName.replace('./', '').replace('.ts', '')
    exports[exportName] = req(fileName).default
})

export default exports
