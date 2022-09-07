import fs from 'fs'

export const deleteTemporaryFile = (path: string) => {
   try {
      fs.existsSync(path) && fs.unlinkSync(path)
   } catch (error) {}
}
