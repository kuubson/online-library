import type { NextFunction } from 'express'
import fs from 'fs'
import sharp from 'sharp'

import { API, ApiError } from '@online-library/tools'

import { deleteTemporaryFile } from 'helpers'

const { header, errors } = API['/api/user/chat/files'].post

export const reduceImageSize = async (path: string, next: NextFunction) =>
   sharp(path)
      .rotate()
      .resize(800)
      .jpeg({ quality: 75 })
      .toBuffer((error, buffer) => {
         if (error) {
            deleteTemporaryFile(path)
            next(new ApiError(header, errors[500], 500))
         }

         fs.writeFileSync(path, buffer)

         next()
      })
