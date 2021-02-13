import auth from '@react-native-firebase/auth'

export const getCurrentUser = () => {
    return auth().currentUser
}
