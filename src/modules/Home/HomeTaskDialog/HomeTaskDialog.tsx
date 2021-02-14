import { useFormik } from 'formik'
import * as React from 'react'
import {
    StyleSheet,
    TextInput,
} from 'react-native'
import * as Yup from 'yup'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogHeader,
} from '../../../components'
import theme from '../../../lib/variables/theme'
import type { HomeTaskDialogProps } from '../HomeAddDialog/HomeAddDialog.types'

import type { HomeTaskDialogFormTypes } from './HomeTaskDialog.types'

const styles = StyleSheet.create({
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

export const HomeTaskDialog: React.FunctionComponent<HomeTaskDialogProps> = (props) => {
    const {
        isOpen,
        onSubmit,
        submitButtonText,
        task,
        title,
        toggleOpen,
    } = props

    const form = useFormik<HomeTaskDialogFormTypes>({
        initialValues: {
            name: task?.name ?? '',
        },
        onSubmit: (formValues) => {
            void onSubmit(formValues)
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
        <Dialog isOpen={isOpen}>
            <DialogHeader title={title} />
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
                    label={submitButtonText}
                    onPress={handleSubmit}
                />
            </DialogActions>
        </Dialog>
    )
}
