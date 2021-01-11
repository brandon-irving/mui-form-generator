async function mockApiCall(){
    function sleep(delay = 0) {
        return new Promise((resolve) => {
          setTimeout(resolve, delay);
        });
      }
    const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
    await sleep(1e3); // For demo purposes.
    const countries  = await response.json();
    const countryOptions = Object.keys(countries).map((key) => {
        const country = countries[key].item[0].name
          return {value: country, label: country}
        })
    return countryOptions
}

function bluePrintGenerator(blueprintConfig) {
    const bluePrint = { Rows: [] }
    for (let i = 0; i < blueprintConfig.rows; i++) {
        const row = {}
        const ColCountPerRow = blueprintConfig.cols[i] === 1 ? 2 : blueprintConfig.cols[i] // row 0, col[0] = 2, 2 cols
        const Inputs = blueprintConfig.inputs[i]

        for (let j = 0; j < ColCountPerRow-1; j++) {
            const Cols = []
            Inputs.forEach((Input) => {
                const PushedInput = {...Input.colProps, Input}
                if(Input.Button){
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
const channelBlueprintConfig = {
    rows: 8,
    cols: [2, 3, 3, 2, 2, 1, 1,1],
    inputs: [[
        // Row 1, 2 Cols, 1 input each
        {
            label: 'Type',
            id: 'type',
            name: 'type',
            type: 'select',
            options: [{ label: 'AC', value: 0 }, { label: 'DC', value: 1 }],
            appendAddButton: (props)=>console.log('log: props clicked', props)
        },
        {
            label: 'Name',
            id: 'name',
            name: 'name',
            type: 'text',
        },
    ],
    // Row 2
    [
        {
            label: 'Link to Asset',
            id: 'assetId',
            name: 'assetId',
            type: 'select',
            options: [],
            isAsync: true,
            apiCall: async()=>{
                // must return data in format: [{label: '', value: ''}]
                const mockData = await mockApiCall()
                return mockData
            },
            appendAddButton: (props)=>console.log('log: props clicked', props)
        },
        {
            label: 'Hardware Unit',
            id: 'hardwareUnitId',
            name: 'hardwareUnitId',
            type: 'select',
            options: [],
            isAsync: true,
                        apiCall: async()=>{
                // must return data in format: [{label: '', value: ''}]
                const mockData = await mockApiCall()
                return mockData
            },
            appendAddButton: (props)=>console.log('log: props clicked', props)

        },
        {
            label: 'Channel',
            id: 'channelNum',
            name: 'channelNum',
            type: 'select',
            options: [],
            isAsync: true,
                        apiCall: async()=>{
                // must return data in format: [{label: '', value: ''}]
                const mockData = await mockApiCall()
                return mockData
            },
            appendAddButton: (props)=>console.log('log: props clicked', props)

        },
        
    ],
    // Row 3
    [
        {
            label: 'AP Set',
            id: 'apsetId',
            name: 'apsetId',
            type: 'select',
            options: [],
            isAsync: true,
                        apiCall: async()=>{
                // must return data in format: [{label: '', value: ''}]
                const mockData = await mockApiCall()
                return mockData
            },
            appendAddButton: (props)=>console.log('log: props clicked', props)

        },
        {
            label: 'AL Set',
            id: 'alsetId',
            name: 'alsetId',
            type: 'select',
            options: [],
            isAsync: true,
                        apiCall: async()=>{
                // must return data in format: [{label: '', value: ''}]
                const mockData = await mockApiCall()
                return mockData
            },
            appendAddButton: (props)=>console.log('log: props clicked', props)

        },
        {
            label: 'FF Set',
            id: 'faultFrequencySetId',
            name: 'faultFrequencySetId',
            type: 'select',
            options: [],
            isAsync: true,
                        apiCall: async()=>{
                // must return data in format: [{label: '', value: ''}]
                const mockData = await mockApiCall()
                return mockData
            },
            appendAddButton: (props)=>console.log('log: props clicked', props)

        },
        
    ],
    // Row 4
    [
        {
            label: 'Sample Intervalu (minutes)*',
            id: 'sampleInterval',
            name: 'sampleInterval',
            type: 'number',
        },
        {
            label: 'Sensitivity (mv/units)*',
            id: 'sensitivity',
            name: 'sensitivity',
            type: 'number',
        },
        
    ],
    // Row 5
    [
        {
            label: 'Tachometer',
            id: 'tachometerId',
            name: 'tachometerId',
            type: 'select',
            options: [],
            isAsync: true,
                        apiCall: async()=>{
                // must return data in format: [{label: '', value: ''}]
                const mockData = await mockApiCall()
                return mockData
            },
            appendAddButton: (props)=>console.log('log: props clicked', props)

        },
    ],
    [
        {
            colProps: {style: {display: 'flex', justifyContent: 'flex-end'}},
            Button: {
                id: 'demodulation',
                name: 'demodulation',
                label: 'Demodulation Settings',
                onClick: ()=>window.alert('Demod pressed')
            }
        },
    ],
    // Row 6
    [
        {
            label: 'Trigger Alarm',
            id: 'alarmTrigger',
            name: 'alarmTrigger',
            type: 'checkbox',
        },
    ],
    // Row 7
    [
        {
            colProps: {style: {display: 'flex', justifyContent: 'flex-end'}},
            Button: {
                id: 'submit',
                name: 'submit',
                type: 'submit',
                label: 'Submit',
            }
        },
    ],
    ]
}
const basestationBlueprintConfig = {
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
            disabled: true,
        }],
        [{
            id: 'port',
            label: 'Port',
            type: 'number',
            InputProps: {inputProps: { min: 0}},
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
const areaBlueprintConfig = {
    rows: 2,
    cols: [1, 1,],
    inputs: [
        [{
            id: 'name',
            label: 'Name',
            type: 'text',
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
const assetBlueprintConfig = (props)=>({
    rows: 4,
    cols: [1, 1, 1, 1],
    inputs: [
        [{
            id: 'name',
            label: 'Name',
            type: 'text',
        }],
        [{
            id: 'areaId',
            label: 'Link to Area',
            type: 'select',
            isAsync: true,
            defaultOptions: props.areaOptions,
            apiCall: async()=>{
                if(props.loadAreaOptions){
                    const mockData = await mockApiCall()
                    props.setareaOptions(mockData)
                    props.setloadAreaOptions(false)
                    return mockData
                }
                return props.areaOptions
            },
        }],
        [{
            id: 'equipmentId',
            label: 'EquipmentId',
            type: 'text',
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
})
const hardwareUnitBlueprintConfig = (props)=>({
    rows: 5,
    cols: [1, 1, 1, 1, 1],
    inputs: [
        [{
            id: 'name',
            label: 'Name',
            type: 'text',
        }],
        [{
            id: 'type',
            label: 'Type',
            type: 'select',
            options: props.hwuTypeOptions,
            onChange: (innerProps)=>{
                const serialNumberPrefix = props.serialNumberRules[innerProps.value.value]
                const newSerialNumberTitle = props.serialNumberTitle.substring(0,14) + `(${serialNumberPrefix})`
                props.setserialNumberTitle(newSerialNumberTitle)
                console.log('log: props',innerProps, props.serialNumberRules[innerProps.value.value])
            }
        }],
        [{
            id: 'serialNumber',
            label: `${props.serialNumberTitle}`,
            type: 'text',
        }],
        [{
            id: 'baseStationId',
            label: 'Base Station',
            type: 'select',
            isAsync: true,
            defaultOptions: props.baseStationOptions,
            apiCall: async(innerProps)=>{
                console.log('log: apiCall innerProps', innerProps)
                if(props.loadBaseStationOptions){
                    const mockData = await mockApiCall()
                    props.setbaseStationOptions(mockData)
                    props.setloadBaseStationOptions(false)
                    return mockData
                }
                return props.baseStationOptions
            },
            appendAddButton: (props)=>console.log('log: props clicked', props)
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
})
export const ChannelFormBluePrint = () => {
    return bluePrintGenerator(channelBlueprintConfig)
}
export const BaseStationFormBluePrint = () => {
    return bluePrintGenerator(basestationBlueprintConfig)
}
export const AreaFormBluePrint = () => {
    return bluePrintGenerator(areaBlueprintConfig)
}
export const AssetFormBluePrint = (props) => {
    return bluePrintGenerator(assetBlueprintConfig(props))
}
export const HardwareUnitFormBluePrint = (props) => {
    return bluePrintGenerator(hardwareUnitBlueprintConfig(props))
}