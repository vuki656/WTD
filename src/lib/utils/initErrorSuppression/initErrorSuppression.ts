import { LogBox } from 'react-native'

export const initErrorSuppression = () => {
    LogBox.ignoreLogs([
        'ReactNativeFiberComponent',
    ])
    LogBox.ignoreAllLogs() // TODO: REMOVE
}
