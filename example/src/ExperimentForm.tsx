import React from 'react'
import 'mui-form-generator/dist/index.css'
import BaseStationForm  from './temp/BaseStationForm'
import ChannelForm from './temp/ChannelForm'
import AreaForm from './temp/AreaForm'
import AssetForm from './temp/AssetForm'
import HardwareUnitForm from './temp/HardwareUnitForm'

export default function ExperimentForm() {
    return (
        <React.Fragment>
            <AreaForm />
            <AssetForm />
            <BaseStationForm />
            <HardwareUnitForm />
            <ChannelForm />
        </React.Fragment>
        
    )
}

