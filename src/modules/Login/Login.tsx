import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'
import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    button: {
        height: 48,
        width: 192,
    },
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontFamily: 'Comfortaa-Regular',
        fontSize: 30,
        marginBottom: 50,
    },
})

export const Login: React.FunctionComponent = () => {
    const handleSignIn = async () => {
        const { idToken } = await GoogleSignin.signInSilently()

        const googleCredential = auth.GoogleAuthProvider.credential(idToken)

        await auth().signInWithCredential(googleCredential)
    }

    return (
        <View style={styles.root}>
            <Text style={styles.title}>
                Win The Day
            </Text>
            <GoogleSigninButton
                color={GoogleSigninButton.Color.Light}
                onPress={handleSignIn}
                size={GoogleSigninButton.Size.Wide}
                style={styles.button}
            />
        </View>
    )
}
