import React from 'react'
import { Grid } from '@material-ui/core';
import { ColProps } from '../MuiFormGenerator/types'
import InputGenerator from './InputGenerator';
import ButtonGenerator from './ButtonGenerator';

const ColGenerator = (props:ColProps) => {
    let style = {}
    if(props.style){
        style = props.style
    }
    if(props.justifyContent) {
        style = {...props.style, display: 'flex', justifyContent: 'flex-end'}
    }
    if(props.hide){
        return null
    }
    return (
        <React.Fragment>
            {
                props.Button !== undefined ? (
                    <Grid item xs={12} sm={props.as || true} style={style}>
                        <ButtonGenerator {...props.Button}/>
                        </Grid>
                ):
                (
                    <Grid item xs={12} sm={props.as || true} style={style}>
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
