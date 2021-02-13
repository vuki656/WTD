import cuid from 'cuid'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import * as React from 'react'
import {
    StyleSheet,
    TextInput,
} from 'react-native'
import useToggle from 'react-use/lib/useToggle'
import * as Yup from 'yup'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogHeader,
} from '../../../components'
import {
    COLLECTION,
    connection,
} from '../../../lib/utils/connection'
import { getCurrentUser } from '../../../lib/utils/getCurrentUser'
import theme from '../../../lib/variables/theme'

import type { HomeAddDialogFormTypes } from './HomeAddDialog.types'

const styles = StyleSheet.create({
    checkbox: {
        marginTop: 20,
        width: '100%',
    },
    inputField: {
        borderColor: theme.color.gray.light350,
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: '100%',
    },
})

const ValidationSchema = Yup.object()
    .shape({
        name: Yup.string()
            .max(2000, 'Too long.')
            .required('Required'),
    })

export const HomeAddDialog: React.FunctionComponent = () => {
    const [isOpen, toggleOpen] = useToggle(false)

    const user = getCurrentUser()

    const saveTaskInHistory = async (
        formValues: HomeAddDialogFormTypes,
        taskId: string
    ) => {
        const todaysDate = dayjs().format('DD-MM-YYYY')

        await connection(COLLECTION.TASK_HISTORY)
            .doc(taskId)
            .set({
                date: todaysDate,
                id: taskId,
                isCompleted: false,
                name: formValues.name,
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

    const form = useFormik<HomeAddDialogFormTypes>({
        initialValues: {
            name: '',
        },
        onSubmit: (formValues) => {
            void saveTask(formValues)
        },
        validateOnChange: false,
        validationSchema: ValidationSchema,
    })

    const handleCancel = () => {
        toggleOpen()
        form.resetForm()
    }

    const handleSubmit = () => {
        form.handleSubmit()
        toggleOpen()

        // TODO: FIX
        setTimeout(() => {
            form.resetForm()
        }, 200)
    }

    return (
        <>
            <Button
                label="Add"
                onPress={toggleOpen}
            />
            <Dialog isOpen={isOpen}>
                <DialogHeader title="Add New" />
                <DialogContent>
                    <TextInput
                        onChangeText={form.handleChange('name')}
                        style={styles.inputField}
                        value={form.values.name}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        label="Cancel"
                        onPress={handleCancel}
                    />
                    <Button
                        backgroundColor={theme.color.green.main}
                        label="Add"
                        onPress={handleSubmit}
                    />
                </DialogActions>
            </Dialog>
        </>

    )
}
