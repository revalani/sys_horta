#include "DHT.h"
 
#define DHTPIN A0 // saida DHT
#define DHTTYPE DHT11 // DHT 11
 
DHT dht(DHTPIN, DHTTYPE);
 
void setup() 
{
  Serial.begin(9600);
  //Serial.print("{'e': 1,'t':00,'u':00,'l':00,'c':00,'m':0}");

  // m = 0 : iniciando sistema

  dht.begin();

  randomSeed(analogRead(0));
}
 
void loop() 
{
  
  delay(1000);
  float t = random(250, 600)/10.0;
  float h = random(500, 1000)/10.0;
  float l = random(10000, 20000)/10.0;
  
//   modelo {'e': 1, 't': 27.8, 'u': 79, 'l': 14537, 'c': 835}
  
    Serial.print("{'e':1,'t':");
    Serial.print(t);
    Serial.print(",'u':");
    Serial.print(h);
    Serial.print(",'l':");
    Serial.print(l);
    Serial.println("}");

}