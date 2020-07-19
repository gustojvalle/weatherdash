import 'semantic-ui-css/semantic.min.css';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import React from 'react';
import './App.css';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Thermo from './Components/Thermometer';
import handlingConnectio from './HandlingConnection.js'
import {Layout} from 'antd'
import LightBulb from "./Components/lightBulb";
import {Icon} from 'semantic-ui-react'
import MyCard, {handlingState} from "./Components/Card";
import Typography from "@material-ui/core/Typography";



const {Header, Footer, Sider, Content} = Layout;

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            "data" : {},
            "buttonState": false
        };
        this.connection = new handlingConnectio('192.168.1.103','1885','tempdata')
        this.Card = new MyCard
    }




    componentDidMount(){

        this.connection.connecting();
        //had to be taken out of the Handling Connection class because it updates the state and
        //I coulnd't find a way to work around, but feel free to implement in the class
        this.connection.client.on("message",  (topic,message)=> {
            console.log(message.toString());
            let newState = message.toString();
            let newStateJson= JSON.parse(newState);
            this.setState({"data":newStateJson,"buttonState":this.state.buttonState})
        })
    }
    handleClick(){
        this.connection.client.publish("lights",this.state.buttonState.toString(),{Qos:0});
        console.log('ButtonClicked Message Sent', this.state.buttonState);
        this.setState({"data":this.state.data,"buttonState":!this.state.buttonState})

    }


    componentWillUnmount() {
            this.connection.clientOff()
    }



        render()
        {

            function Card(value,temp,press,handle,buttonState){
                if (value){
                    return(
                        <div>
                        <Chip gutter={30} avatar={<Avatar className="avatar">atm</Avatar>}
                              label={press}/>
                        <p/>
                        <Thermo alignemt="center" value={temp}/>
                        </div>
                        )
                }else{
                    return(
                        <div>
                        <Button className="lightButton" Onevariant="outlined" color="primary"
                                onClick={handle}>
                            Light One
                            {/*Turn {this.state.buttonState ? "On" : "Off"}   */}<LightBulb
                            lightstate={!buttonState ? 'yellow' : 'grey'}/>
                        </Button>
                        </div>
                    )
                }

            }


            return (
                <div className="App">
                    <h1>House Condition Monitoring</h1>
                    <p/>

                    <p/>

                <div alignment = "center">
                    <Grid container className="root" spacing={2}>
                        <Grid item xs={12}>
                            <p bold = "true">Bedroom</p>
                            <Grid container justify="center" spacing="spacing">
                                {[true,false].map((value) => (
                                    <Grid key={value} item>
                                        {Card(value,
                                            this.state.data.temperature,
                                            this.state.data.pressure,
                                            this.handleClick.bind(this),
                                            this.state.buttonState
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                </div>
                    <p/>
                </div>
            );
        }

}

export default App;
