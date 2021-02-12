import CheckBox from '@react-native-community/checkbox'
import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import type { HomeTaskItemProps } from './HomeTaskItem.types'

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
})

export const HomeTaskItem: React.FunctionComponent<HomeTaskItemProps> = (props) => {
    const { item } = props

    return (
        <View style={styles.root}>
            <CheckBox value={false} />
            <Text>
                {item.name}
            </Text>
        </View>
    )
}
