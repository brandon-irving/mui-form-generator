import React from 'react'
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'
import { ExampleContainer } from './ExampleContainer'
const siblings = ['Shawana', 'Alyssa', 'Chris', 'Christian', 'Carlos', 'Aaliyah', 'Asia', 'Aniyah', 'Arianna']
const SelectFormBluePrint = () => {
    const initialColors = ['Red', 'Blue', 'Green']
    const changedColors = ['Pink', 'Yellow', 'Purple']
    const [colors, setColors] = React.useState(initialColors)

    return ({
        Rows: [
            {
                Cols: [
                    {
                        Input:{
                            id: 'sibling',
                            name: 'sibling',
                            type: 'select',
                            label: 'Sibling',
                            options: siblings.map((sibling:string)=>{
                                return {value: sibling, label: sibling}
                            }),
                            onChange: (props: any)=>{
                                if(props.value === 'Alyssa'){
                                    setColors(changedColors)
                                    props.formHandler.setFieldValue('color', 'Pink')
                                }else if(!initialColors.includes(props.values['color'])){
                                    setColors(initialColors)
                                    props.formHandler.setFieldValue('color', 'Red')

                                }
                                return  
                            },
                        }
                        
                    },
                    {
                        Input:{
                            id: 'color',
                            name: 'color',
                            type: 'select',
                            label: 'Color',
                            options: colors.map((color:string)=>{
                                return {value: color, label: color}
                            })
                        }
                        
                    },
                    {
                        Input:{
                            id: 'siblings',
                            name: 'siblings',
                            type: 'select',
                            label: 'Siblings',
                            multiple: true,
                            options: siblings.map((sibling:string)=>{
                                return {value: sibling, label: sibling}
                            })
                        }
                        
                    },
                    
                ]
            },
            {
                Cols: [
                    {
                        Input:{
                            id: 'countries',
                            name: 'countries',
                            type: 'select',
                            label: 'Countries',
                            multiple: true,
                            isAsync: true,
                            apiCall: async()=>{
                                function sleep(delay = 0) {
                                    return new Promise((resolve) => {
                                      setTimeout(resolve, delay);
                                    });
                                  }
                                const response : any = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
                                await sleep(1e3); // For demo purposes.
                                const countries : any  = await response.json();
                                const countryOptions = Object.keys(countries).map((key:string) => {
                                    const country = countries[key].item[0].name
                                      return {value: country, label: country}
                                    })
                                return countryOptions
                            }
                        }
                        
                    },
                    
                ]
            },
            {
                Cols: [
                    {
                        Button:{
                            id: 'submit',
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
export default function SelectForm() {
    const initialValues = { sibling: '', siblings: [], countries: [], color: '' }

    function validate(values: any) {
        const errors = {}
        Object.keys(values).forEach(field=>{
            const fieldTypes = ['string', 'object']
            const isEmpty = (!values[field]) || (fieldTypes.includes(typeof values[field])  && !values[field].length)
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
            blueprint={SelectFormBluePrint()}
            initialValues={initialValues}
            handleSubmit={handleSubmit}
        />
        </ExampleContainer>
        
    )
}

