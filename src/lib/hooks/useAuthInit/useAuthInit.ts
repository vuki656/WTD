import type { FirebaseAuthTypes } from '@react-native-firebase/auth'
import auth from '@react-native-firebase/auth'
import React from 'react'

import type { UseAuthValue } from './useAuthInit.types'

export const useAuthInit = (): UseAuthValue => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null)

    React.useEffect(() => {
        const unsubscribe = auth().onIdTokenChanged((receivedUser) => {
            setIsLoading(false)

            if (receivedUser) {
                setUser(receivedUser)
            } else {
                setUser(null)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return {
        isLoading: isLoading,
        isUserAuthenticated: Boolean(user),
    }
}
