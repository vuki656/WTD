import cuid from 'cuid'
import * as React from 'react'

import { Button } from '../../../components'
import {
    COLLECTION,
    connection,
} from '../../../lib/utils/connection'
import { todayUnix } from '../../../lib/utils/date'
import { getCurrentUser } from '../../../lib/utils/getCurrentUser'
import theme from '../../../lib/variables/theme'
import { HomeTaskDialog } from '../HomeTaskDialog/HomeTaskDialog'

import type { HomeAddDialogFormTypes } from './HomeAddDialog.types'

export const HomeAddDialog: React.FunctionComponent = () => {
    const user = getCurrentUser()

    const saveTaskInHistory = async (
        formValues: HomeAddDialogFormTypes,
        parentId: string
    ) => {
        const historyTaskId = cuid()

        await connection(COLLECTION.TASK_HISTORY)
            .doc(historyTaskId)
            .set({
                date: todayUnix,
                id: historyTaskId,
                isCompleted: false,
                name: formValues.name,
                parentId: parentId,
                user: user?.uid,
            })
    }

    const saveTask = async (formValues: HomeAddDialogFormTypes) => {
        const taskId = cuid()

        await connection(COLLECTION.TASKS)
            .doc(taskId)
            .set({
                id: taskId,
                name: formValues.name,
                user: user?.uid,
            })

        await saveTaskInHistory(formValues, taskId)
    }

    return (
        <HomeTaskDialog
            onSubmit={saveTask}
            submitElement={(
                <Button
                    backgroundColor={theme.color.green.main}
                    label="Add"
                />
            )}
            title="Add"
            triggerElement={(
                <Button label="Add" />
            )}
        />

    )
}
