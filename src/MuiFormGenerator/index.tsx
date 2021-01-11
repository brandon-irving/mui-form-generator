import React from 'react'
import { FormikContextProvider } from './FormikContext'
import { Formik } from 'formik'
import { MuiFormGeneratorProps } from './types'
import RowGenerator from '../components/RowGenerator'
import AsyncDiv from '../components/AsyncDiv'
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme'
interface PasswordValidationProps {
  min?: number,
  specialChars?: string,
  atLeastOneUpperCase?: boolean,
  atLeastOneLowerCase?: boolean,
  atLeastOneNumber?: boolean,

}
interface ValidationProps {
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
}
function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
const comparisonErrorMessages =(key:string,value: any)=> {
  const errorMessageMap = {
    min: `Value must be less than or equal to ${value}`,
    max: `Value must be greater than or equal to ${value}`,
    greaterThan: `Value must greater than ${value}`,
    lessThan: `Value must be less than ${value}`,
    isEmail: `Please enter a valid email`,
    maxLength: `Value must be ${value} or less characters`,
    minLength: `Value must be ${value} or more characters`,
    canNotEqual: `Value can not be ${value}`
    
  }
  return errorMessageMap[key]
}
const booleanErrorMessages =(key:string)=> {
  const errorMessageMap = {
    required: `Required`,
    isEmail: `Please enter a valid email`,
  }
  return errorMessageMap[key]
}
function checkIfEqual(values: any[], value: any){
let equal = false
values.forEach((valueToNotEqual: any)=>{
  if(value === valueToNotEqual){
    equal = true
  }
})
return equal
}

function validatePassword(passwordValidations: PasswordValidationProps, password: string){
  const errorMessage:string[] = []
  const defaultValidations = {min:7, specialChars: '!@#$%^&*? ', atLeastOneUpperCase: true, atLeastOneLowerCase: true, atLeastOneNumber: true}
  Object.keys(defaultValidations).forEach((validationRule: string)=>{
    const passwordValidation = passwordValidations[validationRule] || defaultValidations[validationRule]
    const validationMap = {
      min: [passwordValidation, `at least ${passwordValidation} characters`],
      specialChars: [ new RegExp(`(?=.*[${passwordValidation}])`), `at least one of the following characters ${passwordValidation}`],
      atLeastOneUpperCase: [/(?=.*[A-Z])/, 'at least one uppercase letter'],
      atLeastOneLowerCase: [/(?=.*[a-z])/, 'at least one lowercase letter'],
      atLeastOneNumber: [/\d/, 'at least one number'],
    }
    if((validationRule === 'min' && password.length < passwordValidation) || (!validationMap[validationRule][0].test(password))){
      errorMessage.push(validationMap[validationRule][1])
    }
  })
  return errorMessage
}

function handleValidate(values: any, validate: ValidationProps){
  const errors = Object.keys(values).reduce((acc: any, valueKey: string)=>{
    const accumulator = {...acc}
    if(validate[valueKey]){
      const value = values[valueKey] 

      if(!Object.keys(validate[valueKey]).length){
        validate[valueKey].required = true
      }
      Object.keys(validate[valueKey]).forEach((validationKey: string)=>{
        const validation = validate[valueKey][validationKey]

        const isEmpty = value === null || value === undefined || (!value.length && typeof value === 'string')
        const isNotEmpty = !isEmpty
        const isRequired = validationKey === 'required' && validation && isEmpty
        const isMinError = (validationKey === 'min' && isNotEmpty && value < validation[0])
        const isMaxError = (validationKey === 'max' && isNotEmpty && value > validation[0])
        const isGreaterThanError = (validationKey === 'greaterThan' && isNotEmpty && value <= validation[0])
        const isLessThanError = (validationKey === 'lessThan' && isNotEmpty && value >= validation[0])
        const isEmailError = (validationKey === 'isEmail' && isNotEmpty && !validateEmail(value))
        const isMinLengthError = (validationKey === 'minLength' && isNotEmpty && value.length < validation[0])
        const isMaxLengthError = (validationKey === 'maxLength' && isNotEmpty && value.length > validation[0])
        const isCanNotEqualError = (validationKey === 'canNotEqual' && isNotEmpty && checkIfEqual(validation[0], value))
        const listOfPasswordErrors = (validationKey === 'isPassword' && isNotEmpty) ? validatePassword(validation, value) : []

        if(listOfPasswordErrors.length){
          let listOfPasswordErrorsString = listOfPasswordErrors.join()
          listOfPasswordErrorsString = listOfPasswordErrorsString.substring(0, listOfPasswordErrorsString.length)
          listOfPasswordErrorsString.replace(',', ', ')
          const errorMessage = `Password needs ${listOfPasswordErrorsString}`
          accumulator[valueKey] = errorMessage
        }
        if(isRequired || isEmailError){
          const errorMessage = !validation.length ? booleanErrorMessages(validationKey) : validation
          accumulator[valueKey] = errorMessage
        }
        if(isMinError || isMaxError || isGreaterThanError || isLessThanError || isMinLengthError || isMaxLengthError || isCanNotEqualError){
          const errorMessage = validation[1] ||  comparisonErrorMessages(validationKey, validation[0])
          accumulator[valueKey] = errorMessage
        }

      })
    }
    
    return accumulator
  }, {})

  return errors
}
const MuiFormGenerator = (props:MuiFormGeneratorProps) => {
    const {
        initialValues,
        validate,
        manualValidate,
        isLoading=false,
        handleSubmit=()=>{},
        cachedStateKey,
        theme: userChoseTheme
    } = props
    const desiredInitialValues = cachedStateKey && sessionStorage[cachedStateKey] ? JSON.parse(sessionStorage[cachedStateKey]) : initialValues
    async function validation(values:any){
      cachedStateKey && sessionStorage.setItem(cachedStateKey, JSON.stringify(values))
        if(manualValidate){
          const errors = await manualValidate(values)
            return errors
        }else if(validate){
          return handleValidate(values, validate)
        }
        return {}
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
            const stateConfig = {
              formikProps
            }

          return ( 
            <FormikContextProvider stateConfig={stateConfig}>
              <ThemeProvider theme={userChoseTheme || theme}>
              <AsyncDiv isLoading={isLoading}>
                <form onSubmit={formikProps.handleSubmit}>
                <RowGenerator style={props.blueprint.style} Rows={props.blueprint.Rows}/>
                </form>

              </AsyncDiv>
              </ThemeProvider>
              
            </FormikContextProvider>
          )
        }
        }
      </Formik>
    )
}

export default MuiFormGenerator
