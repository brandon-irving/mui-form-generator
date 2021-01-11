import React, { useState } from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'
import { ExampleContainer } from '../ExampleContainer'
import { HardwareUnitFormBluePrint } from './blueprints' 
const hwuTypeOptions = [
    {label: 'TS1X', value: 0},
    {label: 'StormX', value: 1},
    {label: 'MistlX', value: 2},
    {label: 'StormXT', value: 3},
    {label: 'StormX RTD', value: 4},
]
const serialNumberRules = {
    0: '00',
    1: 'ba',
    2: 'bb',
    3: 'be',
    4: 'bf',
}
export default function HardwareUnitForm() {
    const [serialNumberTitle, setserialNumberTitle] = useState('Serial Number (00)')
    const [baseStationOptions, setbaseStationOptions] = useState([{label: "Portugal", value: "Portugal"}])
    const [loadBaseStationOptions, setloadBaseStationOptions] = useState(true)
    const initialValues = { name: '', type: {label: 'TS1X', value: 0}, serialNumber: '', baseStationId: {label: "Portugal", value: "Portugal"}}
    function manualValidate(values) {
        let errors = Object.keys(values).reduce((acc, valueName)=>{
            const accumulator = {...acc}
            const value = values[valueName] || ''
            const isEmpty = (typeof value === 'string' && !value.length)
            if(isEmpty){
                accumulator[valueName] = 'Required'
            }
            return accumulator
        }, {})

        return errors
 }
     function handleSubmit(values, formik) {
         window.alert(JSON.stringify(values))
         formik.resetForm()
     }
     return (
         <ExampleContainer>
 <MuiFormGenerator
             manualValidate={manualValidate}
             blueprint={HardwareUnitFormBluePrint({loadBaseStationOptions, setloadBaseStationOptions, baseStationOptions, setbaseStationOptions, serialNumberRules, hwuTypeOptions, serialNumberTitle, setserialNumberTitle})}
             initialValues={initialValues}
             handleSubmit={handleSubmit}
         />
         </ExampleContainer>
         
     )
 }

