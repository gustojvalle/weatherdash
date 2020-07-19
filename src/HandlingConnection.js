import mqtt, {MqttClient} from 'mqtt';


class handlingConnection {
    constructor(host, port,topic) {
        this.host = host;
        this.port = port;
        this.topic = topic;
        this.client = mqtt.connect('ws://' + this.host + ':' + this.port);
    }

    connecting(topic=this.topic){
        this.client.on("connect", ()=>{
            console.log("connected");
            this.client.subscribe(this.topic);
        });
    }


    clientOff(){
        if(this.client)
            this.client.end()
    }

    onClick(){
            this.client.publish("lights", "true")
    }

}

export default  handlingConnection;
