import { API, ApiError, filesInfo } from '@online-library/tools'

import { multerFile } from 'middlewares'

import { reduceImageSize } from 'helpers'

import type { InitialBody, InitialCookies, InitialQuery, Middleware } from 'types/express'

const { header, errors } = API['/api/user/chat/files'].post

export const handleMulterFile: Middleware<
   InitialBody,
   InitialCookies,
   InitialQuery,
   'protected'
> = (req, res, next) =>
   multerFile.single('file')(req, res, () => {
      try {
         if (!req.file) {
            throw new ApiError(header, errors[400], 400)
         }

         const { images } = filesInfo.regex

         const { mimetype, originalname, path } = req.file

         const isImage = images.test(mimetype) || images.test(originalname)

         if (isImage) {
            return reduceImageSize(path, next)
         }

         next()
      } catch (error) {
         next(error)
      }
   })
