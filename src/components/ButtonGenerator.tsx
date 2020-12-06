import React from 'react'
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';

const ButtonGenerator = (props: any) => {
    const {
        disabled = false,
        type='button',
        onClick=()=>{},
        label='',
    } = props
   const { values, dirty } = useFormikContext()
    function handleClick(){
        type !=='submit' && onClick(values)
    }
    const desiredDisabled = type !=='submit' ? disabled : (disabled || !dirty)
    return (
        <div style={{marginLeft: '10px', marginTop: '20px'} }>
    <Button 
        {...props} 
        disabled={desiredDisabled} 
        onClick={handleClick} 
    >{label}</Button>
        </div>
    )
}

export default ButtonGenerator
