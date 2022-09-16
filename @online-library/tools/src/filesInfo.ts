const regex = {
   images: /jpg|jpeg|png|gif/i,
   videos: /mp4/i,
   files: /txt|rtf|doc|docx|xlsx|ppt|pptx|pdf/i,
}

const sizes = {
   maxImageSize: 31457280, // 30 mb
   maxVideoSize: 52428800, // 50 mb
   maxFileSize: 10485760, // 10 mb
}

export const filesInfo = {
   regex,
   sizes,
}
