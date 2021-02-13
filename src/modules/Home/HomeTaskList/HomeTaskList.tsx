import * as React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import type { RenderItemParams } from 'react-native-draggable-flatlist'
import DraggableFlatList from 'react-native-draggable-flatlist'

import {
    COLLECTION,
    connection,
} from '../../../lib/utils/connection'
import { getCurrentUser } from '../../../lib/utils/getCurrentUser'
import { TODAYS_DATE } from '../../../lib/variables/constants'
import { HomeTaskItem } from '../HomeTaskItem'

import type { TaskType } from './HomeTaskList.types'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
    },
})

// TODO: SAVE LIST ORDER
export const HomeTaskList: React.FunctionComponent = () => {
    const [tasks, setTasks] = React.useState<TaskType[]>([])

    const user = getCurrentUser()

    const fetchTasks = () => {
        void connection(COLLECTION.TASK_HISTORY)
            .where('date', '==', TODAYS_DATE)
            .where('user', '==', user?.uid)
            .onSnapshot((results) => {
                const fetchedTasks: TaskType[] = []

                results.forEach((result) => {
                    const task = result.data() as TaskType

                    fetchedTasks.push(task)
                })

                setTasks(fetchedTasks)
            })
    }

    React.useEffect(() => {
        fetchTasks()
    }, [])

    const listItem = React.useCallback((props: RenderItemParams<TaskType>) => {
        const { drag, item } = props

        return (
            <TouchableOpacity onLongPress={drag}>
                <HomeTaskItem task={item} />
            </TouchableOpacity>
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
