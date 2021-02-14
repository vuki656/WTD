export type TaskType = {
    id: string
    name: string
    isCompleted: boolean
}

export type HistoryTaskType = {
    id: string
    name: string
    isCompleted: boolean
    date: number
    user: string
    parentId: string
}

export type StatsUpdateType = {
    won: Set<string>
    lost: Set<string>
    isTodayWon: boolean
}
