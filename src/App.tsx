import { GoogleSignin } from '@react-native-community/google-signin'
import * as React from 'react'

import { useAuthInit } from './lib/hooks/useAuthInit/useAuthInit'
import { initErrorSuppression } from './lib/utils/initErrorSuppression'
import { Home } from './modules/Home'
import { Login } from './modules/Login'

GoogleSignin.configure({
    webClientId: '529897088428-hudun0c47un7u9d04uvr6gt3lbovroof.apps.googleusercontent.com',
})

initErrorSuppression()

export const App: React.FunctionComponent = () => {
    const { isLoading, isUserAuthenticated } = useAuthInit()

    if (isLoading) {
        return null
    }

    return isUserAuthenticated ? <Home /> : <Login />
}
