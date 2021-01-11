import React from 'react'

export const ExampleContainer = (props:any) => {
    return (
        <div style={{marginTop: '35px', borderRadius: 10, padding: '20px', boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.75)', }}>
            {props.children}
        </div>
    )
}
