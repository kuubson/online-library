import { NextFunction } from 'express'
import fs from 'fs'
import sharp from 'sharp'

import { deleteTemporaryFile } from 'helpers'

import { ApiError } from 'utils'

export const reduceImageSize = async (path: string, next: NextFunction) =>
   await sharp(path)
      .rotate()
      .resize(800)
      .jpeg({ quality: 75 })
      .toBuffer((error, buffer) => {
         if (error) {
            deleteTemporaryFile(path)
            next(
               new ApiError(
                  'Sending a file',
                  'There was an unexpected problem when sending the file',
                  500
               )
            )
         }
         fs.writeFileSync(path, buffer)
         next()
      })
