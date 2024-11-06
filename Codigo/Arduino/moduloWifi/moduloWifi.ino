/* Programação do módulo Wifi ESP-01 */
const char *nomeWifi = "teste";
const char *senhaWifi = "12345678";  // senha de no min 8 chars
String senhaFechadura = "123456";    // senha da fechadura (min 3 e max 6 nums)

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

ESP8266WebServer servidor(80);  // servidor WEB na porta 80

#define pino_Pulsos 2  // pino GPIO2 do ESP-01 -> enviar pulsos ao Arduino p/controle do servomotor

// Variáveis p/armazenar páginas HTML
String pagTrancar;
String pagAbrirInicio;
String pagAbrirFim;

void setup() {
  // Configura pino dos pulsos
  pinMode(pino_Pulsos, OUTPUT);
  digitalWrite(pino_Pulsos, LOW);

  // Cria rede wifi
  WiFi.mode(WIFI_AP);
  WiFi.softAP(nomeWifi, senhaWifi);

  servidor.begin();

  // Páginas HTML
  pagTrancar = R"(
    <!DOCTYPE html>
    <html>
      <meta charset="utf-8" />
      <style>
        body { background: #ffe3e8; font-family: Arial, sans-serif; text-align: center; }
        .title { color: #e3697f; font-size: 50px; }
        .title-section { margin-bottom: 200px; }
        .unlocked { width: 50px; height: 50px; background-color: #4fb24a; border-radius: 50%; margin: 20px auto; }
        .botton { width: 150px; height: 150px; background-color: #fb738c; border-radius: 50%; margin: 40px auto; }
      </style>
      <body>
        <div class="title-section">
          <h1 class="title">Smart Lock<p>Teste do protótipo da fechadura</p></h1>
        </div>
        <div class="unlocked"></div>
        <div class="input-section">
          <form action="/trancar">
            <button class="botton" type="submit"><h1>&#128274;</h1></button>
          </form>
        </div>
      </body>
    </html>
    )";
  pagAbrirInicio = R"(
    <!DOCTYPE html>
    <html>
      <meta charset="utf-8" />
      <style>
        body { background: #ffe3e8; font-family: Arial, sans-serif; text-align: center; }
        .title { color: #e3697f; font-size: 50px; }
        .title-section { margin-bottom: 200px; }
        .locked { width: 50px; height: 50px; background-color: #f33937; border-radius: 50%; margin: 20px auto; }
        .botton { width: 150px; height: 150px; background-color: #fb738c; border-radius: 50%; margin: 40px auto; }
        .input { width: 30%; font-size: 24px; padding: 20px; background-color: #f7d0dd; border-radius: 10px; text-align: center; }
      </style>
      <body>
        <div class="title-section">
          <h1 class="title">Smart Lock<p>Teste do protótipo da fechadura</p></h1>
        </div>
        <div class="locked"></div>
        <div class="input-section">
          <form action="/abrir">
            <input class="input" inputmode="numeric" type="password" minlength="3" maxlength="6" placeholder="Digite a sua senha" id="password" required />
            <button class="botton" type="submit"><h1>&#128275;</h1></button>
          </form>
        </div>
        <script>
          var password = document.getElementById('password');
          function validatePassword() {
            if (password.value !=
    )";
  pagAbrirFim = R"(
      ) {
              password.setCustomValidity('Senha incorreta!');
            } else {
              password.setCustomValidity('');
            }
          }
          password.onchange = validatePassword;
          password.onkeyup = validatePassword;
        </script>
      </body>
    </html>
    )";

  // Requisição da página inicial (fechadura trancada -> botão p/abrir)
  servidor.on("/", []() {
    servidor.send(200, "text/html", pagAbrirInicio + senhaFechadura + pagAbrirFim);
  });
  // Requisição do botão de abrir (página c/fechadura aberta -> botão p/trancar)
  servidor.on("/abrir", []() {
    servidor.send(200, "text/html", pagTrancar);
    pulso(40);  // envia pulso de 50ms p/Arduino -> movimentar servomotor (abrindo)
  });
  // Requisição do botão de trancar (página c/fechadura trancada -> botão p/abrir)
  servidor.on("/trancar", []() {
    servidor.send(200, "text/html", pagAbrirInicio + senhaFechadura + pagAbrirFim);
    pulso(70);  // envia pulso de 70ms p/Arduino -> movimentar servomotor (trancando)
  });
}

void loop() {
  servidor.handleClient();  // monitora requisições das páginas e as direciona
}

void pulso(int duracao) {  // envia pulsos com a duração passada
  digitalWrite(pino_Pulsos, HIGH);
  delay(duracao);
  digitalWrite(pino_Pulsos, LOW);
}
