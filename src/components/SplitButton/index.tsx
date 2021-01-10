import React from 'react';
import CustomSplit from './CustomSplit'
import DropdownSplit from './DropdownSplit'

interface DropdownProps{
    label: string,
    onClick: ()=>any,
    disabled?: boolean | undefined

    }
    interface CustomProps{
        button: any,
        secondButton: any,
        icon: any
        }

interface SplitButtonProps{
custom?: CustomProps,
dropdown?: DropdownProps[],
mainButtonColor?: "inherit" | "default" | "primary" | "secondary" | undefined,
splitButtonColor?: "inherit" | "default" | "primary" | "secondary" | undefined,

}

export default function SplitButton(props: SplitButtonProps) {
    if(props.dropdown) return <DropdownSplit data={props.dropdown} />
    if(props.custom) return <CustomSplit {...props.custom} />
    return null
}