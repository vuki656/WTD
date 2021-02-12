import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type { DialogHeaderProps } from './DialogHeader.types'

const styles = StyleSheet.create({
    note: {
        color: theme.color.gray.main,
        fontSize: theme.fontSize.text,
        marginTop: 10,
    },
    root: {
        marginBottom: 20,
    },
    title: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        fontFamily: theme.fontFamily.RobotoBold,
        fontSize: theme.fontSize.title,
        justifyContent: 'flex-start',
    },
})
export const DialogHeader = (props: DialogHeaderProps) => {
    const {
        note,
        title,
    } = props

    return (
        <View style={styles.root}>
            <Text style={styles.title}>
                {title}
            </Text>
            {note
                ? (
                    <Text style={styles.note}>
                        {note}
                    </Text>
                )
                : null}
        </View>
    )
}
