import { lowerCase } from 'lodash'
import * as _yup from 'yup'

const errorForRequiredProperty = (path: string) => `${lowerCase(path)} is required`

_yup.setLocale({ mixed: { required: ({ path }) => errorForRequiredProperty(path) } })

export const yup = _yup
