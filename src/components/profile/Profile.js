import React from 'react'

import Navbar from '../navbar/Navbar'
import NavbarLink from '../navbar/NavbarLink'
import BorrowedBooks from './BorrowedBooks';
import BoughtBooks from './BoughtBooks';

const Profile = () => {
    return (
        <div className="profile darkfullsize">
            <Navbar>
                <NavbarLink name="Home" where="/account" />
                <NavbarLink name="Cart" where="/cart" />
                <NavbarLink name="Logout" where="/logout" />
            </Navbar>
            <div className="books">
                <BoughtBooks />
                <BorrowedBooks />
            </div>
        </div>
    )
}

export default Profile
