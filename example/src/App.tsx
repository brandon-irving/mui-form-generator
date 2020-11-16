import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiFormGenerator } from 'mui-form-generator'
import 'mui-form-generator/dist/index.css'

const ExampleFormBluePrint = () => {
  return {
      Rows: [
          {
              style: {backgroundColor: 'gainsboro', height:'200px', marginBottom: '20px',},
              Cols: [
                {
                    // as, hide, title, 
                    Input: {
                        label: 'First',
                        id: 'firstName',
                        type: 'text',
                        InputProps: {
                            startAdornment: <InputAdornment position="start">Nm</InputAdornment>,
                          }
                    }
                   
                },
                {
                    // as, hide, title, 
                    Input: {
                        label: 'Last',
                        id: 'lastName',
                        type: 'text',
                    }
                   
                },
                {
                    // as, hide, title, 
                    Input: {
                        label: 'Nickname',
                        id: 'nickName',
                        type: 'text',
                    }
                   
                },
                {
                    // as, hide, title, 
                    Input: {
                        label: 'Age',
                        id: 'age',
                        type: 'number',
                    }
                   
                },
                
              ]
          },
          {
              divider: true
          },
          {
            Cols:[
                {
                    // as, hide, title, 
                    Input: {
                        label: 'Siblings',
                        id: 'siblings',
                        type: 'select',
                        options: [{value:'alyssa', label:'Alyssa'},{value:'chris', label:'Chris'},]
                    }
                   
                },
                {
                    // as, hide, title, 
                    Input: {
                        label: 'Switch',
                        id: 'switch',
                        type: 'switch',
                    }
                   
                },
            ]
        },
          {
              justify: 'flex-end',
            Cols: [
              {
                  // as, hide, title, 
                  Button: {
                      label: 'Cancel',
                      id: 'cancel',
                  }
                 
              },
              {
                  // as, hide, title, 
                  Button: {
                      label: 'Submit',
                      id: 'submit',
                      type: 'submit',
                  }
                 
              },
              
            ]
        },
       

      ]
  }
}
const App = () => {
    const initialValues = {switch: true, siblings: 'alyssa',firstName:'Brandon', lastName: 'Irving', nickName: 'Silver', age: 29 }
    function validate(values:any){
        const errors = {}
        if(!values.firstName.length){
            errors['firstName'] = 'Required'
        }
        console.log('log: errors', errors);
        
        return errors
    }
  return(
    <div>
  <MuiFormGenerator  
  validate={validate}
  blueprint={ExampleFormBluePrint()}
  initialValues={initialValues} 
  submitConfig={{}}
  />
    </div>
  ) 
}

export default App
