$(document).ready(function(){
    /* Define Broker */
    const BROKER = 'broker.mqttdashboard.com';
    const PORT = 1883;

    /* Create first PI's client to listen to the publishing thread */
    const CLIENTID = '2Nice_Plug1';
    const TOPIC = 'Tele/tele/SENSOR'
    client = new Paho.MQTT.Client(BROKER, PORT, CLIENTID);
    client.connect({onSuccess:onConnect});
    client.onMessageArrived = onMessageArrived;

    
    /* Create second PI's client to listen to the publishing thread */
    const CLIENTID2 = '2Nice_Plug2';
    const TOPIC2 = 'Lamp/tele/SENSOR'
    client_plug2 = new Paho.MQTT.Client(BROKER, PORT, CLIENTID2);   
    client_plug2.connect({onSuccess:onConnect_plug2});
    client_plug2.onMessageArrived = onMessageArrived_plug2;
    
    const CLIENTID3 = '2Nice_Plug3';
    const TOPIC3 = 'Fan/tele/SENSOR'
    client_plug3 = new Paho.MQTT.Client(BROKER, PORT, CLIENTID3);
    client_plug3.connect({onSuccess:onConnect_plug3});
    client_plug3.onMessageArrived = onMessageArrived_plug3;
    
    /* Create second PI's client to listen to the publishing thread */
    const CLIENTID4 = '2Nice_Plug4';
    const TOPIC4 = 'Fire/tele/SENSOR'
    client_plug4 = new Paho.MQTT.Client(BROKER, PORT, CLIENTID4);
    client_plug4.connect({onSuccess:onConnect_plug4});
    client_plug4.onMessageArrived = onMessageArrived_plug4;


    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        client.subscribe(TOPIC);
    }

    // called when the client connects
    function onConnect_plug2() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        client_pi2.subscribe(TOPIC2);
    }
    
    function onConnect_plug3() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client_pi2.subscribe(TOPIC3);
    }

    function onConnect_plug4() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client_pi2.subscribe(TOPIC4);
    }    


    // called when a message arrives
    function onMessageArrived(message) {
        console.log("onMessageArrived:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#Total').text(readings['Total']);
        $('#Yesterday').text(readings['Yesterday']);
        $('#Today').text(readings['Today']);
        $('#Period').text(readings['Period']);
        $('#Power').text(readings['Power']);
        $('#ApparentPower').text(readings['ApparentPower']);
        $('#ReactivePower').text(readings['ReactivePower']);
        $('#Factor').text(readings['Factor']);
        $('#Voltage').text(readings['Voltage']);
        $('#Current').text(readings['Current']);                 
    }

    // called when a message arrives
    function onMessageArrived_plug2(message) {
        console.log("onMessageArrived:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#Total').text(readings['Total']);
        $('#Yesterday').text(readings['Yesterday']);
        $('#Today').text(readings['Today']);
        $('#Period').text(readings['Period']);
        $('#Power').text(readings['Power']);
        $('#ApparentPower').text(readings['ApparentPower']);
        $('#ReactivePower').text(readings['ReactivePower']);
        $('#Factor').text(readings['Factor']);
        $('#Voltage').text(readings['Voltage']);
        $('#Current').text(readings['Current']);                 
    }
    
    function onMessageArrived_plug3(message) {
        console.log("onMessageArrived:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#Total').text(readings['Total']);
        $('#Yesterday').text(readings['Yesterday']);
        $('#Today').text(readings['Today']);
        $('#Period').text(readings['Period']);
        $('#Power').text(readings['Power']);
        $('#ApparentPower').text(readings['ApparentPower']);
        $('#ReactivePower').text(readings['ReactivePower']);
        $('#Factor').text(readings['Factor']);
        $('#Voltage').text(readings['Voltage']);
        $('#Current').text(readings['Current']);                 
    }
    
    function onMessageArrived_plug4(message) {
        console.log("onMessageArrived:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#Total').text(readings['Total']);
        $('#Yesterday').text(readings['Yesterday']);
        $('#Today').text(readings['Today']);
        $('#Period').text(readings['Period']);
        $('#Power').text(readings['Power']);
        $('#ApparentPower').text(readings['ApparentPower']);
        $('#ReactivePower').text(readings['ReactivePower']);
        $('#Factor').text(readings['Factor']);
        $('#Voltage').text(readings['Voltage']);
        $('#Current').text(readings['Current']);                 
    }        

})
