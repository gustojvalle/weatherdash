import React from 'react';
import './Card.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Thermo from "./Thermometer";



class MyCard extends React.Component{

    constructor() {
        super();
        }



    render(){

        return (
            <Card style = {{maxWidth:350,
                            backgroundColor : "#6c6ea0",
                            display: "flex",
                            alignContent:"center",
                            maxHeight:500

            }}>
                <h>

                </h>
                <CardActionArea >
                    <CardContent>

                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>
        );
    }

}

export default MyCard