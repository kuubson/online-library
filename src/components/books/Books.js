import React from 'react'

import FreeBooks from './FreeBooks'
import PaidBooks from './PaidBooks'

const Books = () => {
    return (
        <div className="books">
            <FreeBooks />
            <PaidBooks />
        </div>
    )
}

export default Books
