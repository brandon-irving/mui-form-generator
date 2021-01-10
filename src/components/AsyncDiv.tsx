import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
interface AsyncDivProps {
    isLoading: boolean,
    children: any
}
const AsyncDiv = (props: AsyncDivProps) => {
    const baseStyle = {width: 'inherit', margin: '10px', flexGrow: 1, position: "relative"}
    return (
        <div style={props.isLoading ? {...baseStyle, position: "relative", opacity: '0.6', pointerEvents: 'none'} : {...baseStyle, position: "relative"}}>
            {props.children}
            {props.isLoading && <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%',}} />}
        </div>
    )
}

export default AsyncDiv
