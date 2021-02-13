import * as React from 'react'
import {
    Image,
    StyleSheet,
    View,
} from 'react-native'

import { Checkbox } from '../../../components'
import theme from '../../../lib/variables/theme'

import type { HomeTaskItemProps } from './HomeTaskItem.types'

const styles = StyleSheet.create({
    checkbox: {
        padding: 10,
    },
    icon: {
        height: 25,
        width: 25,
    },
    root: {
        alignItems: 'center',
        backgroundColor: theme.color.red.main,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingRight: 10,
        width: '100%',
    },
})

export const HomeTaskItem: React.FunctionComponent<HomeTaskItemProps> = (props) => {
    const { item } = props

    return (
        <View style={styles.root}>
            <Checkbox
                falseCheckboxColor={theme.color.white}
                isChecked={item.completed}
                label={item.name}
                labelStyle={{ color: theme.color.white }}
                strikeTroughOnTrue={true}
                style={styles.checkbox}
                trueCheckboxColor={theme.color.white}
            />
            {item.isRepeating
                ? (
                    <Image
                        source={require('../../../../assets/images/repeat.png')}
                        style={styles.icon}
                    />
                )
                : null}
        </View>
    )
}
