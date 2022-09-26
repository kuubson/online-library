import type { HasId } from 'types'

export const RATE_LIMITER_WINDOW_MS = 5 * 60 * 1000 // 5 min

export const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7 days

export const GRAPHQL_WS_CLOSE_STATUS = 4401

export const MESSAGES_FETCH_LIMIT = 20

export const RANDOM_IMAGE = 'https://picsum.photos/1920/1080'

export const FALLBACK_IMAGE = `https://picsum.photos/1920/108${Math.floor(Math.random() * 10)}`

export const FILE_SIZES = {
   maxImageSize: 31457280, // 30MB
   maxVideoSize: 52428800, // 50MB
   maxFileSize: 10485760, // 10MB
}

export const FILE_EXTENSIONS = {
   images: /jpg|jpeg|png|gif/i,
   videos: /mp4/i,
   files: /txt|rtf|doc|docx|xlsx|ppt|pptx|pdf/i,
}

export const MESSAGES_ORDER = (a: HasId, b: HasId) => a.id - b.id

export const MESSAGE_TYPES = ['MESSAGE', 'IMAGE', 'VIDEO', 'FILE'] as const

export const ROLES = ['guest', 'user'] as const

export const FB_FIELDS = 'id,first_name,email'
