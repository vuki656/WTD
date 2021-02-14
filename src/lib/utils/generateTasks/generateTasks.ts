import cuid from 'cuid'

import type {
    HistoryTaskType,
    TaskType,
} from '../../../modules/Home/HomeTaskList/HomeTaskList.types'
import {
    COLLECTION,
    connection,
} from '../connection'
import { todayUnix } from '../date'

/**
 *  Makes sure that user always has tasks for today from the template list
 *
 *  1. Fetch template tasks
 *  2. Fetch tasks for today
 *  3. See which template tasks are not present in todays task list
 *  4. Create those
 */
export const generateTasks = async (userId?: string) => {
    const templateTasks: TaskType[] = []
    const todaysTasks: HistoryTaskType[] = []

    await connection(COLLECTION.TASKS)
        .where('user', '==', userId)
        .get()
        .then((results) => {
            const fetchedTemplateTasks: TaskType[] = []

            results.forEach((result) => {
                const task = result.data() as TaskType

                fetchedTemplateTasks.push(task)
            })

            templateTasks.push(...fetchedTemplateTasks)
        })

    await connection(COLLECTION.TASK_HISTORY)
        .where('date', '==', todayUnix)
        .get()
        .then((results) => {
            const fetchedTodaysTasks: HistoryTaskType[] = []

            results.forEach((result) => {
                const task = result.data() as HistoryTaskType

                fetchedTodaysTasks.push(task)
            })

            todaysTasks.push(...fetchedTodaysTasks)
        })

    const tasksToCreate = templateTasks.reduce((accumulator: TaskType[], task) => {
        const isCreated = todaysTasks.some((historyTask) => {
            return historyTask.parentId === task.id
        })

        if (isCreated) {
            return accumulator
        } else {
            return [...accumulator, task]
        }
    }, [])

    const createTaskPromises = tasksToCreate.reduce((accumulator: Promise<void>[], parentTask) => {
        const taskId = cuid()

        const createTaskPromise = connection(COLLECTION.TASK_HISTORY)
            .doc(taskId)
            .set({
                date: todayUnix,
                id: taskId,
                isCompleted: false,
                name: parentTask.name,
                parentId: parentTask.id,
                user: userId,
            })

        return [...accumulator, createTaskPromise]
    }, [])

    await Promise.all(createTaskPromises)
}
