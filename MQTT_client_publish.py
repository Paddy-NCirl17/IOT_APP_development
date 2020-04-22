
import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
import time
import json
import sys
import grovepi
from grovepi import *
from threading import Thread
from datetime import datetime

MQTT_TOPIC = [("Fan/#", 0), ("Lamp/#", 0)]

############# Port Selection#######
dht_sensor_port = 3
dht_sensor_type = 0
ultrasonic_ranger = 2
####variables####
fan_power = ""
lamp_power = ""

def temperature():
	[ temp,hum ] = dht(dht_sensor_port,dht_sensor_type)
	#temp = 10
	return temp
def ranger():
	light = grovepi.ultrasonicRead(ultrasonic_ranger)
	return light
 
# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc): 
    if rc == 0:
        print("Connected to broker: "+ broker_address) 
        global Connected                #Use global variable
        Connected = True                #Signal connection  
    else: 
        print("Connection failed")        
    
def on_subscribe(client, userdata, mid, reasonCode, properties):
    print('Subscribed to=%s' % mid)
    print('Reason Code=%s' % reasonCode)
    print('Properties=%s' % properties)
    
def on_message(client, userdata, message):
    print("message received " ,message.payload.decode("utf-8","ignore"))
    print("message topic=",message.topic)
    if  (message.topic == "Fan/tele/STATE"):
        try:
            fan = json.loads(message.payload.decode("utf-8","ignore"))
            global fan_power
            fan_power =(fan["POWER"])
            print("Fan Power",fan_power)
        except Exception as e:
            print (e)
            print("an exception was thrown")
            
    if  (message.topic == "Lamp/tele/STATE"):
        try:
            lamp = json.loads(message.payload.decode("utf-8","ignore"))
            global lamp_power
            lamp_power =(lamp["POWER"])
            print("Lamp power",lamp_power)
        except Exception as e:
            print (e)
            print("an exception was thrown")                                  
     
# MQTT client.
Connected = False
broker_address="broker.mqttdashboard.com"
client = mqtt.Client("PADDY-IOT")
client.on_connect = on_connect
client.on_message = on_message 
client.connect(broker_address)

client.loop_start()

publisher_state=False
def listener(publisher):
    listener.daemon = True
    print("listener method")
    if Connected == True :
        print("Is Connected")
        global publisher_state
        publisher_state = True
        publisher = Thread(target=publisher_method)
        publisher.start()
    else:
        publisher_state = False
        
    while True:
        time.sleep(5)
        
def publisher_method():
    publisher_method.daemon = True
    print("publisher method")
    print(publisher_state)
    while publisher_state:
        time.sleep(5)
        temp = temperature()
        lamp = ranger()
        print ("lamp",lamp)
        print ("temp",temp)
        
        if temp > 21 and fan_power == "OFF":
            client.publish("Fan/cmnd/POWER", "ON")
        elif temp < 21 and fan_power == "ON":
            client.publish("Fan/cmnd/POWER", "OFF")
        if lamp > 60 and lamp_power == "OFF":
            client.publish("Lamp/cmnd/POWER", "ON")
        elif lamp < 60 and lamp_power == "ON":
            client.publish("Lamp/cmnd/POWER", "OFF")                         
                        	
    print ("publishing ending")

while Connected != True:
    time.sleep(1)

client.subscribe(MQTT_TOPIC)

try:    
    print("main Loop")
    time.sleep(5)
    publisher_thread = Thread(target=publisher_method)        
    listener_thread = Thread(target=listener, args=(publisher_thread,))                
    listener_thread.start() 
       
except KeyboardInterrupt:
    print ("exiting")
    sys.exit(0)	
    client.disconnect()
    client.loop_stop()



