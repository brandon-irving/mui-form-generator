import React from 'react'
import { Button } from '@material-ui/core';

const ButtonGenerator = (props: any) => {
    console.log('log: ButtonGenerator', {props})
    return (
        <div style={{marginLeft: '10px', marginTop: '20px'} }>
    <Button {...props} >{props.label}</Button>
        </div>
    )
}

export default ButtonGenerator
