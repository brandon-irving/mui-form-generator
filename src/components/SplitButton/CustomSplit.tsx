import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { CustomProps } from '../../MuiFormGenerator/types'
import AddIcon from '@material-ui/icons/Add'



export default function CustomSplit(props: CustomProps) {
    const { button, secondButton } = props
    const handleClick = () => {
        button.onClick()
    };

    const handleSplitClick = () => {
        secondButton.onClick()
    };


    const Icon = ()=>{
        if(secondButton.icon){
            return(secondButton.icon)
        }else return <AddIcon />
    }
    

    return (

        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color={button.color || 'primary'} >
                    <Button onClick={handleClick}>{button.label}</Button>
                    <Button
                        color={secondButton.color || 'primary'}
                        size="small"
                        onClick={handleSplitClick}
                    >
                       {Icon()}
                    </Button>
                   
                </ButtonGroup>

            </Grid>
        </Grid>

    )
}