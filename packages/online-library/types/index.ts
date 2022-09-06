import type swagger from '../src/swagger.json'

export type Role = 'guest' | 'user'

export type Paths = typeof swagger.paths

export type Errors = {
   [Method in keyof Paths]: {
      [Property in keyof Paths[Method]]: Paths[Method][Property] extends { responses: object }
         ? Record<keyof Paths[Method][Property]['responses'], string>
         : undefined
   }
}

/**
 * TODO: tweak this type, check out recursive type traversals
 * once it grabs types of Path['post'] it skips types of other methods
 */

type MethodsOfPaths = {
   [Path in keyof typeof swagger.paths]: typeof swagger.paths[Path] extends { post: object }
      ? typeof swagger.paths[Path]['post']
      : typeof swagger.paths[Path] extends { get: object }
      ? typeof swagger.paths[Path]['get']
      : typeof swagger.paths[Path] extends { put: object }
      ? typeof swagger.paths[Path]['put']
      : typeof swagger.paths[Path] extends { delete: object }
      ? typeof swagger.paths[Path]['delete']
      : undefined
}

export type PropertiesOfPathMethods = MethodsOfPaths[keyof MethodsOfPaths]
