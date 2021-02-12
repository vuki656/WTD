import * as React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

import { HomeCounters } from './HomeCounters'

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        padding: 20,
    },
})

export const Home: React.FunctionComponent = () => {
    return (
        <View style={styles.root}>
            <HomeCounters />
        </View>
    )
}
