import { LogBox } from 'react-native'

export const initErrorSuppression = () => {
    LogBox.ignoreLogs([
        'ReactNativeFiberComponent',
    ])
}
