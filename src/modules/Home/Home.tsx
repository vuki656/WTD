import dayjs from 'dayjs'
import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { HomeCounters } from './HomeCounters'

const styles = StyleSheet.create({
    date: {
        display: 'flex',
        fontSize: 30,
        justifyContent: 'flex-start',
        marginTop: 20,
        width: '100%',
    },
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
            <Text style={styles.date}>
                {dayjs().format('DD/MM/YYYY')}
            </Text>
        </View>
    )
}
