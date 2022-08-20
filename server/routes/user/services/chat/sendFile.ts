/* eslint-disable object-curly-newline */
import cloudinary from 'cloudinary'
import { NextFunction, Response } from 'express'

import { Connection } from 'database'

import { deleteTemporaryFile } from 'helpers'

import { ApiError, baseUrl, filesInfo } from 'utils'

import { ExpressError } from 'types'
import { UserRequest } from 'types/express'
import { MulterRequest } from 'types/multer'

import { sendNotificationsForOtherUsers } from './helpers'

export const sendFile = async (
   req: UserRequest & MulterRequest,
   res: Response,
   next: NextFunction
) => {
   try {
      await Connection.transaction(async transaction => {
         const {
            regex: { images, videos, files },
            sizes: { maxImageSize, maxVideoSize, maxFileSize },
         } = filesInfo

         const { mimetype, originalname, path, size } = req.file

         const isImage = images.test(mimetype) || images.test(originalname)
         const isVideo = videos.test(mimetype) || videos.test(originalname)
         const isFile = files.test(mimetype) || files.test(originalname)

         if (!isImage && !isVideo && !isFile) {
            throw new ApiError('Sending a file', 'You cannot send a file with this extension', 500)
         }

         let sizeError = false

         if (isImage) {
            if (size > maxImageSize) {
               sizeError = true
            }
         }

         if (isVideo) {
            if (size > maxVideoSize) {
               sizeError = true
            }
         }

         if (isFile) {
            if (size > maxFileSize) {
               sizeError = true
            }
         }

         if (sizeError) {
            throw new ApiError('Sending a file', 'You cannot send this large file', 500)
         }

         const { id, name } = req.user

         let type, content, cloudinaryId

         switch (true) {
            case isImage:
               type = 'IMAGE'
               break
            case isVideo:
               type = 'VIDEO'
               break
            case isFile:
               type = 'FILE'
               break
            default:
               throw new ApiError(
                  'Sending a file',
                  'There was an unexpected problem when sending the file',
                  500
               )
         }

         let message = ''

         if (type === 'IMAGE') {
            message = `${name} has sent a new image`

            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
               use_filename: true,
            })

            content = secure_url
            cloudinaryId = public_id
         }

         if (type === 'VIDEO') {
            message = `${name} has sent a new video`

            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
               resource_type: 'video',
               use_filename: true,
            })

            content = secure_url
            cloudinaryId = public_id
         }

         if (type === 'FILE') {
            message = `${name} has sent a new file`

            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
               resource_type: 'raw',
               use_filename: true,
            })

            content = secure_url
            cloudinaryId = public_id
         }

         deleteTemporaryFile(path)

         await req.user.createMessage(
            {
               type,
               content,
               filename: originalname,
               readBy: id,
               cloudinaryId,
            },
            { transaction }
         )

         sendNotificationsForOtherUsers(id, {
            tag: id,
            title: `From ${name}`,
            body: message,
            icon: 'https://picsum.photos/1920/1080',
            data: {
               userName: name,
               url: `${baseUrl(req)}/chat`,
            },
         })

         res.send({
            type,
            content,
         })
      })
   } catch (error) {
      deleteTemporaryFile(req.file.path)

      const emptyTextFile = (error as ExpressError).message === 'Empty file'

      if (emptyTextFile) {
         return next(new ApiError('Sending a file', 'The selected text file is empty', 422))
      }

      next(error)
   }
}
