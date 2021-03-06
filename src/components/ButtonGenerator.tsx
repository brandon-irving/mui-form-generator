import React from 'react'
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';
import SplitButton from './SplitButton';

const ButtonGenerator = (props: any) => {
    const {
        disabled = undefined,
        type = 'button',
        onClick = () => { },
        label = '',
        Component = null,
        splitButton={},
    } = props
    const { values, dirty } = useFormikContext()
    function handleClick() {
        type !== 'submit' && onClick(values)
    }

    const submitDisabled = ()=>{
        let status = true
        if(disabled === false || dirty){
            status = false
        }
        return status
    }

    const desiredDisabled = type !== 'submit' ? disabled : submitDisabled()
    if (Component) {
        return <Component {...props} />
    }
        if(splitButton.dropdown){
            return(<SplitButton  dropdown={splitButton.dropdown} />)
        }
        if(splitButton.custom){
            return(<SplitButton  custom={splitButton.custom} />)
        }
    return (
            <Button
                {...props}
                disabled={desiredDisabled}
                onClick={handleClick}
            >{label}</Button>
    )
}
export default ButtonGenerator
