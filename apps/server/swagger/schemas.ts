import { roles } from '@online-library/tools'

import {
   cloudinaryId,
   contentFile,
   cover,
   createdAt,
   fileType,
   filename,
   id,
   lastUnreadMessageIndex,
   paypalLink,
   price,
   readBy,
   unreadMessagesAmount,
   updatedAt,
   user,
   userId,
} from './definitions'

export const schemas = {
   'schema@role': {
      type: 'object',
      properties: {
         role: {
            type: 'string',
            enum: roles,
         },
      },
   },
   'schema@book': {
      type: 'object',
      properties: {
         id,
         createdAt,
         updatedAt,
         title: {
            type: 'string',
            example: 'Hound Dog',
         },
         author: {
            type: 'string',
            example: 'Nina Barton',
         },
         cover,
         price,
      },
   },
   'schema@chat-details': {
      type: 'object',
      properties: {
         lastUnreadMessageIndex,
         unreadMessagesAmount,
         userId,
      },
   },
   'schema@file': {
      type: 'object',
      properties: {
         type: fileType,
         content: contentFile,
      },
   },
   'schema@message': {
      type: 'object',
      properties: {
         id,
         createdAt,
         updatedAt,
         type: fileType,
         content: contentFile,
         filename,
         readBy,
         cloudinaryId,
         userId: id,
         user,
      },
   },
   'schema@paypal-link': paypalLink,
}
