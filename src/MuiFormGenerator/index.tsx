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
    const {
        initialValues,
        validate,
        isLoading=false,
        handleSubmit=()=>{},
        cachedStateKey
    } = props
    const desiredInitialValues = cachedStateKey && sessionStorage[cachedStateKey] ? JSON.parse(sessionStorage[cachedStateKey]) : initialValues
    async function validation(values:any){
      cachedStateKey && sessionStorage.setItem(cachedStateKey, JSON.stringify(values))
        if(validate){
            return await validate(values)
        }else return {}
    }
    async function Submit(values:any,formik: any){
      await handleSubmit(values, formik)
    }
    return (
        <Formik
        initialValues={desiredInitialValues}
        validate={validation}
        onSubmit={Submit}
      >
        {(formikProps: any) => {
            console.log('log: ',{formikProps, props});
            const stateConfig = {
              formikProps
            }

          return ( 
            <FormikContextProvider stateConfig={stateConfig}>
              <AsyncDiv isLoading={isLoading}>
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
