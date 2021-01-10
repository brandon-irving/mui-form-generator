import React from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'
import { ExampleContainer } from './ExampleContainer'

const ExperimentFormBluePrint = (props: any) => {
    return ({
        Rows: [
            {
                // collapsable: {
                //     rowTitle: 'I can collapse', // or: rowTitle: (props:any)=><h4 onClick={props.onClick}>'Collapse'</h4>,
                //     defaultState: true, // normally false
                // },
                title: 'Buttons',
                Cols: [
                    {
                        Button: {
                            id: 'button',
                            name: 'button',
                            label: 'Button',
                            onClick: ()=>window.alert('Clicked'),
                            color: 'primary',
                            variant: 'contained'
                        },
                    },
                    {
                        Button: {
                            id: 'DropdownSplit',
                            name: 'DropdownSplit',
                            label: 'Dropdown Split',
                            splitButton: {
                                dropdown: [
                                    {label: 'Fetch', onClick: ()=>window.alert('Fetched')},
                                    {label: 'Push', onClick: ()=>window.alert('Push')},
                                    {label: 'Pull', onClick: ()=>window.alert('Pull')},
                                ],
                            },
                        },
                    },
                    {
                        Button: {
                            id: 'CustomSplit',
                            name: 'CustomSplit',
                            label: 'Custom Split',
                            splitButton: {
                                custom: {
                                    button:{
                                        onClick: ()=>window.alert('Clicked main button'),
                                        color: 'primary',
                                        label: 'Custom button'
                                    },
                                    secondButton: {
                                        onClick: ()=>window.alert('Clicked second button'),
                                        color: 'primary',
                                    },
                                }
                                
                            },
                        },
                    },
                ]
            },
            {
                title: 'Input fields',
                Cols: [
                   
                    {    
                        Input:{
                            id: 'textField',
                            name: 'textField',
                            type: 'text',
                            label: 'Text Field',
                            onChange: (formik: any)=>{
                                if(formik.value.toLowerCase() === 'brandon'){
                                    props.setnameCheck(true)
                                }else{
                                    props.setnameCheck(false)
                                }
                            },

                        }
                    },
                    {
                        Input:{
                            id: 'number',
                            name: 'number',
                            type: 'number',
                            label: 'Number Field',

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
                        Input:{
                            id: 'phone',
                            name: 'phone',
                            type: 'tel',
                            label: 'Phone',

                        }
                    }
                ]
            },
            {
                Cols: [
                    {
                        Input:{
                            id: 'textArea',
                            name: 'textArea',
                            type: 'textArea',
                            label: 'Text Area',

                        }
                    }
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
                            id: 'dateTime',
                            name: 'dateTime',
                            type: 'dateTime',
                            label: 'Date Time',
                        }
                    },

                ]
            },
            {
                title: 'Date Range',
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
                        Button: {
                            id: 'exampleSubmit',
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
export default function ExperimentForm() {
    const [nameCheck, setnameCheck] = React.useState(false)
    const initialValues = { textField: '', number: '', email: '', password: '' }
    console.log('log: nameCheck', {nameCheck})

   const validate = {
    textField: {},
    number: {},
    email: {},
    password: { isPassword: { min: 7, specialChars: '!@#$%^' } },
    date: {}
}

    function handleSubmit(values: any, formik: any) {
        window.alert(JSON.stringify(values))
        formik.resetForm()
    }
    return (
        <ExampleContainer>
<MuiFormGenerator
            validate={validate}
            blueprint={ExperimentFormBluePrint({setnameCheck})}
            initialValues={initialValues}
            handleSubmit={handleSubmit}
        />
        </ExampleContainer>
        
    )
}

