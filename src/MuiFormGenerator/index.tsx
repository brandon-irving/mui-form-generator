import React from 'react'
import { FormikContextProvider } from './FormikContext'
import { Formik } from 'formik'
import { MuiFormGeneratorProps } from './types'
import RowGenerator from '../components/RowGenerator'
import AsyncDiv from '../components/AsyncDiv'
/*
idea
      const validationMap = {
        validation: {
          // min, max, required, negativeOnly, positiveOnly, matches, isHex, 
          // greaterThan, lessThan, ifThisThenThat
          name: { required: true}, 
          lastName: { required: true, ifThisThenThat: {if: name, then: }}
          nickname: {min:5,}, 
          age:{required: true, positiveOnly: true}
        }
      }
*/
const MuiFormGenerator = (props:MuiFormGeneratorProps) => {
  const [isSubmitting, setisSubmitting] = React.useState(false)
    const {
        initialValues,
        validate,
    } = props
    async function validation(values:any){
        if(validate){
            return await validate(values)
        }else return {}
    }
    function handleSubmit(values:any){
      setisSubmitting(true)
      setTimeout(() => {
        console.log('log: isSubmitting', isSubmitting)
        return window.alert(JSON.stringify(values))
      }, 1000);
    }
    return (
        <Formik
        initialValues={initialValues}
        validate={validation}
        onSubmit={handleSubmit}
      >
        {(formikProps: any) => {
            console.log('log: ',{formikProps, props});
            const stateConfig = {
              formikProps
            }

          return ( 
            <FormikContextProvider stateConfig={stateConfig}>
              <AsyncDiv isLoading={isSubmitting}>
                <form onSubmit={formikProps.handleSubmit}>
                <RowGenerator Rows={props.blueprint.Rows}/>
                </form>

              </AsyncDiv>
            </FormikContextProvider>
          )
        }
        }
      </Formik>
    )
}

export default MuiFormGenerator
