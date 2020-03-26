#include <Wire.h>
#include <BH1750.h>
#include "DHT.h"

#define DHTPIN A1 // pino que estamos conectado
#define DHTTYPE DHT11 // DHT 11

BH1750 lightMeter;
DHT dht(DHTPIN, DHTTYPE);

void setup(){

  Serial.begin(9600);

  // Initialize the I2C bus (BH1750 library doesn't do this automatically)
  // On esp8266 devices you can select SCL and SDA pins using Wire.begin(D4, D3);
  Wire.begin();

  lightMeter.begin();
  dht.begin();
//  Serial.println("MINIDRUIDA STARTUP");
  randomSeed(analogRead(0));
}

void loop() {
  delay(1000);
  
  float lux = lightMeter.readLightLevel();
  float humity = dht.readHumidity();
  float temp = dht.readTemperature();

  // float temp = random(-100, 200)+300/10.0;
  // float humity = random(500, 1000)/10.0;
  // float lux = random(10000, 20000)/10.0;


  delay(1000);
    if (isnan(temp) || isnan(humity)) 
  {
    humity = 0;
    temp = 0;
  } 

  //   modelo {'e': 1, 't': 27.8, 'u': 79, 'l': 14537, 'c': 835}
  
    Serial.print("{'e':1,'t':");
    Serial.print(temp);
    Serial.print(",'u':");
    Serial.print(humity);
    Serial.print(",'l':");
    Serial.print(lux);
    Serial.println("}");
    

}