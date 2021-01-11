import React from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'
import { ExampleContainer } from '../ExampleContainer'
import { BaseStationFormBluePrint } from './blueprints' 

export default function BaseStationForm() {
    const initialValues = { name: '', port: '', ipAddress: 'localHost'}
    const validate = {
        name: {required: true},
        port: {required: true},
 }
     function handleSubmit(values, formik) {
         window.alert(JSON.stringify(values))
         formik.resetForm()
     }
     return (
         <ExampleContainer>
 <MuiFormGenerator
             validate={validate}
             blueprint={BaseStationFormBluePrint()}
             initialValues={initialValues}
             handleSubmit={handleSubmit}
         />
         </ExampleContainer>
         
     )
 }

