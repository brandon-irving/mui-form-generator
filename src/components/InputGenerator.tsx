import React from 'react'
import { DateRange, DateRangePicker } from "materialui-daterange-picker";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormGroup, FormControlLabel, Switch, Checkbox, InputAdornment } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import DateRangeIcon from '@material-ui/icons/DateRange';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        labelPlacement = "end",
        isAsync = false,
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
        if (type === 'select' || type === 'dateRange') {
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
        if (isAsync) {
            return (<Asynchronous {...textFieldProps} />)
        }
        return (<SelectInput {...textFieldProps} />)
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
    if (type === 'dateRange') {
        return (
            <DateRangeInput {...textFieldProps} />)
    }
    return (<TextField {...textFieldProps} />)
}

function checkIfExists(value: any, defaultValue: any) {
    return value ? value : defaultValue
}

const SelectInput = (props: any) => {

    function handleChange(_: any, option: any) {
        const value = option && option.value ? option.value : option
        let obj = { target: { value: value || '' } }
        if (props.multiple) {
            obj = { target: { value: option || [] } }
        }
        props.onChange(obj)
        return obj
    }
    const defaulOption = {value: '', label: 'None Selected'}
    const options = props.multiple ? props.options : [...props.options, defaulOption]
    return(
        <Autocomplete
        id={props.id}
        value={props.value}
        options={options}
        onChange={handleChange}
        multiple={props.multiple}
        getOptionSelected={(option, value) => {
            const getOptions = props.multiple ? option.label === value.label : option.value === value
            return getOptions
        }}

        getOptionLabel={(option: OptionProps) => {
            return option.label || props.value || 'None Selected'
        }}
        renderInput={(params: any) => <TextField helperText={props.helperText}
            error={props.error} label={props.label} {...params} />}
    />
    )
}



function Asynchronous(props: any) {
    const defaultOptions = props.defaultOptions || [{}]
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState(defaultOptions);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await props.apiCall()
            if (active) {
                setOptions(response);

            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    function handleChange(option: any) {
        let obj = { target: { value: option.value || '' } }
        if (props.multiple) {
            obj = { target: { value: option || [] } }
        }
        props.onChange(obj)
    }
    return (
        <Autocomplete
            id={props.id}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            value={props.value}
            getOptionSelected={(option, value) => option.label === value.label}
            getOptionLabel={(option: any) => option.label}
            options={options}
            loading={loading}
            multiple={props.multiple}
            onChange={(_, newValue) => {
                handleChange(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    helperText={props.helperText}
                    error={props.error}
                    label={props.label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
const DateRangeInput = (props: any) => {
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
        <React.Fragment>
            <TextField
                label="Start"
                style={{ marginRight: '10px' }}
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
            <TextField
                label="End"
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
            <DateRangePicker
                minDate={minDate}
                maxDate={maxDate}
                initialDateRange={initialDateRange}
                open={open}
                toggle={toggle}
                onChange={(range: DateRange) => handleChange(range)}
            />
        </React.Fragment>

    );
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
