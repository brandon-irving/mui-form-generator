import React from 'react'
// import { useFormikContext } from '../MuiFormGenerator/FormikContext'
import Grid from '@material-ui/core/Grid';
import { RowProps } from '../MuiFormGenerator/types'
import ColGenerator from './ColGenerator';
// import { Button } from '@material-ui/core';
import { removeHidden } from '../helperFunctions';
import { Divider } from '@material-ui/core';

const RowGenerator = (props: any) => {
    const {
        Rows,
    } = props

    const filteredRows = removeHidden(Rows)

    return (
        <React.Fragment>
            {
                filteredRows.map((row: RowProps, i: number) => {
                    const {
                        title = '',
                        Cols=[{}],
                        hide = false,
                        justify= "flex-end",
                        divider=false,
                        style={},
                    } = row
                    const Title = () => title
                    const filteredCols = removeHidden(Cols)
                    if(hide)return null
                    if(divider){
                        return <Divider style={{marginTop:'20px', marginBottom:'20px'}} key={i}/>
                    }
                    return (
                        <Grid style={style} justify={justify} container key={i} spacing={2}>
                            <Title />
                            {
                                filteredCols.map((Col, i:number) => {
                                    
                                    return (<ColGenerator key={i} {...Col} />)
                                })
                            }

                        </Grid>
                    )
                })
            }
        </React.Fragment>
    )
}

export default RowGenerator
