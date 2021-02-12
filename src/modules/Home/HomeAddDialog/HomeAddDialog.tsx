import { useFormik } from 'formik'
import * as React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import useToggle from 'react-use/lib/useToggle'
import * as Yup from 'yup'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogHeader,
} from '../../../components'
import theme from '../../../lib/variables/theme'

import type { HomeAddDialogFormTypes } from './HomeAddDialog.types'

const styles = StyleSheet.create({
    cancelButton: {
        backgroundColor: theme.color.purple.main,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    confirmButton: {
        backgroundColor: theme.color.green.main,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    confirmButtonText: {
        color: theme.color.white,
    },
    dialogButtonText: {
        color: theme.color.white,
    },
    inputField: {
        borderColor: theme.color.gray.light350,
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: '100%',
    },
    toggleButton: {
        backgroundColor: theme.color.purple.main,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    toggleButtonText: {
        color: theme.color.white,
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

    const form = useFormik<HomeAddDialogFormTypes>({
        initialValues: { name: '' },
        onSubmit: (formValues) => {
            console.log(formValues)
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
        form.resetForm()
    }

    return (
        <>
            <TouchableOpacity
                onPress={toggleOpen}
                style={styles.toggleButton}
            >
                <Text style={styles.toggleButtonText}>
                    Add
                </Text>
            </TouchableOpacity>
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
                    <TouchableOpacity
                        onPress={handleCancel}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.dialogButtonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.confirmButton}
                    >
                        <Text style={styles.confirmButtonText}>
                            Add
                        </Text>
                    </TouchableOpacity>
                </DialogActions>
            </Dialog>
        </>

    )
}
