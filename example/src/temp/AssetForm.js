import React, { useState } from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'
import { ExampleContainer } from '../ExampleContainer'
import { AssetFormBluePrint } from './blueprints' 

export default function AssetForm() {
    const [areaOptions, setareaOptions] = useState([{label: "Portugal", value: "Portugal"}])
    const [loadAreaOptions, setloadAreaOptions] = useState(true)

    const initialValues = { name: '', areaId: {label: "Portugal", value: "Portugal"}, equipmentId: ''}
    const validate = {
        name: {required: true},
        areaId: {required: true},
 }
     function handleSubmit(values, formik) {
         window.alert(JSON.stringify(values))
         formik.resetForm()
     }
     return (
         <ExampleContainer>
 <MuiFormGenerator
             validate={validate}
             blueprint={AssetFormBluePrint({loadAreaOptions, setloadAreaOptions, areaOptions,setareaOptions})}
             initialValues={initialValues}
             handleSubmit={handleSubmit}
         />
         </ExampleContainer>
         
     )
 }

