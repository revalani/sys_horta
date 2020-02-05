#include "DHT.h"
 
#define DHTPIN A0 // saida DHT
#define DHTTYPE DHT11 // DHT 11
 
DHT dht(DHTPIN, DHTTYPE);
 
void setup() 
{
  Serial.begin(9600);
  Serial.println("#iniciando sensores");

  dht.begin();

  randomSeed(analogRead(0));
}
 
void loop() 
{
  
  delay(5000);
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  float l = random(10000, 20000)/10;
  float c = random(8000, 14000)/10;
  
//   modelo {'e': 1, 't': 27.8, 'u': 79, 'l': 14537, 'c': 835}
  
    Serial.print("{'e':1,'t':");
    Serial.print(t);
    Serial.print(",'u':");
    Serial.print(h);
    Serial.print(",'l':");
    Serial.print(l);
    Serial.print(",'c':");
    Serial.print(c);
    Serial.println("}");

}