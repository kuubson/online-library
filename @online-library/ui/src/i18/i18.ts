import { get } from 'lodash'

import { en } from './translations/en'

type Path<T, Key extends keyof T> = Key extends string
   ? T[Key] extends Record<string, unknown>
      ?
           | `${Key}.${Path<T[Key], Exclude<keyof T[Key], keyof unknown[]>> & string}`
           | `${Key}.${Exclude<keyof T[Key], keyof unknown[]> & string}`
      : never
   : never

type PickPath<T> = Path<T, keyof T> | keyof T

type DotPick<T> = PickPath<T> extends string | keyof T ? PickPath<T> : keyof T

export const t = (path: DotPick<typeof en>) => get(en, path)
