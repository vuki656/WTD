import { GoogleSignin } from '@react-native-community/google-signin'
import * as React from 'react'
import { LogBox } from 'react-native'

import { useAuthInit } from './lib/hooks/useAuthInit/useAuthInit'
import { generateTasks } from './lib/utils/generateTasks'
import { getCurrentUser } from './lib/utils/getCurrentUser'
import { Home } from './modules/Home'
import { Login } from './modules/Login'

GoogleSignin.configure({
    webClientId: '529897088428-hudun0c47un7u9d04uvr6gt3lbovroof.apps.googleusercontent.com',
})

LogBox.ignoreAllLogs()

// TODO: TURNING OFF FIREBASE SUBS
export const App: React.FunctionComponent = () => {
    const { isLoading, isUserAuthenticated } = useAuthInit()

    const user = getCurrentUser()

    React.useEffect(() => {
        void generateTasks(user?.uid)
    }, [])

    if (isLoading) {
        return null
    }

    return isUserAuthenticated ? <Home /> : <Login />
}
