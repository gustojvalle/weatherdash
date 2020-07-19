import React from 'react'
import { render } from 'react-dom'
import Thermometer from 'react-thermometer-component'

class Thermo extends React.Component{
    render(){
        return (
    <Thermometer
    theme="dark"
    value={this.props.value}
    max="34"
    steps="0.01"
    format="°C"
    size="medium"
    height="200"
    />)

    }
}
export default Thermo
