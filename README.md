# mui-form-generator

> Makes forms using material ui

[![NPM](https://img.shields.io/npm/v/mui-form-generator.svg)](https://www.npmjs.com/package/mui-form-generator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save mui-form-generator
```
## Props:
```
MuiFormGeneratorProps {
    blueprint: BlueprintProps, // Must be in a bluePrint format
    validate?: {
  required?: boolean,
  isEmail?: boolean,
  minLength?: [number, string],
  maxLength?: [number, string],
  min?: [number, string],
  max?: [number, string],
  lessThan?: [number, string],
  greaterThan?: [number, string],
  canNotEqual?: [any[], string]
  isPassword?: PasswordValidationProps
  },
    manualValidate?: (values)=>boolean,
    initialValues: object,
    isLoading?: boolean,
    handleSubmit?: (values, formikProps) => any,
    cachedStateKey?: string | undefined,
    theme?: any | undefined
    startDirty?: boolean

}

BlueprintProps {
Rows: RowProps[],
}

RowProps {
    title?: string | any,
    Cols: ColProps[],
    hide?: boolean,
    justify?: any,
    divider?: boolean,
    style?: object,
    collapsable?: string | any,

}

ColProps {
    title?: string | any,
    as?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined,
    Input: any,
    Inputs?: any,
    hide?: boolean,
    Button?: any,
    style?: any,
    justifyContent?: string,
}
```

## Usage


```tsx
import React from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'

const bluePrint = () => {
    return ({
        Rows: [{
            Cols: [
                {
                    Input: {
                        id: 'firstName',
                        label: 'firstName',
                        type: 'text',
                    }
                },
                {
                    Input: {
                        id: 'lastName',
                        label: 'lastName',
                        type: 'text',
                    }
                },
                {
                    Input: {
                        id: 'email',
                        label: 'Email',
                        type: 'email',
                    }
                },
            ]
        }]
    })
}

export default function ExampleForm() {
    const initialValues = { firstName: '', lastName: '', email: '' }

    function validate(values: any) {
        const errors = {}
        Object.keys(values).forEach(field=>{
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
<MuiFormGenerator
            manualValidate={validate}
            blueprint={bluePrint()}
            initialValues={initialValues}
            handleSubmit={handleSubmit}
        />
        
    )
}


```



```
// Extensive Blueprint Example
const SignUpFormBluePrint = () => {
    return ({
        Rows: [
            {
                title:'Single Selects',
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
                            asyncCall: async()=>{
                                // must return data in format: [{label: '', value: ''}]
                                const mockData = await mockApiCall()
                                return mockData
                            },
                            appendAddButton: (props: any)=>{
                                window.alert('Do stuff')
                                console.log('log:appendAddButton ', props)
                            }
                        },
                    },
                ]
            },
            {
                title:'Multiple Selects',
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
                            options: [{label: 'Connecticut', value: 'Connecticut'}],
                            isAsync: true,
                            asyncCall: async()=>{
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
        },
        {
            title: 'Custom',
            Input:{
                id: 'custom',
                name: 'custom',
                type: 'custom',
                Component: (props: any)=>{
                    function handleChange(e:any){
                        const { value } = e.target
                        props.formik.setFieldValue('custom', value)
                    }
                    return <input style={{border: '2px solid blue', height: '30px'}} onChange={handleChange} id="custom" value={props.formik.values.custom} type="text"></input>
                },
            }
        },
    ]
},
{
    title: 'Number Field', 
    Cols: [
        {
            Input:{
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
    style: {marginTop: '15px'},
    Cols: [
        {
            Input:{
                id: 'time',
                name: 'time',
                type: 'time',
                label: 'Time',
            }
        },
        {
            Input:{
                id: 'date',
                name: 'date',
                type: 'date',
                label: 'Date',

            }
        },
        {
            Input:{
                id: 'dateTime',
                name: 'dateTime',
                type: 'dateTime',
                label: 'Date Time',

            }
        },
        {
            as: 12,
            Input:{
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
            Input:{
                Component: (props:any)=>{
                    console.log('log: custom components props', props)
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
```
## License

MIT © [brandon-irving](https://github.com/brandon-irving)
