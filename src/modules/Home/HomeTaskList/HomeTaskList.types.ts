export type TaskType = {
    id: string
    name: string
    isCompleted: boolean
}

export type HistoryTask = {
    id: string
    name: string
    isCompleted: boolean
    date: number
    user: string
}

export type StatsUpdateType = {
    won: Set<string>
    lost: Set<string>
    isTodayWon: boolean
}
