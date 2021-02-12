import * as React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

import { Card } from '../../../components'
import theme from '../../../lib/variables/theme'

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
})

export const HomeCounters: React.FunctionComponent = () => {
    return (
        <View style={styles.root}>
            <Card
                color={theme.color.yellow.main}
                count={5}
                label="Streak"
            />
            <Card
                color={theme.color.green.main}
                count={178}
                label="Won"
            />
            <Card
                color={theme.color.red.main}
                count={28}
                label="Lost"
            />
        </View>
    )
}
