import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import getCookie from '../../resources/helpers/getCookie'

import MainBackground from '../../assets/img/MainBackground.jpg'
import Navbar from '../../sharedComponents/Navbar/Navbar'
import ProfileBooks from './ProfileBooks'
import BookUploader from '../BookUploader/BookUploader'
import ProfileModal from './ProfileModal/ProfileModal'
import Loader from '../../sharedComponents/Loader/Loader'

const ProfileWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${MainBackground}) center center no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Profile = props => {
    const shouldBookUploaderAppear = useSelector(state => state.global.shouldBookUploaderAppear)
    const shouldProfileModalAppear = useSelector(state => state.global.shouldProfileModalAppear)
    const isLoading = useSelector(state => state.global.isLoading)
    useLayoutEffect(() => {
        if (!getCookie('token')) props.history.push('/login')
    }, [])
    return (
        <ProfileWrapper>
            <Navbar profile />
            <ProfileBooks />
            {shouldBookUploaderAppear && <BookUploader />}
            {/* {shouldProfileModalAppear && <ProfileModal />} */}
            {isLoading && <Loader />}
        </ProfileWrapper>
    )
}

export default Profile