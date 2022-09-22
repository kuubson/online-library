import cloudinary from 'cloudinary'

import { API, ApiError, filesInfo, randomImage } from '@online-library/core'

import { Connection } from 'database'
import type { Message } from 'database/models/Message'

import { deleteTemporaryFile, sendNotificationsForOtherUsers } from 'helpers'

import { baseUrl } from 'utils'

import type { InitialBody, InitialCookies, InitialQuery, ProtectedRoute } from 'types/express'

const { header, errors } = API['/api/user/chat/files'].post

export const sendFile: ProtectedRoute<InitialBody, InitialCookies, InitialQuery, false> = [
   async (req, res, next) => {
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
               throw new ApiError(header, errors[415], 415)
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
               throw new ApiError(header, errors[413], 413)
            }

            const { id, name } = req.user

            const type: Message['type'] = isImage
               ? 'IMAGE'
               : isVideo
               ? 'VIDEO'
               : isFile
               ? 'FILE'
               : 'MESSAGE'

            let content = ''
            let cloudinaryId = ''
            let message = ''

            if (type === 'IMAGE') {
               message = `${name} sent an image`

               const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                  use_filename: true,
               })

               content = secure_url
               cloudinaryId = public_id
            }

            if (type === 'VIDEO') {
               message = `${name} sent a video`

               const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                  resource_type: 'video',
                  use_filename: true,
               })

               content = secure_url
               cloudinaryId = public_id
            }

            if (type === 'FILE') {
               message = `${name} sent a file`

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
                  readBy: id as unknown as string,
                  cloudinaryId,
               },
               { transaction }
            )

            sendNotificationsForOtherUsers(id, {
               tag: id,
               title: `From ${name}`,
               body: message,
               icon: randomImage,
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
         next(error)
      }
   },
]
