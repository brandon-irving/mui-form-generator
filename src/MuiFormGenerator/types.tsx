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
    hide?: boolean,
    Button?:any,


}
// TODO: replace with all properties of inputs
// interface Input {
//     Rows: any,
//     Cols: any,
//     Inputs: any,

// }
export interface BlueprintProps {
    Rows: RowProps[],

}
export interface MuiFormGeneratorProps {
    blueprint: any,
    validate?: any,
    initialValues: object,
    submitConfig?: object,
}