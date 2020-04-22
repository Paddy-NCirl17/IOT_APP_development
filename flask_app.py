import eventlet
import json
from flask import Flask, render_template
from flask_mqtt import Mqtt
from flask_socketio import SocketIO
from flask_bootstrap import Bootstrap
import paho.mqtt.client as mqtt
import mongo_db as m

eventlet.monkey_patch()    

app = Flask(__name__)

app.config['MQTT_BROKER_URL'] = "broker.mqttdashboard.com"  # use the free broker from HIVEMQ
app.config['MQTT_BROKER_PORT'] = 1883  # default port for non-tls connection
app.config['MQTT_KEEPALIVE'] = 5  # set the time interval for sending a ping to the broker to 5 seconds
app.config['MQTT_TLS_ENABLED'] = False  # set TLS to disabled for testing purposes
MQTT_TOPIC = [("Lamp/#", 0),("Tele/#", 0),("Fan/#", 0),("Fire/#", 0)]
mqtt = Mqtt(app)
socketio = SocketIO(app)
bootstrap = Bootstrap(app)  

@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    mqtt.subscribe(MQTT_TOPIC)
    
@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    print("message received " ,message.payload.decode("utf-8","ignore"))
    print("message topic=",message.topic)
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )    
@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/fan')
def fan():
    return render_template('fan.html')
    
@app.route('/fire')
def fire():
    return render_template('fire.html')
    
@app.route('/lamp')
def lamp():
    return render_template('lamp.html')                    

@app.route('/save_data')
def save():
    response = m.insert_into(temp)
    return json.dumps({"success": True}) 



@socketio.on('publish')
def handle_publish(json_str):
    data = json.loads(json_str)
    mqtt.publish(data['topic'], data['message'])


@socketio.on('subscribe')
def handle_subscribe(json_str):
    data = json.loads(json_str)
    mqtt.subscribe(data['topic'])


@socketio.on('unsubscribe_all')
def handle_unsubscribe_all():
    mqtt.unsubscribe_all()


@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )
    socketio.emit('mqtt_message', data=data)


@mqtt.on_log()
def handle_logging(client, userdata, level, buf):
    print(level, buf)
   
    
if __name__ == "__main__":
    app.run(debug=True)

