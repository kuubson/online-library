import { useEffect } from 'react'

const Redirect = ({ history }) => {
    useEffect(() => {
        history.push('/login');
    })
    return null;
}

export default Redirect
