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

import theme from '../../lib/variables/theme'

const styles = StyleSheet.create({
    button: {
        height: 48,
        width: 192,
    },
    root: {
        alignItems: 'center',
        backgroundColor: theme.color.blue.light500,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: theme.color.blue.main,
        fontFamily: theme.fontFamily.ComfortaaBold,
        fontSize: 30,
        marginBottom: 20,
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
