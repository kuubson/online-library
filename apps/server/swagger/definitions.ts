import { MESSAGE_TYPES } from '@online-library/config'

export const authToken = {
   in: 'cookie',
   name: 'authToken',
   type: 'apiKey',
   description: 'Auth token (jwt) generated with /login or /login/fb',
}

export const createdAt = {
   type: 'string',
   format: 'date-time',
}

export const updatedAt = {
   type: 'string',
   format: 'date-time',
}

export const contentFile = {
   type: 'string',
   format: 'uri',
   'qt-uri-protocols': ['https'],
   // NOTE: should match with FILE_EXTENSIONS
   'qt-uri-extensions': [
      'jpg',
      'jpeg',
      'png',
      'mp4',
      'txt',
      'rtf',
      'doc',
      'docx',
      'xlsx',
      'ppt',
      'pptx',
      'pdf',
   ],
   description: 'Link to uploaded resource',
   example:
      'https://res.cloudinary.com/onlinelibrary-storage/raw/upload/v1662546764/111296ee27d2a82152225969d92eb660a16d16b041d3712e0ee860ae01ed78a8e01bc77f4b888fb0681cebba0ec619bb10012b3a3cfee8c_fbhuen.txt',
}

export const fileType = {
   type: 'string',
   enum: MESSAGE_TYPES,
}

const emptyString = {
   type: 'string',
   maxLength: 0,
   required: true,
}

const _title = {
   type: 'string',
   required: true,
   description: 'Title to search for. It takes precedence over the author',
   example: 'Let it Be',
}

export const title = { anyOf: [_title, emptyString] }

const _author = {
   type: 'string',
   required: true,
   description: 'Author to search for',
   example: 'Craig Nicolas',
}

export const author = { anyOf: [_author, emptyString] }

export const withProfile = {
   type: 'boolean',
   required: true,
   description:
      'If true, it searches books assigned to the user. Otherwise searches in the whole store',
}

export const content = {
   type: 'string',
   required: true,
   description: 'Message to others',
}

export const lastUnreadMessageIndex = {
   type: 'integer',
   required: true,
   description: 'Index of last unread message',
}

export const unreadMessagesAmount = {
   type: 'integer',
   required: true,
   description: 'Amount of missed messages',
}

export const userId = {
   type: 'integer',
   required: true,
   description: 'Id of logged in user',
}

export const file = {
   type: 'string',
   format: 'binary',
   required: true,
}

export const jwt = {
   type: 'string',
   required: true,
   description: 'jwt token',
   example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
}

export const name = {
   type: 'string',
   required: true,
   example: 'John',
}

export const integer = (example?: number) => ({
   type: 'integer',
   required: true,
   example: example ?? 13,
})

export const email = {
   type: 'string',
   format: 'email',
   required: true,
   example: 'john@onlinelibrary.com',
}

export const password = {
   type: 'string',
   required: true,
   example: '2hIq8^spf2',
}

export const access_token = {
   type: 'string',
   required: true,
   description: 'Access token generated with FB auth',
   example: 'EAAG6VehVAPMBAK30w7QenD65zUARr9d4P3yQf44X5anasd6QnjtEtXH2c7TG234fsBMchb4Pe',
}

export const stripePaymentId = {
   type: 'string',
   required: true,
   description: 'Payment method id, created with stripejs package on the client side',
   example: 'pm_1LeJuTCA0Hw88eOYpY9kEDWK',
}

export const products = {
   type: 'array',
   items: { type: 'integer' },
   required: true,
   description: 'Array of book ids to purchase',
   example: [1, 5, 9, 11],
}

export const paypalPaymentId = {
   type: 'string',
   required: true,
   description: 'Payment id generated after submitting paypal checkout',
   example: 'PAYID-MMKLWRQ82689537V0194325L',
}

export const paypalPayerId = {
   type: 'string',
   required: true,
   description: 'Payer id generated after submitting paypal checkout',
   example: 'KVYVDZAMZGRRA',
}

export const endpoint = {
   type: 'string',
   format: 'uri',
   'qt-uri-protocols': ['https'],
   description: 'Subscription details (check out https://www.npmjs.com/package/web-push)',
   example:
      'https://fcm.googleapis.com/fcm/send/d61c5u920dw:APA91bEmnw8utjDYCqSRplFMVCzQMg9e5XxpYajvh37mv2QIlISdasBFLbFca9ZZ4Uqcya0ck-SP84YJUEnWsVr3mwYfaDB7vGtsDQuEpfDdcIqOX_wrCRkBW2NDWRZ9qUz9hSgtI3sY',
}

export const expirationTime = { anyOf: [{ type: 'integer' }, { type: 'null' }] }

export const p256dh = {
   type: 'string',
   required: true,
   example:
      'BL7ELU24fJTAlH5Kyl8N6BDCac8u8li_U5PIwG963MOvdYs9s7LSzj8x_7v7RFdLZ9Eap50PiiyF5K0TDAis7t0',
}

export const keys = {
   type: 'object',
   additionalProperties: false,
   properties: {
      p256dh,
      auth: {
         type: 'string',
         required: true,
         example: 'juarI8x__VnHvsOgfeAPHg',
      },
   },
}

export const id = { type: 'integer' }

export const filename = {
   type: 'string',
   description: 'Name of uploaded file',
   example: 'text.txt',
}

export const readBy = {
   type: 'string',
   description: 'String as joined array of user ids that read certain message',
   example: '1,51,62,6,23',
}

export const cloudinaryId = {
   anyOf: [{ type: 'integer' }, { type: 'null' }],
   description: 'Id of resource kept at cloudinary',
   example:
      '1c644911e2118030c4884278c6835ccd79e0062959dcaa15af09861ae82c2e7bb73b4d53cf7a865255f1d01d2c15653748986ec09ccfb61b0e0163ce_o8qd1l',
}

export const user = {
   type: 'object',
   properties: { name: { type: 'string' } },
}

export const price = {
   anyOf: [{ type: 'integer' }, { type: 'null' }],
   description: 'Price in $',
   example: 14,
}

export const cover = {
   type: 'string',
   format: 'uri',
   'qt-uri-protocols': ['https'],
   example: 'https://loremflickr.com/640/480/nature?78445',
}

export const paypalLink = {
   type: 'string',
   required: true,
   description: 'Link to paypal checkout generated with /paypalCheckout',
   example:
      'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-27H754218P7505C',
}
