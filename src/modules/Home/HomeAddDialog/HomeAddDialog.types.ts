import type React from 'react'

export type HomeAddDialogFormTypes = {
    name: string
}

export type HomeTaskDialogProps = {
    triggerElement: React.ReactElement
    submitElement: React.ReactElement
    title: string
    onSubmit(formValues: HomeAddDialogFormTypes): Promise<void>
}
