import type {
    StyleProp,
    TextStyle,
    TouchableOpacityProps,
} from 'react-native'

export type ButtonProps = TouchableOpacityProps & {
    labelStyle?: StyleProp<TextStyle>
    label: string
    variant?: 'dark' | 'light'
    backgroundColor?: string
}
