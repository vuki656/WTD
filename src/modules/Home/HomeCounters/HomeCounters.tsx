import * as React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

import { Card } from '../../../components/Card'

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
})

export const HomeCounters: React.FunctionComponent = () => {
    return (
        <View style={styles.root}>
            <Card
                color="#ff9800"
                count={5}
                label="Streak"
            />
            <Card
                color="#4caf50"
                count={178}
                label="Won"
            />
            <Card
                color="#e91e63"
                count={28}
                label="Lost"
            />
        </View>
    )
}
