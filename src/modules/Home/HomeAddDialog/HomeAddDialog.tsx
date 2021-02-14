import cuid from 'cuid'
import * as React from 'react'
import useToggle from 'react-use/lib/useToggle'

import {
    COLLECTION,
    connection,
} from '../../../lib/utils/connection'
import { todayUnix } from '../../../lib/utils/date'
import { getCurrentUser } from '../../../lib/utils/getCurrentUser'
import { HomeTaskDialog } from '../HomeTaskDialog/HomeTaskDialog'
import type { HomeTaskDialogFormTypes } from '../HomeTaskDialog/HomeTaskDialog.types'

export const HomeAddDialog: React.FunctionComponent = () => {
    const user = getCurrentUser()

    const [isDialogOpen, toggleDialog] = useToggle(false)

    const saveTaskInHistory = async (
        formValues: HomeTaskDialogFormTypes,
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

    const saveTask = async (formValues: HomeTaskDialogFormTypes) => {
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
            isOpen={isDialogOpen}
            onSubmit={saveTask}
            submitButtonText="Add"
            title="Add"
            toggleOpen={toggleDialog}
        />

    )
}
