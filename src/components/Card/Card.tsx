import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type { CardProps } from './Card.types'

const styles = StyleSheet.create({
    count: {
        color: theme.color.white,
        fontFamily: theme.fontFamily.ComfortaaBold,
        fontSize: 30,
    },
    label: {
        color: theme.color.white,
        fontFamily: theme.fontFamily.ComfortaaRegular,
        fontSize: 15,
    },
    // @ts-expect-error
    root: (color: string) => ({
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        height: 100,
        justifyContent: 'center',
        width: 100,
    }),
})

export const Card: React.FunctionComponent<CardProps> = (props) => {
    const {
        color,
        count,
        label,
    } = props

    return (
        // @ts-expect-error
        <View style={styles.root(color)}>
            <Text style={styles.count}>
                {count}
            </Text>
            <Text style={styles.label}>
                {label}
            </Text>
        </View>
    )
}
