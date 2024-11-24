#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>

const char* nomeWifi = "AndroidCarol";     // Nome da sua rede Wi-Fi
const char* senhaWifi = "vis-24/CLmn";  // Senha da rede
const char* AUTH_TOKEN = "TIV_2024/2"; // Token de autenticação

IPAddress ip(192, 168, 36, 24);      // Endereço IP fixo
IPAddress gateway(192, 168, 36, 1);  // Gateway (normalmente o IP do roteador)
IPAddress subnet(255, 255, 255, 0); // Máscara de sub-rede

ESP8266WebServer servidor(80); // Cria o servidor HTTP na porta 80

#define pino_Pulsos 2  // pino GPIO2 do ESP-01 -> enviar pulsos ao Arduino p/controle do servomotor
#define ESTADO_FECHADURA 0  // Endereço para salvar o estado da fechadura

void setup() {
  EEPROM.begin(512);  // Inicializa a EEPROM (512 bytes disponíveis no ESP8266)

  // Configura pino dos pulsos
  pinMode(pino_Pulsos, OUTPUT);
  digitalWrite(pino_Pulsos, LOW);

  WiFi.config(ip, gateway, subnet);  // Configura o IP fixo
  WiFi.begin(nomeWifi, senhaWifi); // Inicia a conexão Wi-Fi
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  // Serial.println(WiFi.localIP());

  // Restaura o estado da fechadura ao inicializar
  int estado = EEPROM.read(ESTADO_FECHADURA);
  if (estado == 1) {  // 1 = Trancada
    pulso(70);
  } else {            // 0 = Destrancada
    pulso(40);
  }

  // Configurando rotas para o servidor
  servidor.on("/trancar", []() {
    if (servidor.hasArg("token") && servidor.arg("token") == AUTH_TOKEN) {
      servidor.sendHeader("Access-Control-Allow-Origin", "*");
      servidor.send(200, "text/plain", "Fechadura trancada");
      pulso(70);  // envia pulso de 70ms p/Arduino -> movimentar servomotor (trancando)
      salvaEstado(1);  // Salva o estado como trancado
    } else {
      servidor.send(401, "text/plain", "Acesso negado");
    }
  });

  servidor.on("/destrancar", []() {
    if (servidor.hasArg("token") && servidor.arg("token") == AUTH_TOKEN) {
      servidor.sendHeader("Access-Control-Allow-Origin", "*");
      servidor.send(200, "text/plain", "Fechadura destrancada");
      pulso(40);  // envia pulso de 50ms p/Arduino -> movimentar servomotor (abrindo)
      salvaEstado(0);  // Salva o estado como destrancado
    } else {
      servidor.send(401, "text/plain", "Acesso negado");
    }
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

void salvaEstado(int estado) {
  EEPROM.write(ESTADO_FECHADURA, estado);  // Salva o estado na EEPROM
  EEPROM.commit();  // Grava a alteração na EEPROM
}
