$(document).ready(function(){

    const BROKER = 'broker.mqttdashboard.com';
    const PORT = 8000;
    
    let total_readings = {}
/*Television*/
    const CLIENTID = 'Tele_Plug1';
    const TOPIC = 'Tele/tele/SENSOR'
    client = new Paho.MQTT.Client(BROKER, PORT, CLIENTID);
    client.connect({onSuccess:onConnect});
    client.onMessageArrived = onMessageArrived;
    
    const CLIENTID_STATE = 'Tele_Plug1_state';
    const TOPIC_STATE = 'Tele/tele/STATE'
    client_state = new Paho.MQTT.Client(BROKER, PORT, CLIENTID_STATE);
    client_state.connect({onSuccess:onConnect_state});
    client_state.onMessageArrived = onMessageArrived_state;

/*Lamp*/    
    const CLIENTID2 = 'Lamp_Plug2';
    const TOPIC2 = 'Lamp/tele/SENSOR'
    client_plug2 = new Paho.MQTT.Client(BROKER, PORT, CLIENTID2);   
    client_plug2.connect({onSuccess:onConnect_plug2});
    client_plug2.onMessageArrived = onMessageArrived_plug2;
    
    const CLIENTID_STATE2 = 'Lamp_Plug2_state';
    const TOPIC_STATE2 = 'Lamp/tele/STATE'
    client_state2 = new Paho.MQTT.Client(BROKER, PORT, CLIENTID_STATE2);
    client_state2.connect({onSuccess:onConnect_state2});
    client_state2.onMessageArrived = onMessageArrived_state2;    
/*Fan*/     
    const CLIENTID3 = 'Fan_Plug3';
    const TOPIC3 = 'Fan/tele/SENSOR'
    client_plug3 = new Paho.MQTT.Client(BROKER, PORT, CLIENTID3);
    client_plug3.connect({onSuccess:onConnect_plug3});
    client_plug3.onMessageArrived = onMessageArrived_plug3;
    
    const CLIENTID_STATE3 = 'Fan_Plug3_state';
    const TOPIC_STATE3 = 'Fan/tele/STATE'
    client_state3 = new Paho.MQTT.Client(BROKER, PORT, CLIENTID_STATE3);
    client_state3.connect({onSuccess:onConnect_state3});
    client_state3.onMessageArrived = onMessageArrived_state3;    
/*Fire*/     
    const CLIENTID4 = 'Fire_Plug4';
    const TOPIC4 = 'Fire/tele/SENSOR'
    client_plug4 = new Paho.MQTT.Client(BROKER, PORT, CLIENTID4);
    client_plug4.connect({onSuccess:onConnect_plug4});
    client_plug4.onMessageArrived = onMessageArrived_plug4;
    
    const CLIENTID_STATE4 = 'Fire_Plug4_state';
    const TOPIC_STATE4 = 'Fire/tele/STATE'
    client_state4 = new Paho.MQTT.Client(BROKER, PORT, CLIENTID_STATE4);
    client_state4.connect({onSuccess:onConnect_state4});
    client_state4.onMessageArrived = onMessageArrived_state4;     

/*Television*/
    function onConnect() {
        console.log("onConnect");
        client.subscribe(TOPIC);
    }
    
    function onConnect_state() {
        console.log("onConnect");
        client_state.subscribe(TOPIC_STATE);
    }    
/*Lamp*/ 
    function onConnect_plug2() {
        console.log("onConnect");
        client_plug2.subscribe(TOPIC2);
    }
    
    function onConnect_state2() {
        console.log("onConnect");
        client_state2.subscribe(TOPIC_STATE2);
    }     
/*Fan*/     
    function onConnect_plug3() {
    console.log("onConnect");
    client_plug3.subscribe(TOPIC3);
    }
    
    function onConnect_state3() {
        console.log("onConnect");
        client_state3.subscribe(TOPIC_STATE3);
    }     
/*Fire*/ 
    function onConnect_plug4() {
    console.log("onConnect");
    client_plug4.subscribe(TOPIC4);
    }
    
    function onConnect_state4() {
        console.log("onConnect");
        client_state4.subscribe(TOPIC_STATE4);
    }         


/*Television*/
    function onMessageArrived(message) {
        console.log("onMessageArrived Television:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#Total').text(readings["ENERGY"]['Total']);
        $('#Yesterday').text(readings["ENERGY"]['Yesterday']);
        $('#Today').text(readings["ENERGY"]['Today']);
        $('#Period').text(readings["ENERGY"]['Period']);
        $('#Power').text(readings["ENERGY"]['Power']);
        $('#ApparentPower').text(readings["ENERGY"]['ApparentPower']);
        $('#ReactivePower').text(readings["ENERGY"]['ReactivePower']);
        $('#Factor').text(readings["ENERGY"]['Factor']);
        $('#Voltage').text(readings["ENERGY"]['Voltage']);
        $('#Current').text(readings["ENERGY"]['Current']);                 
    }
    
    function onMessageArrived_state(message) {
        console.log("onMessageArrived Television state:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#PowerS').text(readings['POWER']);
        total_readings["plug1_state"] = readings
        $.post("/save_data",{"readings":JSON.stringify(readings)})                          
    }    

/*Lamp*/ 
    function onMessageArrived_plug2(message) {
        console.log("onMessageArrived Lamp:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#Total1').text(readings["ENERGY"]['Total']);
        $('#Yesterday1').text(readings["ENERGY"]['Yesterday']);
        $('#Today1').text(readings["ENERGY"]['Today']);
        $('#Period1').text(readings["ENERGY"]['Period']);
        $('#Power1').text(readings["ENERGY"]['Power']);
        $('#ApparentPower1').text(readings["ENERGY"]['ApparentPower']);
        $('#ReactivePower1').text(readings['ReactivePower']);
        $('#Factor1').text(readings["ENERGY"]['Factor']);
        $('#Voltage1').text(readings["ENERGY"]['Voltage']);
        $('#Current1').text(readings["ENERGY"]['Current']);                 
    }
    
    function onMessageArrived_state2(message) {
        console.log("onMessageArrived Lamp state:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#PowerS1').text(readings['POWER']);
        total_readings["plug2_state"] = readings
        $.post("/save_data",{"readings":JSON.stringify(readings)})                          
    }    
/*Fan*/     
    function onMessageArrived_plug3(message) {
        console.log("onMessageArrived Fan:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#Total2').text(readings["ENERGY"]['Total']);
        $('#Yesterday2').text(readings["ENERGY"]['Yesterday']);
        $('#Today2').text(readings["ENERGY"]['Today']);
        $('#Period2').text(readings["ENERGY"]['Period']);
        $('#Power2').text(readings["ENERGY"]['Power']);
        $('#ApparentPower2').text(readings["ENERGY"]['ApparentPower']);
        $('#ReactivePower2').text(readings["ENERGY"]['ReactivePower']);
        $('#Factor2').text(readings["ENERGY"]['Factor']);
        $('#Voltage2').text(readings["ENERGY"]['Voltage']);
        $('#Current2').text(readings["ENERGY"]['Current']);                 
    }
    
    function onMessageArrived_state3(message) {
        console.log("onMessageArrived Fan state:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#PowerS2').text(readings['POWER']);
        total_readings["plug3_state"] = readings
        $.post("/save_data",{"readings":JSON.stringify(readings)})                          
    }     
/*Fire*/     
    function onMessageArrived_plug4(message) {
        console.log("onMessageArrived Fire:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#Total3').text(readings["ENERGY"]['Total']);
        $('#Yesterday3').text(readings["ENERGY"]['Yesterday']);
        $('#Today3').text(readings["ENERGY"]['Today']);
        $('#Period3').text(readings["ENERGY"]['Period']);
        $('#Power3').text(readings["ENERGY"]['Power']);
        $('#ApparentPower3').text(readings["ENERGY"]['ApparentPower']);
        $('#ReactivePower3').text(readings["ENERGY"]['ReactivePower']);
        $('#Factor3').text(readings["ENERGY"]['Factor']);
        $('#Voltage3').text(readings["ENERGY"]['Voltage']);
        $('#Current3').text(readings["ENERGY"]['Current']);
        total_readings["plug4"] = readings
        $.post("/save_data",{"readings":JSON.stringify(readings)})                
    }
    
    function onMessageArrived_state4(message) {
        console.log("onMessageArrived Fire state:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#PowerS3').text(readings['POWER']);
        total_readings["plug4_state"] = readings
        $.post("/save_data",{"readings":JSON.stringify(readings)})                          
    }      
/*function to send message to power the plugs*/     
    function sendMessage(message_data, destination){
        message = new Paho.MQTT.Message(message_data);
        message.destinationName = destination;
        client.send(message);
        console.log("Message Sent")
    }
/*Television*/ 
    $("#toggle_plug1").click(function(){
        if(total_readings["plug1_state"]["POWER"] == "OFF"){
           sendMessage("ON", "Tele/cmnd/POWER"); 
        }
        else{
            sendMessage("OFF", "Tele/cmnd/POWER"); 
        }
                
    })
/*Lamp*/     
    $("#toggle_plug2").click(function(){
        if(total_readings["plug2_state"]["POWER"] == "OFF"){
           sendMessage("ON", "Lamp/cmnd/POWER"); 
        }
        else{
            sendMessage("OFF", "Lamp/cmnd/POWER"); 
        }
                
    })
/*Fan*/     
    $("#toggle_plug3").click(function(){
        if(total_readings["plug3_state"]["POWER"] == "OFF"){
           sendMessage("ON", "Fan/cmnd/POWER"); 
        }
        else{
            sendMessage("OFF", "Fan/cmnd/POWER"); 
        }
                
    })
/*Fire*/     
    $("#toggle_plug4").click(function(){
        if(total_readings["plug4_state"]["POWER"] == "OFF"){
           sendMessage("ON", "Fire/cmnd/POWER"); 
        }
        else{
            sendMessage("OFF", "Fire/cmnd/POWER"); 
        }
                
    })                    

})
