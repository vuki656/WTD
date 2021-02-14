import * as React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import type { RenderItemParams } from 'react-native-draggable-flatlist'
import DraggableFlatList from 'react-native-draggable-flatlist'

import {
    COLLECTION,
    connection,
} from '../../../lib/utils/connection'
import { todayUnix } from '../../../lib/utils/date'
import { getCurrentUser } from '../../../lib/utils/getCurrentUser'
import { HomeTaskItem } from '../HomeTaskItem'

import type { HistoryTaskType } from './HomeTaskList.types'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
    },
})

// TODO: SAVE LIST ORDER
export const HomeTaskList: React.FunctionComponent = () => {
    const [tasks, setTasks] = React.useState<HistoryTaskType[]>([])

    const user = getCurrentUser()

    const fetchTasks = () => {
        void connection(COLLECTION.TASK_HISTORY)
            .where(
                'date',
                '==',
                todayUnix
            )
            .where('user', '==', user?.uid)
            .onSnapshot((results) => {
                const fetchedTasks: HistoryTaskType[] = []

                if (!results) {
                    return
                }

                results.forEach((result) => {
                    const task = result.data() as HistoryTaskType

                    fetchedTasks.push(task)
                })

                setTasks(fetchedTasks)
            })
    }

    React.useEffect(() => {
        fetchTasks()
    }, [])

    const listItem = React.useCallback((props: RenderItemParams<HistoryTaskType>) => {
        const { drag, item } = props

        return (
            <HomeTaskItem
                onLongPress={drag}
                task={item}
            />
        )
    }, [])

    return (
        <View style={styles.root}>
            <DraggableFlatList
                data={tasks}
                keyExtractor={(item) => {
                    return item.id
                }}
                onDragEnd={(parameters) => {
                    setTasks(parameters.data)
                }}
                renderItem={listItem}
            />
        </View>
    )
}
