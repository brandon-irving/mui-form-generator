import React from 'react'
// import { useFormikContext } from '../MuiFormGenerator/FormikContext'
import Grid from '@material-ui/core/Grid';
import { RowProps } from '../MuiFormGenerator/types'
import ColGenerator from './ColGenerator';
// import { Button } from '@material-ui/core';
import { removeHidden } from '../helperFunctions';
import { Button, Collapse, Divider } from '@material-ui/core';

const RowGenerator = (props: any) => {
    const {
        Rows,
        style,
    } = props

    const filteredRows = removeHidden(Rows)
    return (
        <div style={style}>
            {
                filteredRows.map((row: RowProps, i: number) => {
                    const {
                        title = '',
                        Cols = [{}],
                        hide = false,
                        justify = "flex-end",
                        divider = false,
                        style = {},
                        collapsable = false,
                    } = row
                    const Title = () => title
                    const filteredCols = removeHidden(Cols)
                    if (hide) return null
                    if (divider) {
                        return <Divider key={i} style={{ marginTop: '20px', marginBottom: '20px' }}  />
                    }
                    if (collapsable) {
                        return (
                            <CollapsableRow key={i}  {...collapsable}>
                                <div style={{ marginBottom: '15px' }}>
                                    <Title />
                                </div>
                                <Grid style={style} justify={justify} container spacing={2}>
                                    {
                                        filteredCols.map((Col, i: number) => {

                                            return (<ColGenerator key={i} {...Col} />)
                                        })
                                    }

                                </Grid>
                            </CollapsableRow>)
                    }
                    return (
                        <React.Fragment key={i}>

                            <div style={{ marginBottom: '15px', marginTop: !i ? '0px' : '35px' }}>
                                <Title />
                            </div>
                            <Grid style={style} justify={justify} container spacing={2}>
                                {
                                    filteredCols.map((Col, i: number) => {

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
interface CollapsableRowProps {
    children: any,
    rowTitle: string | any,
    defaultState: boolean
}

export const CollapsableRow = (props: CollapsableRowProps) => {
    const [open, setopen] = React.useState(props.defaultState)

    function handleClick() {
        setopen(!open);
    }
    function handleRowTitle() {
        if (typeof props.rowTitle === 'string') {
            return <Button variant="text" onClick={handleClick}>{props.rowTitle}</Button>
        } else return props.rowTitle({onClick: handleClick})
    }
    return (
        <div>
{handleRowTitle()}
        <Collapse in={open} timeout="auto" unmountOnExit>
            
            {props.children}
        </Collapse>
        </div>
    )
}


export default RowGenerator
