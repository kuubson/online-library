import styled from 'styled-components/macro'

import { RegistrationContainer } from 'components/guest/Registration/Registration'

import HomeButton from 'components/guest/Registration/modules/HomeButton'
import Input from 'components/guest/Registration/modules/Input'

import * as StyledRegistration from 'components/guest/Registration/styled'

import { usePasswordRecovery } from './hooks'

const UserPasswordRecoveryContainer = styled(RegistrationContainer)``

const UserPasswordRecovery = () => {
    const {
        form: { password, passwordError, repeatedPassword, repeatedPasswordError },
        formHandler: { handleInputValue, validatePassword, validateRepeatedPassword },
        changePassword
    } = usePasswordRecovery()
    return (
        <UserPasswordRecoveryContainer>
            <HomeButton />
            <StyledRegistration.Form onSubmit={changePassword}>
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Type your password..."
                    error={passwordError}
                    onChange={event => {
                        handleInputValue(event)
                        validatePassword(event.target.value, repeatedPassword, false)
                    }}
                />
                <Input
                    id="repeatedPassword"
                    label="Repeat Password"
                    type="password"
                    value={repeatedPassword}
                    placeholder="Type your password again..."
                    error={repeatedPasswordError}
                    onChange={event => {
                        handleInputValue(event)
                        validateRepeatedPassword(event.target.value, password)
                    }}
                />
                <StyledRegistration.Submit>Change password</StyledRegistration.Submit>
            </StyledRegistration.Form>
        </UserPasswordRecoveryContainer>
    )
}

export default UserPasswordRecovery
