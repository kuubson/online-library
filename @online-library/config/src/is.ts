export const isProd = process.env.NODE_ENV === 'production'

export const isWeb = typeof document !== 'undefined'

export const isProdWeb = isProd && isWeb
