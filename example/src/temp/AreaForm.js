import React from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'
import { ExampleContainer } from '../ExampleContainer'
import { AreaFormBluePrint } from './blueprints' 

export default function AreaForm() {
    const initialValues = { name: ''}
    const validate = {
        name: {required: true},
 }
     function handleSubmit(values, formik) {
         window.alert(JSON.stringify(values))
         formik.resetForm()
     }
     return (
         <ExampleContainer>
 <MuiFormGenerator
             validate={validate}
             blueprint={AreaFormBluePrint()}
             initialValues={initialValues}
             handleSubmit={handleSubmit}
         />
         </ExampleContainer>
         
     )
 }

