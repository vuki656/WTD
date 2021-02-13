import * as React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

import { Card } from '../../../components'
import {
    COLLECTION,
    connection,
} from '../../../lib/utils/connection'
import { getCurrentUser } from '../../../lib/utils/getCurrentUser'
import theme from '../../../lib/variables/theme'

import type { StatsType } from './HomeCounters.types'

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
})

export const HomeCounters: React.FunctionComponent = () => {
    const user = getCurrentUser()

    const [stats, setStats] = React.useState<StatsType>({
        lost: 0,
        streak: 0,
        won: 0,
    })

    const fetchStats = () => {
        void connection(COLLECTION.STATS).doc(user?.uid)
            .onSnapshot((result) => {
                const fetchedStats = result.data() as StatsType

                setStats({
                    ...fetchedStats,
                })
            })
    }

    React.useEffect(() => {
        fetchStats()
    }, [])

    return (
        <View style={styles.root}>
            <Card
                color={theme.color.yellow.main}
                count={stats.streak}
                label="Streak"
            />
            <Card
                color={theme.color.green.main}
                count={stats.won}
                label="Won"
            />
            <Card
                color={theme.color.red.main}
                count={stats.lost}
                label="Lost"
            />
        </View>
    )
}
