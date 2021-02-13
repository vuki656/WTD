import { GoogleSignin } from '@react-native-community/google-signin'
import cuid from 'cuid'
import * as React from 'react'

import { useAuthInit } from './lib/hooks/useAuthInit/useAuthInit'
import {
    COLLECTION,
    connection,
} from './lib/utils/connection'
import { getCurrentUser } from './lib/utils/getCurrentUser'
import { initErrorSuppression } from './lib/utils/initErrorSuppression'
import { TODAYS_DATE } from './lib/variables/constants'
import { Home } from './modules/Home'
import type { TaskType } from './modules/Home/HomeTaskList/HomeTaskList.types'
import { Login } from './modules/Login'

GoogleSignin.configure({
    webClientId: '529897088428-hudun0c47un7u9d04uvr6gt3lbovroof.apps.googleusercontent.com',
})

initErrorSuppression()

// TODO: TURNING OFF FIREBASE SUBS
export const App: React.FunctionComponent = () => {
    const { isLoading, isUserAuthenticated } = useAuthInit()

    const user = getCurrentUser()

    /**
     *  Makes sure that user always has tasks for today from the template list
     *
     *  1. Fetch template tasks
     *  2. Fetch tasks for today
     *  3. See which template tasks are not present in todays task list
     *  4. Create those
     */
    const generateTasks = async () => {
        const templateTasks: TaskType[] = []
        const todaysTasks: TaskType[] = []

        await connection(COLLECTION.TASKS)
            .where('user', '==', user?.uid)
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
            .where('date', '==', TODAYS_DATE)
            .get()
            .then((results) => {
                const fetchedTodaysTasks: TaskType[] = []

                results.forEach((result) => {
                    const task = result.data() as TaskType

                    fetchedTodaysTasks.push(task)
                })

                todaysTasks.push(...fetchedTodaysTasks)
            })

        const tasksToCreate = templateTasks.reduce((accumulator: TaskType[], task) => {
            const isCreated = todaysTasks.some((historyTask) => {
                return historyTask.name === task.name
            })

            if (isCreated) {
                return accumulator
            } else {
                return [...accumulator, task]
            }
        }, [])

        const createTaskPromises = tasksToCreate.reduce((accumulator: Promise<void>[], task) => {
            const taskId = cuid()

            const createTaskPromise = connection(COLLECTION.TASK_HISTORY)
                .doc(taskId)
                .set({
                    ...task,
                    date: TODAYS_DATE,
                    id: taskId,
                    isCompleted: false,
                })

            return [...accumulator, createTaskPromise]
        }, [])

        void Promise.all(createTaskPromises)
    }

    React.useEffect(() => {
        void generateTasks()
    }, [])

    if (isLoading) {
        return null
    }

    return isUserAuthenticated ? <Home /> : <Login />
}
