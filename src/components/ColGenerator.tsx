import React from 'react'
import { Grid } from '@material-ui/core';
import { ColProps } from '../MuiFormGenerator/types'
import InputGenerator from './InputGenerator';
import ButtonGenerator from './ButtonGenerator';

const ColGenerator = (props:ColProps) => {
    console.log('log: ColGenerator props', {props})

    if(props.hide){
        return null
    }
    return (
        <React.Fragment>
            {
                props.Button !== undefined ? (<ButtonGenerator {...props.Button}/>):
                (
                    <Grid item xs={props.as || true}>
                    <InputGenerator {...props.Input} />
                    </Grid>
                )
            }
        </React.Fragment>
    )
}

export default ColGenerator
