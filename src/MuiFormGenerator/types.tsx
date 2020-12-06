export interface RowProps {
title?: string | any,
Cols: ColProps[],
hide?: boolean,
justify?: any,
divider?: boolean,
style?: object,

}

export interface ColProps {
    title?:string | any,
    as?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined,
    Input: any,
    Inputs?: any,
    hide?: boolean,
    Button?:any,
    style?: any,
}
/* TODO: replace with all properties of inputs
interface Input {
    ...HTML_INPUT_PROPS,
    style=undefined,
    Component=undefined, custom component, returns formik and input props
    hide=false, 
    options, for select fields
    labelPlacement="end",
}
*/
export interface BlueprintProps {
    Rows: RowProps[],

}
export interface MuiFormGeneratorProps {
    blueprint: any,
    validate?: any,
    initialValues: object,
    isLoading?:boolean,
    handleSubmit?: (values:any, formik:any)=>any,
    cachedStateKey?: string | undefined
    
}