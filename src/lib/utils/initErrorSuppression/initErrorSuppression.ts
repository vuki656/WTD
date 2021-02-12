import { LogBox } from 'react-native'

export const initErrorSuppression = () => {
    LogBox.ignoreLogs([
        '%s: Calling %s on the ref of an Animated component is no longer necessary.',
    ])
}
