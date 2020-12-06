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
                    <Grid item xs={props.as || true} style={props.style || {}}>
                    {props.title && props.title}
                    { props.Input && <InputGenerator {...props.Input} />}
                    { props.Inputs &&  props.Inputs.map((input:any, i:number)=>{
                        return(<InputGenerator key={i} {...input} />)
                    })}
                    
                    </Grid>
                )
            }
        </React.Fragment>
    )
}

export default ColGenerator
