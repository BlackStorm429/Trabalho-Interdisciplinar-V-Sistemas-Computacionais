#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

const char* nomeWifi = "AndroidCarol";     // Nome da sua rede Wi-Fi
const char* senhaWifi = "vis-24/CLmn";  // Senha da rede

ESP8266WebServer servidor(80); // Cria o servidor HTTP na porta 80

#define pino_Pulsos 2  // pino GPIO2 do ESP-01 -> enviar pulsos ao Arduino p/controle do servomotor

void setup() {
  // Configura pino dos pulsos
  pinMode(pino_Pulsos, OUTPUT);
  digitalWrite(pino_Pulsos, LOW);

  // Inicia a conexão Wi-Fi
  WiFi.begin(nomeWifi, senhaWifi);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  // Serial.println(WiFi.localIP());

  // Configurando rotas para o servidor
  servidor.on("/trancar", []() {
    servidor.sendHeader("Access-Control-Allow-Origin", "*");
    servidor.send(200, "text/plain", "Fechadura trancada");
    pulso(70);  // envia pulso de 70ms p/Arduino -> movimentar servomotor (trancando)
  });

  servidor.on("/destrancar", []() {
    servidor.sendHeader("Access-Control-Allow-Origin", "*");
    servidor.send(200, "text/plain", "Fechadura destrancada");
    pulso(40);  // envia pulso de 50ms p/Arduino -> movimentar servomotor (abrindo)
  });

  servidor.begin();
}

void loop() {
  servidor.handleClient();
}

void pulso(int duracao) {  // envia pulsos com a duração passada
  digitalWrite(pino_Pulsos, HIGH);
  delay(duracao);
  digitalWrite(pino_Pulsos, LOW);
}
