import { check } from 'express-validator'

import { Connection } from '@database'

export default async (req, res, __) => {
    await Connection.transaction(async transaction => {
        const { content } = req.body
        await req.user.createMessage(
            {
                type: 'MESSAGE',
                content
            },
            {
                transaction
            }
        )
        res.send({
            success: true
        })
    })
}

export const validation = () => [check('content').trim().isString().bail()]
