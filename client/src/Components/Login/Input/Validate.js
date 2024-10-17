import * as  yup from 'yup'

export const validateInput = yup.object().shape({
    username: yup.string().required('required'),
    password: yup.string().required('required')
})