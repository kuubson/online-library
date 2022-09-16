import { Router } from 'express'

import { handleMulterFile } from 'middlewares'

import {
   getChatDetails,
   getMessages,
   sendFile,
   sendMessage,
   subscribeNotifications,
} from '../services/chat'

export const Chat = Router()

Chat.route('/messages')
   .get(
      /**
      #swagger.summary = "Chat messages"
      #swagger.description = `
         ✔️ Returns some of the previous messages (implements infinite scroll) <br />
         ✔️ Mark messages as read by user that requested this endpoint <br />
      `
      #swagger.parameters['obj'] = {
         in: 'query',
         required: true,
         schema: { $ref: "#/definitions/get@messages" }
      } 
      #swagger.responses[200] = {
         description: 'Return array of messages',
         schema: [{ $ref: '#/definitions/schema@message' }],
      }  
*/
      ...getMessages
   )
   .post(
      /**
      #swagger.summary = "Sending message"
      #swagger.description = `
         ✔️ Sends text message to others <br />
         ✔️ Sends push notification <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/post@messages" }
      } 
      #swagger.responses[200] = { description: 'Message has been sent' }  
*/
      ...sendMessage
   )

Chat.post(
   /**
      #swagger.summary = "Sending file"
      #swagger.description = `
         ✔️ If file is an image it reduces its size <br />
         ✔️ Validates size & extension of the file <br />
         ✔️ Uploads file to cloudinary <br />
         ✔️ Sends file / image / video to others <br />
         ✔️ Sends proper push notification <br />
      `
      #swagger.requestBody = {
         required: true,
         content: { $ref: "#/definitions/post@files" }
      } 
      #swagger.responses[200] = { 
         description: 'File has been sent',
         schema: { $ref: '#/definitions/schema@file' },
      } 
      #swagger.responses[422] = { description: 'File has not been attached' }  
      #swagger.responses[415] = { description: 'Such file is not supported' }  
      #swagger.responses[413] = { description: 'File size too large' }  
*/
   '/files',
   handleMulterFile,
   ...sendFile
)

Chat.post(
   /**
      #swagger.summary = "Push notifications"
      #swagger.description = `
         ✔️ Stores web push subscription detail in the database <br />
         ✔️ Creates many subscriptions per user (user can use multiple devices) <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/post@notifications" }
      } 
      #swagger.responses[200] = { description: 'Subscription has been saved' } 
*/
   '/notifications',
   ...subscribeNotifications
)

Chat.get(
   /**
      #swagger.summary = "Chat details"
      #swagger.description = `
         ✔️ Returns info related to chatting <br />
         ✔️ Counts how many messages user missed since last view <br />
         ✔️ Returns index of last undread message so user can easily scroll to it <br />
      `
      #swagger.responses[200] = { 
         description: 'Details returned',
         schema: { $ref: '#/definitions/schema@chat-details' },
      } 
*/
   '/details',
   ...getChatDetails
)
