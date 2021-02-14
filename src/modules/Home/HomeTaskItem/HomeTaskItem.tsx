import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import dayjs from 'dayjs'
import * as React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import useToggle from 'react-use/lib/useToggle'

import { Checkbox } from '../../../components'
import {
    COLLECTION,
    connection,
} from '../../../lib/utils/connection'
import {
    todayUnix,
    unixToDate,
} from '../../../lib/utils/date'
import { getCurrentUser } from '../../../lib/utils/getCurrentUser'
import theme from '../../../lib/variables/theme'
import { HomeTaskDialog } from '../HomeTaskDialog/HomeTaskDialog'
import type { HomeTaskDialogFormTypes } from '../HomeTaskDialog/HomeTaskDialog.types'
import type {
    HistoryTaskType,
    StatsUpdateType,
} from '../HomeTaskList'

import type { HomeTaskItemProps } from './HomeTaskItem.types'

type FirestoreResult = FirebaseFirestoreTypes.QuerySnapshot

const styles = StyleSheet.create({
    checkbox: {
        padding: 10,
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
    const {
        onLongPress,
        task,
    } = props

    const user = getCurrentUser()

    const [isDialogOpen, toggleDialog] = useToggle(false)

    const checkTask = (value: boolean) => {
        void connection(COLLECTION.TASK_HISTORY)
            .doc(task.id)
            .update({
                isCompleted: value,
            })
    }

    const updateWonLostStats = async (results: FirestoreResult) => {
        let stats: StatsUpdateType = {
            isTodayWon: true,
            lost: new Set(),
            won: new Set(),
        }

        results.forEach((result) => {
            const { date, isCompleted } = result.data() as HistoryTaskType

            const formattedDate = unixToDate(date)

            if (dayjs(date).isSame(todayUnix)) {
                if (!isCompleted) {
                    stats.isTodayWon = false
                }

                return
            }

            if (isCompleted) {
                stats.won.add(formattedDate)
            } else {
                stats.lost.add(formattedDate)
            }

            stats.lost.forEach((lostDate) => {
                if (stats.won.has(lostDate)) {
                    stats.won.delete(lostDate)
                }
            })
        })

        await connection(COLLECTION.STATS)
            .doc(user?.uid)
            .update({
                lost: stats.lost.size,
                won: stats.won.size + (stats.isTodayWon ? 1 : 0),
            })
    }

    const updateStreak = async (results: FirestoreResult) => {
        let streak = 0

        await connection(COLLECTION.STATS)
            .doc(user?.uid)
            .update({
                streak: streak,
            })
    }

    const updateStats = async () => {
        await connection(COLLECTION.TASK_HISTORY)
            .where('user', '==', user?.uid)
            .orderBy('date', 'asc')
            .get()
            .then(async (results) => {
                await updateWonLostStats(results)
                // void updateStreak(results)
            })
    }

    const handleCheck = (value: boolean) => {
        checkTask(value)
        void updateStats()
    }

    const updateTask = async (formValues: HomeTaskDialogFormTypes) => {
        await connection(COLLECTION.TASK_HISTORY)
            .doc(task.id)
            .update({
                name: formValues.name,
            })

        await connection(COLLECTION.TASKS)
            .doc(task.parentId)
            .update({
                name: formValues.name,
            })
    }

    return (
        <>
            <TouchableOpacity
                onLongPress={onLongPress}
                onPress={toggleDialog}
                style={styles.root}
            >
                <Checkbox
                    falseCheckboxColor={theme.color.white}
                    isChecked={task.isCompleted}
                    label={task.name}
                    labelStyle={{ color: theme.color.white }}
                    onValueChange={handleCheck}
                    strikeTroughOnTrue={true}
                    style={styles.checkbox}
                    trueCheckboxColor={theme.color.white}
                    value={task.isCompleted}
                />
            </TouchableOpacity>
            <HomeTaskDialog
                isOpen={isDialogOpen}
                onSubmit={updateTask}
                submitButtonText="Save"
                task={task}
                title="Edit"
                toggleOpen={toggleDialog}
            />
        </>
    )
}
