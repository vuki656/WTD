import type { HomeTaskDialogFormTypes } from '../HomeTaskDialog/HomeTaskDialog.types'
import type { HistoryTaskType } from '../HomeTaskList'

export type HomeTaskDialogProps = {
    isOpen: boolean
    submitButtonText: string
    title: string
    task?: HistoryTaskType
    toggleOpen(): void
    onSubmit(formValues: HomeTaskDialogFormTypes): Promise<void>
}
