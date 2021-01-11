interface BlueprintConfigProps {
    rows: number,
    cols: number[],
    inputs: any[]
}
const blueprintConfig = {
    rows: 4,
    cols: [1, 1, 1, 1],
    inputs: [
        [{
            id: 'name',
            label: 'Name',
            type: 'text',
        }],
        [{
            id: 'ipAddress',
            label: 'IP Address',
            type: 'text',
            defaultValue: 'localHost',
            disabled: true,
        }],
        [{
            id: 'port',
            label: 'Port',
            type: 'number',
        }],
        [{
            colProps: {style: {display: 'flex', justifyContent: 'flex-end'}},
            Button: {
                id: 'submit',
                label: 'Submit',
                type: 'submit'
            }
        }],
    ]
}
function bluePrintGenerator(blueprintConfig: BlueprintConfigProps) {
    const bluePrint: any = { Rows: [] }
    for (let i = 0; i < blueprintConfig.rows; i++) {
        const row: any = {}
        const ColCountPerRow = blueprintConfig.cols[i] === 1 ? 2 : blueprintConfig.cols[i] // row 0, col[0] = 2, 2 cols
        const Inputs = blueprintConfig.inputs[i]

        for (let j = 0; j < ColCountPerRow - 1; j++) { // 0, 1, for cols
            const Cols: any = []
            Inputs.forEach((Input: any) => {
                const PushedInput = { ...Input.colProps, Input }
                if (Input.Button) {
                    PushedInput.Button = Input.Button
                }
                Cols.push(PushedInput)

            });
            row.Cols = Cols
        }
        bluePrint.Rows.push(row)
    }
    return bluePrint
}

export const BaseStationFormBluePrint = () => {
    // console.log('log: bluePrintGenerator', bluePrintGenerator(blueprintConfig))
    return bluePrintGenerator(blueprintConfig)
}