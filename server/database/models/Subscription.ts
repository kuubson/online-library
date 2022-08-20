import { Model, STRING, Sequelize } from 'sequelize'

class SubscriptionValues extends Model {
   id: number
   endpoint: string
   p256dh: string
   auth: string
}

export class Subscription extends SubscriptionValues {
   dataValues: SubscriptionValues
}

const SubscriptionModel = (sequelize: Sequelize) => {
   Subscription.init(
      {
         endpoint: {
            type: STRING,
            allowNull: false,
         },
         p256dh: {
            type: STRING,
            allowNull: false,
         },
         auth: {
            type: STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'subscription',
      }
   )
   return Subscription
}

export default SubscriptionModel
