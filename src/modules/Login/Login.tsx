import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'
import * as React from 'react'
import { View } from 'react-native'

export const Login: React.FunctionComponent = () => {
    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signInSilently()

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken)

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential)
    }

    const handleSignIn = async () => {
        await onGoogleButtonPress()
            .then(() => {
                console.log('Signed in with Google!')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <View style={{ marginTop: 200 }}>
            <GoogleSigninButton
                color={GoogleSigninButton.Color.Light}
                onPress={handleSignIn}
                size={GoogleSigninButton.Size.Wide}
                style={{ height: 48, width: 192 }}
            />
        </View>
    )
}
