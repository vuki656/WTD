import * as React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import type { RenderItemParams } from 'react-native-draggable-flatlist'

import { HomeTaskItem } from '../HomeTaskItem'

import type { TaskType } from './HomeTaskList.types'

const items: TaskType[] = [
    {
        completed: true,
        id: 'aljsgnlagnaksnga',
        isRepeating: false,
        name: 'Read 5 Pages',
    }, {
        completed: true,
        id: 'aljsgn23f23f23flagnaksnga',
        isRepeating: true,
        name: 'Go for a run',
    },
    {
        completed: false,
        id: 'aljsg13g1g1gnlagnaksnga',
        isRepeating: false,
        name: 'Wash your teeth',
    },
    {
        completed: false,
        id: 'aljsgnagagaglagnaksnga',
        isRepeating: false,
        name: '10 Pushupaaa',
    },
]

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
    },
})

// NOTE: FETCH TASKS, IF NO EXIST, CREATE FROM TEMPLATE/REPEATING ONES
export const HomeTaskList: React.FunctionComponent = () => {
    const [data, setData] = React.useState<TaskType[]>(items)

    const listItem = React.useCallback((props: RenderItemParams<TaskType>) => {
        const { drag, item } = props

        return (
            <TouchableOpacity onLongPress={drag}>
                <HomeTaskItem item={item} />
            </TouchableOpacity>
        )
    }, [])

    return (
        <View style={styles.root}>
            <DraggableFlatList
                data={data}
                keyExtractor={(item) => {
                    return item.id
                }}
                onDragEnd={(parameters) => {
                    setData(parameters.data)
                }}
                renderItem={listItem}
            />
        </View>
    )
}
