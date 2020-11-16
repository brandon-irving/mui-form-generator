import React from 'react'
import { TextField, MenuItem, FormGroup, FormControlLabel, Switch } from '@material-ui/core'

import { useFormikContext } from 'formik'

interface OptionProps {
    value: any,
    label: string,
}
const InputGenerator = (props: any) => {
    const context:any = useFormikContext()
    const {
        id='',
        label='',
        type='text',
        style=undefined,
        onChange=()=>null,
        Component=undefined,
        hide=false,
        options,
        labelPlacement="end",

    } = props

    const {
        values,
        errors,
        handleChange,
        setFieldValue,
    } = context

    const desiredStyle = style ? style : {width: '100%'}
    const value = values[id]
    const error = errors[id] ? true : false
    const helperText= props.helperText || errors[id] 

    function handleFormChange(e:any){
        onChange({value, values, input: e.target.value})
        if(type==='select'){
            return setFieldValue(id, e.target.value)
        }
        return handleChange(e)
    }
    const textFieldProps = {
        ...props,
        helperText,
        value,
        error,
        onChange: handleFormChange,
        style: desiredStyle,
        select: type==='select'? true : undefined,
    }
    console.log('log: InputGenerator props', {values, context, props})
    if(hide){
        return null
    }
    if(Component){
        const customComponentProps = {formik: context, inputProps: props}
        return(<Component {...customComponentProps} />)
    }
    if(type === 'select'){
        return (
        <TextField {...textFieldProps}>
             {options.map((option: OptionProps) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
            )
    }
    if( type === 'switch'){
        return(
            <FormGroup row>
            <FormControlLabel
            control={<Switch  checked={value} onChange={handleChange} name={id} />}
            label={label}
            labelPlacement={labelPlacement}
          />
            </FormGroup>

           
        )
    }
    return (<TextField {...textFieldProps}/>)
}

export default InputGenerator
