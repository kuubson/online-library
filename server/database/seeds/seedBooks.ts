import { faker } from '@faker-js/faker'

import { Book } from 'database'

export const seedBooks = async (amount: number) => {
   await Book.findAll().then(async books => {
      await Promise.all(books.map(book => book.destroy()))
   })

   console.log('✅ Old books wiped out')

   for (let x = 0; x < amount; x++) {
      console.log(`📚 ${x + 1}/${amount} books added`)

      const price = Math.floor(Number(faker.finance.amount(2, 10)))

      await Book.create({
         title: faker.random.words(3),
         author: faker.name.fullName(),
         cover: faker.image.imageUrl(640, 480, 'nature', true),
         price: x % 2 === 0 ? price : null,
      })
   }

   console.log('✅ New books seeded')
}
