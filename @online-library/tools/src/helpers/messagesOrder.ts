type HasId = {
   id: number
   [key: string]: any
}

export const messagesOrder = (a: HasId, b: HasId) => a.id - b.id
