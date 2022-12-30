import { ROLES } from '@online-library/config'

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
   'schema@ethereal-email': {
      type: 'object',
      properties: {
         url: {
            type: 'string',
            format: 'uri',
            'qt-uri-protocols': ['https'],
         },
      },
   },
   'schema@role': {
      type: 'object',
      properties: {
         role: {
            type: 'string',
            enum: ROLES,
         },
      },
   },
   'schema@mobile-app': {
      type: 'object',
      properties: {
         apk: {
            type: 'string',
            format: 'uri',
            'qt-uri-protocols': ['https'],
            'qt-uri-extensions': ['.apk'],
         },
         // ipa: { type: 'string' }, // TODO: uncomment once IPA is ready
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
