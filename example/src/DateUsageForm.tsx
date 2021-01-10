import React from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'
import { ExampleContainer } from './ExampleContainer'
const DateUsageBluePrint = () => {
    return ({
        Rows: [
            {
                Cols: [
                    {
                        Input: {
                            id: 'dateRange',
                            name: 'dateRange',
                            type: 'dateRange',
                            label: 'Date Range',
                        }
                    },


                ]
            },
            {
                Cols: [
                    {
                        Input: {
                            id: 'date',
                            name: 'date',
                            type: 'date',
                            label: 'Date',
                        }
                    },

                ]
            },
            {
                Cols: [
                    {
                        Button: {
                            id: 'dateSubmit',
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
export default function DateUsageForm() {
    const initialValues = { date: '2020-12-06' }

    function validate(values: any) {
        const errors = {}
        Object.keys(values).forEach(field => {
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
                blueprint={DateUsageBluePrint()}
                initialValues={initialValues}
                handleSubmit={handleSubmit}
            />
        </ExampleContainer>

    )
}

