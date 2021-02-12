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
        name: 'Read 5 Pages',
    }, {
        completed: true,
        id: 'aljsgn23f23f23flagnaksnga',
        name: 'Go for a run',
    },
    {
        completed: true,
        id: 'aljsasfsagasggnlagnaksnga',
        name: 'Wash your teeth in the morning',
    },
    {
        completed: false,
        id: 'aljsg13g1g1gnlagnaksnga',
        name: 'Wash your teeth in the evening',
    },
    {
        completed: false,
        id: 'aljsgnagagaglagnaksnga',
        name: '10 Pushupaaa',
    },
]

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
    },
})

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
