import { faker } from '@faker-js/faker'

import { Book } from 'database'

export const seedBooks = async () => {
   for (let x = 0; x < 200; x++) {
      const title = faker.random.words(3)

      await Book.create({
         title,
         author: faker.name.fullName(),
         cover: `https://picsum.photos/${Math.floor(
            Math.random() * (1800 - 999 + 1) + 999
         )}/${Math.floor(Math.random() * (1600 - 1001 + 1) + 1001)}`,
         price: x % 2 === 0 ? Math.floor(Math.random() * (2 - 10 + 1) + 10) : null,
      })

      console.log(title)
   }
}
