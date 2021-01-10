import React from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'
import { ExampleContainer } from './ExampleContainer'
const SignUpFormBluePrint = () => {
    return ({
        Rows: [
            {
                Cols: [
                    {
                        Input:{
                            id: 'firstName',
                            name: 'firstName',
                            type: 'text',
                            label: 'First Name',
                        }
                    },
                    {
                        Input:{
                            id: 'lastName',
                            name: 'lastName',
                            type: 'text',
                            label: 'Last Name',

                        }
                    }
                ]
            },
            {
                Cols: [
                    {
                        Input:{
                            id: 'email',
                            name: 'email',
                            type: 'email',
                            label: 'Email',

                        }
                    },
                    {
                        Input:{
                            id: 'password',
                            name: 'password',
                            type: 'password',
                            label: 'Password',

                        }
                    }
                ]
            },
            {
                Cols: [
                    {
                        Button:{
                            id: 'signupSubmit',
                            name: 'submit',
                            type: 'submit',
                            label: 'Submit',
                        }
                    },
                ]
            },
        ]
    })
}
export default function SignUpForm() {
    const initialValues = { firstName: '', lastName: '', email: '', password: '' }

    function validate(values: any) {
        const errors = {}
        Object.keys(values).forEach(field=>{
            const isEmpty = (!values[field]) || (typeof values[field] === 'string' && !values[field].length)
            if (isEmpty) {
                errors[field] = 'required'
            }
        })

        return errors
    }
    function handleSubmit(values: any, formik: any) {
        window.alert(JSON.stringify(values))
        formik.resetForm()
    }
    return (
        <ExampleContainer>
<MuiFormGenerator
            manualValidate={validate}
            blueprint={SignUpFormBluePrint()}
            initialValues={initialValues}
            handleSubmit={handleSubmit}
        />
        </ExampleContainer>
        
    )
}

