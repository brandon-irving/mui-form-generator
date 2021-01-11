import React from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'
import { ExampleContainer } from '../ExampleContainer'
import { ChannelFormBluePrint } from './blueprints' 

export default function ChannelForm() {
    const validate = {
 }
     function handleSubmit(values, formik) {
         window.alert(JSON.stringify(values))
         formik.resetForm()
     }
     return (
         <ExampleContainer>
 <MuiFormGenerator
             validate={validate}
             blueprint={ChannelFormBluePrint()}
             initialValues={{}}
             handleSubmit={handleSubmit}
         />
         </ExampleContainer>
         
     )
 }

