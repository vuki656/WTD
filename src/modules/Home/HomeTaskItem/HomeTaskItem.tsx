import CheckBox from '@react-native-community/checkbox'
import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import theme from '../../../lib/variables/theme'

import type { HomeTaskItemProps } from './HomeTaskItem.types'

const styles = StyleSheet.create({
    // @ts-expect-error
    name: (completed: boolean) => ({
        color: theme.color.white,
        fontFamily: theme.fontFamily.RobotoRegular,
        fontSize: 20,
        overflow: 'hidden',
        textDecorationLine: completed ? 'line-through' : 'none',
    }),
    root: {
        alignItems: 'center',
        backgroundColor: theme.color.red.main,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        padding: 10,
        textDecorationLine: 'line-through',
        width: '100%',
    },
})

export const HomeTaskItem: React.FunctionComponent<HomeTaskItemProps> = (props) => {
    const { item } = props

    return (
        <View style={styles.root}>
            <CheckBox
                tintColors={{
                    false: theme.color.white,
                    true: theme.color.white,
                }}
                value={item.completed}
            />
            <Text
                numberOfLines={1}
                // @ts-expect-error
                style={styles.name(item.completed)}
            >
                {item.name}
            </Text>
        </View>
    )
}
