import { LogBox } from 'react-native'

export const initErrorSuppression = () => {
    LogBox.ignoreLogs([
        'ReactNativeFiberComponent: Calling getNode() on the ref of an Animated',
    ])
}
