import type { Application } from 'express'
import express from 'express'
import path from 'path'

import { initializeCsrf } from './csrf'

export const serveClient = async (app: Application) => {
   initializeCsrf(app)

   const buildPath = '../../../client/build'

   app.use(express.static(path.resolve(__dirname, buildPath)))

   app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, buildPath, 'index.html')))
}
