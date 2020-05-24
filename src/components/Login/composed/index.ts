const exports: any = {}

const req = require.context('./', false, /^\.\/(?!index).*\.tsx$/)

req.keys().forEach(fileName => {
    const exportName = fileName.replace('./', '').replace('.tsx', '')
    exports[exportName] = req(fileName).default
})

export default exports
