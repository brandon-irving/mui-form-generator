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
        style
    } = props

    const filteredRows = removeHidden(Rows)
    return (
        <div style={style}>
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
                        <React.Fragment key={i}>
                                                        
                        <div style={{marginBottom: '15px'}}>
                        <Title />
                        </div>
                        <Grid style={style} justify={justify} container  spacing={2}>
                            {
                                filteredCols.map((Col, i:number) => {
                                    
                                    return (<ColGenerator key={i} {...Col} />)
                                })
                            }

                        </Grid>
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default RowGenerator
