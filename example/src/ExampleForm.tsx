import React from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'
import { ExampleContainer } from './ExampleContainer'
const defaultOptions = [
    { label: 'Alabama', value: 'Alabama' },
    { label: 'Alaska', value: 'Alaska' },
    { label: 'American Samoa', value: 'American Samoa' },
    { label: 'Arizona', value: 'Arizona' },
    { label: 'Arkansas', value: 'Arkansas' },
]
async function mockApiCall() {
    const responseApi = await fetch('https://api.npoint.io/4667767ae00936484a5e');
    const response = await responseApi.json()
    const options = response ? response.map((state: any) => {
        return { label: state.name, value: state.name }
    }) : []
    return options
}

const SignUpFormBluePrint = () => {
    return ({
        Rows: [
            {
                title: 'Single Selects',
                Cols: [
                    {
                        Input: {
                            label: 'Single Select',
                            id: 'singleSelect',
                            name: 'singleSelect',
                            type: 'select',
                            options: defaultOptions,
                        },
                    },
                    {
                        Input: {
                            label: 'Async Single',
                            id: 'asyncSingle',
                            name: 'asyncSingle',
                            type: 'select',
                            options: defaultOptions,
                            isAsync: true,
                            asyncCall: async () => {
                                // must return data in format: [{label: '', value: ''}]
                                const mockData = await mockApiCall()
                                return mockData
                            },
                            appendAddButton: (props: any) => {
                                window.alert('Do stuff')
                                console.log('log:appendAddButton ', props)
                            }
                        },
                    },
                ]
            },
            {
                title: 'Multiple Selects',
                Cols: [
                    {
                        Input: {
                            label: 'Multiple Select',
                            id: 'multipleSelect',
                            name: 'multipleSelect',
                            type: 'select',
                            options: defaultOptions,
                            multiple: true,
                        },
                    },
                    {
                        Input: {
                            label: 'Async Multiple',
                            id: 'asyncMultiple',
                            name: 'asyncMultiple',
                            type: 'select',
                            multiple: true,
                            options: [{ label: 'Connecticut', value: 'Connecticut' }],
                            isAsync: true,
                            asyncCall: async () => {
                                // must return data in format: [{label: '', value: ''}]
                                const mockData = await mockApiCall()
                                return mockData
                            },
                        },
                    },
                ]
            },
            {
                title: 'Text Fields',
                Cols: [
                    {
                        Input: {
                            id: 'email',
                            name: 'email',
                            type: 'email',
                            label: 'Email',

                        }
                    },
                    {
                        Input: {
                            id: 'password',
                            name: 'password',
                            type: 'password',
                            label: 'Password',

                        }
                    },
                    {
                        title: 'Custom',
                        Input: {
                            id: 'custom',
                            name: 'custom',
                            type: 'custom',
                            Component: (props: any) => {
                                function handleChange(e: any) {
                                    const { value } = e.target
                                    props.formik.setFieldValue('custom', value)
                                }
                                return <input style={{ border: '2px solid blue', height: '30px' }} onChange={handleChange} id="custom" value={props.formik.values.custom} type="text"></input>
                            },
                        }
                    },
                ]
            },
            {
                title: 'Number Field',
                Cols: [
                    {
                        Input: {
                            id: 'number',
                            name: 'number',
                            type: 'number',
                            label: 'Number',

                        }
                    },

                ]
            },
            {
                title: 'Date Fields',
                style: { marginTop: '15px' },
                Cols: [
                    {
                        Input: {
                            id: 'time',
                            name: 'time',
                            type: 'time',
                            label: 'Time',
                        }
                    },
                    {
                        Input: {
                            id: 'date',
                            name: 'date',
                            type: 'date',
                            label: 'Date',

                        }
                    },
                    {
                        Input: {
                            id: 'dateTime',
                            name: 'dateTime',
                            type: 'dateTime',
                            label: 'Date Time',

                        }
                    },
                    {
                        as: 12,
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
                            Component: () => {
                                return <div>Custom Component</div>
                            }
                        }

                    }
                ]
            },
            {
                Cols: [
                    {
                        justifyContent: 'flex-end',
                        Button: {
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
export default function ExampleForm() {
    const initialValues = { }

    function validate(values: any) {
        const errors = {}
        Object.keys(values).forEach(field => {
            const isEmpty = (Array.isArray(values[field]) && !values[field].length) || (!values[field]) || (typeof values[field] === 'string' && !values[field].length)
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

