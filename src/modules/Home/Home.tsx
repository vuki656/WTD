import auth from '@react-native-firebase/auth'
import dayjs from 'dayjs'
import * as React from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { HomeAddDialog } from './HomeAddDialog'
import { HomeCounters } from './HomeCounters'
import { HomeTaskList } from './HomeTaskList'

const styles = StyleSheet.create({
    date: {
        display: 'flex',
        fontSize: 30,
        justifyContent: 'flex-start',
        marginTop: 20,
        width: '100%',
    },
    header: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
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
            <View style={styles.header}>
                <Text style={styles.date}>
                    {dayjs().format('DD/MM/YYYY')}
                </Text>
                <HomeAddDialog />
            </View>
            <HomeTaskList />
            <Button
                onPress={async () => auth().signOut()}
                title="LogOut"
            />
        </View>
    )
}
