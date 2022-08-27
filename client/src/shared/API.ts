import swagger from './swagger.json'

const { paths } = swagger

type Path = keyof typeof paths

export const API = Object.keys(paths).reduce(
   (acc, path) => ({
      ...acc,
      [path]: path,
   }),
   {}
) as Record<Path, Path>
