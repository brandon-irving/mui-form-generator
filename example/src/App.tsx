import React from 'react'
import SignUpForm from './SignUpForm'
import SelectForm from './SelectForm'
import DateUsageForm from './DateUsageForm'
import 'mui-form-generator/dist/index.css'
function DividerDiv(props:any){
    const style = {
        margin: '10px',
    borderTop: '1px solid',
    border: '1px solid',
    marginTop: '40px',
    marginBottom: '40px',
    }
   return <div style={style}>
        {props.children}
    </div>
}
const App = () => {
    return (
        <div>
            <DividerDiv>
            <SelectForm />
            </DividerDiv>
            <DividerDiv>
            <DateUsageForm />
            </DividerDiv>
            <DividerDiv>
            <SignUpForm />
            </DividerDiv>

            {/* <DateUsageForm />
            <SignUpForm /> */}
        </div>
    )
}

export default App
