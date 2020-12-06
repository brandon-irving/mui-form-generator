import React from 'react'
import { TextField, MenuItem, FormGroup, FormControlLabel, Switch, Checkbox } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { useFormikContext } from 'formik'
import IconButton from '@material-ui/core/IconButton';

interface OptionProps {
    value: any,
    label: string,
}
const InputGenerator = (props: any) => {
    const context: any = useFormikContext()
    const {
        id = '',
        label = '',
        type = 'text',
        style = undefined,
        onChange = () => null,
        Component = undefined,
        hide = false,
        options,
        labelPlacement = "end",
    } = props

    const {
        values,
        errors,
        handleChange,
        setFieldValue,
        submitCount,
    } = context

    const desiredStyle = style ? style : { width: '100%' }
    const value = values[id]
    const error = errors[id] && submitCount ? true : false
    const helperText = props.helperText || (error && errors[id])

    function handleFormChange(e: any) {
        onChange({ value, values, input: e.target.value })
        if (type === 'select') {
            return setFieldValue(id, e.target.value)
        }
        return handleChange(e)
    }
    const textFieldProps = {
        ...props,
        helperText,
        value,
        error,
        onChange: handleFormChange,
        style: desiredStyle,
        select: type === 'select' ? true : undefined,
        InputLabelProps: type === 'date' ? { ...props.InputLabelProps, shrink: true } : { ...props.InputLabelProps },
    }
    if (hide) {
        return null
    }
    if (Component) {
        const customComponentProps = { formik: context, inputProps: props }
        return (<Component {...customComponentProps} />)
    }
    if (type === 'checkbox') {
        return (
            <FormControlLabel
                control={
                    <Checkbox checked={value} onChange={handleChange} name={id} />
                }
                label={label}
            />
        )
    }
    if (type === 'select') {
        return (
            <TextField {...textFieldProps}>
                {options.map((option: OptionProps) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        )
    }
    if (type === 'switch') {
        return (
            <FormGroup row>
                <FormControlLabel
                    control={<Switch checked={value} onChange={handleChange} name={id} />}
                    label={label}
                    labelPlacement={labelPlacement}
                />
            </FormGroup>


        )
    }
    if (type === 'password') {
        return (
            <PasswordInput {...textFieldProps} />)
    }
    return (<TextField {...textFieldProps} />)
}
const PasswordInput = (props: any) => {
    const [showPassword, setshowPassword] = React.useState(false)
    function handleIconClick() {
        setshowPassword(!showPassword)
    }
    const inputProps = props.InputProps || {}
    const textFieldProps = { ...props, type: showPassword ? 'text' : 'password' }
    return (
        <TextField
            {...textFieldProps}

            InputProps={{
                ...inputProps,
                endAdornment: showPassword ?
                    <IconButton style={{padding:'0 !important'}} onClick={handleIconClick}>
                        <VisibilityOffIcon />
                    </IconButton> :
                    <IconButton onClick={handleIconClick}>
                        <VisibilityIcon />
                    </IconButton>
            }}
        />
    )
}

export default InputGenerator
