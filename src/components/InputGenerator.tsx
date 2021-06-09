import React from 'react'
import { DateRange, DateRangePicker } from "materialui-daterange-picker";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormGroup, FormControlLabel, Switch, Checkbox, InputAdornment, FormControl, FormHelperText, Grid } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import DateRangeIcon from '@material-ui/icons/DateRange';
import { TimePicker, DatePicker, DateTimePicker, MuiPickersUtilsProvider  } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { useFormikContext } from 'formik'
import IconButton from '@material-ui/core/IconButton';
import { Add } from '@material-ui/icons';

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
        labelPlacement = "end",
        isAsync = false,
        rows=4,
        subscript,
        disabled
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
        onChange({ values, value: e.target.value, formHandler: context })
        if (type === 'select' || props.type?.includes('date') || type === 'time') {
            return setFieldValue(id, e.target.value)
        }
        return handleChange(e)
    }

    const textFieldProps = {
        ...props,
        type: (props.type?.includes('date') || type === 'time') ? 'text': type,
        helperText,
        value,
        error,
        onChange: handleFormChange,
        style: {...desiredStyle, backgroundColor: disabled ? 'gainsboro' : 'white'},
        select: type === 'select' ? true : undefined,
        InputLabelProps: type === 'date' ? { ...props.InputLabelProps, shrink: true } : { ...props.InputLabelProps },
    }
    if (hide) {
        return null
    }
    let returnComponent = <TextComponent {...textFieldProps} />
    if (Component) {
        const customComponentProps = { formik: context, inputProps: props }
        returnComponent = (<Component {...customComponentProps} />)
    }
    if (type === 'checkbox') {
        returnComponent= (
            <FormControlLabel
                control={
                    <Checkbox checked={value} onChange={handleChange} name={id} />
                }
                label={label}
            />
        )
    }
    if (type === 'select') {
        returnComponent= (<SelectInput {...textFieldProps} isAsync={isAsync} formikProps={context} />)
    }
    if (type === 'switch') {
        returnComponent= (
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
        returnComponent= (
            <PasswordInput {...textFieldProps} />)
    }
    if (type ==='time') {
        returnComponent= (<TimeField  {...textFieldProps} />)
    }
    if (type ==='date') {
        returnComponent= (<DateField  {...textFieldProps} />)
    }
    if (type ==='dateRange') {
        returnComponent= (<DateRangeInput  {...textFieldProps} />)
    }
    if (type ==='dateTime') {
        returnComponent= (<DateTimeField {...textFieldProps}/>)
    }
    if (type ==='textArea') {
        returnComponent= (<TextField {...textFieldProps}  multiline rows={rows}/>)
    }
    if (type ==='selectNative') {
        returnComponent= (
        <TextField 
        {...textFieldProps} 
        select >
           {textFieldProps.options.map((option: OptionProps) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}

        </TextField>)
    }
    return (
        <FormControl style={{width: '100%'}}>
            { returnComponent}
        <FormHelperText>{subscript}</FormHelperText>
      </FormControl>
       
        )
}

function checkIfExists(value: any, defaultValue: any) {
    return value ? value : defaultValue
}

export const TextComponent = (props: any)=>{
    return (<TextField {...props} />)
}

export const SelectInput = (props: any) => {
    const [isLoading, setisLoading] = React.useState(false)
    const [loadedData, setloadedData] = React.useState(false)
    const [options, setoptions] = React.useState(props.options || [])
  
    async function getOptions(){
      if(loadedData) return
      setisLoading(true)
      try{
        const newOptions =  props.asyncCall && await props.asyncCall() || []
        setoptions(newOptions)
      }catch(e){
        setoptions(props.options)
        console.error('Mui-Form-Generator Error: AsyncSelect', e)
      }
      setloadedData(true)
      setisLoading(false)
    }
    function handleChange(_: any, option: any) {
        let obj = { target: { value: option } }
        if (props.multiple) {
            obj = { target: { value: option || [] } }
        }
        props.onChange(obj)
        return obj
    }
    return(
        <Autocomplete
        id={props.id}
        value={props.value}
        disabled={props.disabled}
        options={options}
        onChange={handleChange}
        onFocus={ props.isAsync ? getOptions : ()=>null}
        multiple={props.multiple}
        getOptionDisabled={()=>isLoading}
        getOptionSelected={(option, value) => {
            const getOptions = props.multiple ? option.label === value.label : (option.value == value || option.value == value.value)
            return getOptions
        }}

        getOptionLabel={(option: OptionProps) => {
            return option.label || props.value || 'None Selected'
        }}


        renderInput={(params: any) => {
            async function handleClick(e: any){
                e.preventDefault()
                e.stopPropagation()
                await props.appendAddButton(props)
            }
            return (
                <div style={{ display: 'flex', alignItems: 'center'}}>
            <TextField 
                {...params} 
                helperText={props.helperText} 
                error={props.error} 
                label={props.label} 
                style={props.disabled ? {backgroundColor: 'gainsboro'} : {}}

                />
                {props.appendAddButton &&
                <IconButton disabled={props.disabled} onClick={handleClick}>
                <Add />
              </IconButton>
                }
                { props.appendCustomButton }
                </div>
            )
           
        }}
    />
    )
}
export const TimeField = (props: any)=>{
    function handleChange(e:any){
        props.onChange({target: {value: e._d}})
    }
    return(<MuiPickersUtilsProvider utils={MomentUtils}><TimePicker  {...props} onChange={handleChange} /></MuiPickersUtilsProvider>)
}
export const DateField = (props: any)=>{
    function handleChange(e:any){
        props.onChange({target: {value: e._d}})
    }
    return(<MuiPickersUtilsProvider utils={MomentUtils}><DatePicker  {...props} onChange={handleChange} /></MuiPickersUtilsProvider>)
}
export const DateTimeField = (props: any)=>{
    function handleChange(e:any){
        props.onChange({target: {value: e._d}})
    }
    return(<MuiPickersUtilsProvider utils={MomentUtils}><DateTimePicker  {...props} onChange={handleChange} /></MuiPickersUtilsProvider>)
}
export const DateRangeInput = (props: any) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const defaultMinDate = null
    const defaultMaxDate = null
    const initialDateRange = checkIfExists(props.initialDateRange, { startDate: today, endDate: tomorrow })
    const minDate = checkIfExists(props.minDate, defaultMinDate)
    const maxDate = checkIfExists(props.maxDate, defaultMaxDate)

    const [open, setOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState(initialDateRange);
    // TODO: add custom date formats
    function dateFormatter(isoDate: Date) {
        function addZero(value: number) {
            const addedZero = value < 10 ? `0${value}` : value
            return addedZero
        }
        const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const date = new Date(isoDate)
        const day = addZero(date.getDate())
        const dayName = daysOfTheWeek[date.getDay()]
        const month = date.getMonth() + 1 < 13 ? addZero(date.getMonth() + 1) : '00'
        const year = date.getFullYear()

        const formattedDate = `${month}/${day}/${year} (${dayName})`
        return formattedDate
    }
    function toggle() {
        setOpen(!open)
    }
    function handleChange(dateRange: any) {
        setDateRange(dateRange)
        props.onChange({ id: props.id, target: { value: dateRange } })
    }
    function handleEmptyChange() {
        return
    }
    return (
        <Grid container spacing={2}>
            <Grid item sm={6}>
            <TextField
                label="Start"
                style={{ width: '100%' }}
                onFocus={() => setOpen(true)}
                onChange={handleEmptyChange}
                value={dateFormatter(dateRange.startDate)}
                type="text"
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <DateRangeIcon />
                    </InputAdornment>,
                }}
            />
            </Grid>
           <Grid item sm={6}>
           <TextField
                label="End"
                style={{ width: '100%' }}
                onFocus={() => setOpen(true)}
                onChange={handleEmptyChange}
                value={dateFormatter(dateRange.endDate)}
                type="text"
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <DateRangeIcon />
                    </InputAdornment>,
                }}
            />
           </Grid>
           
            <DateRangePicker
                minDate={minDate}
                maxDate={maxDate}
                initialDateRange={initialDateRange}
                open={open}
                toggle={toggle}
                onChange={(range: DateRange) => handleChange(range)}
            />
        </Grid>

    );
}

export const PasswordInput = (props: any) => {
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
                    <IconButton style={{ padding: '0 !important' }} onClick={handleIconClick}>
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
