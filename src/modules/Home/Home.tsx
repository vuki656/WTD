import auth from '@react-native-firebase/auth'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { Button } from '../../components'
import theme from '../../lib/variables/theme'

import { HomeAddDialog } from './HomeAddDialog'
import { HomeCounters } from './HomeCounters'
import { HomeTaskList } from './HomeTaskList'

dayjs.extend(advancedFormat)

const styles = StyleSheet.create({
    date: {
        color: theme.color.blue.main,
        display: 'flex',
        fontFamily: theme.fontFamily.RobotoBold,
        fontSize: 30,
        justifyContent: 'flex-start',
        width: '100%',
    },
    header: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    logOutButton: {
        backgroundColor: theme.color.transparent,
        borderColor: theme.color.gray.light350,
        borderWidth: 1,
        height: 40,
        marginBottom: 20,
        paddingVertical: 10,
        width: '100%',
    },
    logOutButtonText: {
        color: theme.color.gray.light200,
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
    const handleLogOut = () => {
        void auth().signOut()
    }

    return (
        <View style={styles.root}>
            <Button
                label="Log Out"
                labelStyle={styles.logOutButtonText}
                onPress={handleLogOut}
                style={styles.logOutButton}
            />
            <HomeCounters />
            <View style={styles.header}>
                <Text style={styles.date}>
                    {dayjs().format('Do MMM YYYY')}
                </Text>
                <HomeAddDialog />
            </View>
            <HomeTaskList />
        </View>
    )
}
