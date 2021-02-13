import type {
    CheckBoxProps,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native'

export type CheckboxProps = Omit<CheckBoxProps, 'onChange'> & {
    falseCheckboxColor?: string
    strikeTroughOnTrue?: boolean
    isChecked: boolean
    label: string
    trueCheckboxColor?: string
    style?: StyleProp<ViewStyle>
    labelStyle?: StyleProp<TextStyle>
}
