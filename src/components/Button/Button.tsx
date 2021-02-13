import * as React from 'react'
import type {
    StyleProp,
    TextStyle,
} from 'react-native'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type { ButtonProps } from './Button.types'

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        borderRadius: 5,
        display: 'flex',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const {
        label,
        labelStyle,
        backgroundColor = theme.color.purple.main,
        onPress,
        style,
        variant = 'light',
        ...other
    } = props

    const labelColor: StyleProp<TextStyle> = variant === 'light'
        ? { color: theme.color.white }
        : { color: theme.color.blue.main }

    return (
        <TouchableOpacity
            {...other}
            onPress={onPress}
            style={[
                styles.root,
                { backgroundColor: backgroundColor },
                style,
            ]}
        >
            <Text
                style={[
                    labelColor,
                    labelStyle,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}
