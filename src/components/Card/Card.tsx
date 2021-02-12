import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import type { CardProps } from './Card.types'

const styles = StyleSheet.create({
    count: {
        fontSize: 30,
    },
    // @ts-expect-error
    root: (color: string) => ({
        alignItems: 'center',
        backgroundColor: color,
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
            <Text>
                {label}
            </Text>
        </View>
    )
}
