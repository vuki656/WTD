import CheckBox from '@react-native-community/checkbox'
import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type { CheckboxProps } from './Checkbox.types'

const styles = StyleSheet.create({
    // @ts-expect-error
    name: (completed: boolean, strikeTroughOnTrue: boolean) => ({
        color: theme.color.blue.main,
        fontFamily: theme.fontFamily.RobotoRegular,
        fontSize: 20,
        overflow: 'hidden',
        textDecorationLine: completed && strikeTroughOnTrue ? 'line-through' : 'none',
    }),
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        textDecorationLine: 'line-through',
    },
})

export const Checkbox: React.FunctionComponent<CheckboxProps> = (props) => {
    const {
        falseCheckboxColor,
        isChecked,
        label,
        labelStyle,
        onValueChange,
        strikeTroughOnTrue = false,
        style,
        trueCheckboxColor,
        ...other
    } = props

    return (
        <View style={[styles.root, style]}>
            <CheckBox
                {...other}
                onValueChange={(value) => {
                    onValueChange?.(value)
                }}
                tintColors={{
                    false: falseCheckboxColor,
                    true: trueCheckboxColor,
                }}
                value={isChecked}
            />
            <Text
                numberOfLines={1}
                // @ts-expect-error
                style={[styles.name(isChecked, strikeTroughOnTrue), labelStyle]}
            >
                {label}
            </Text>
        </View>
    )
}
