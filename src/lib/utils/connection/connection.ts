import firestore from '@react-native-firebase/firestore'

export enum COLLECTION {
    TASKS = 'tasks',
    STATS = 'stats',
    TASK_HISTORY = 'task-history'
}

export const connection = (collection: COLLECTION) => {
    return firestore().collection(collection)
}
