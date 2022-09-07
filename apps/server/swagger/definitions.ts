export const book = {
   type: 'object',
   properties: {
      id: {
         type: 'integer',
         example: 13,
      },
      createdAt: {
         type: 'string',
         format: 'date-time',
         example: '2022-08-28T19:41:46.422Z',
      },
      updatedAt: {
         type: 'string',
         format: 'date-time',
         example: '2022-08-28T19:41:46.422Z',
      },
      title: {
         type: 'string',
         example: 'Hound Dog',
      },
      author: {
         type: 'string',
         example: 'Nina Barton',
      },
      cover: {
         type: 'string',
         format: 'uri',
         'qt-uri-protocols': ['https'],
         example: 'https://loremflickr.com/640/480/nature?78445',
      },
      price: {
         anyOf: [{ type: 'integer' }, { type: 'null' }],
         description: 'Price in $',
         example: 14,
      },
   },
}

export const getSuggestions = {
   type: 'object',
   properties: {
      title: {
         type: 'string',
         required: true,
         description: 'Title to search for. It takes precedence over the author',
         example: 'Let it Be',
      },
      author: {
         type: 'string',
         required: true,
         description: 'Author to search for',
         example: 'Craig Nicolas',
      },
      withProfile: {
         type: 'boolean',
         required: true,
         description:
            'If true, it searches books assigned to the user. Otherwise searches in the whole store',
      },
   },
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

export const paypalApprovalLink = {
   type: 'string',
   required: true,
   description: 'Link to paypal checkout generated with /createPayPalPayment',
   example:
      'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-27H754218P7505C',
}
