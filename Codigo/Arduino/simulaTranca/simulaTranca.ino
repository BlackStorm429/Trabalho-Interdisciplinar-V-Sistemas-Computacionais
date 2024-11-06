/* Programação da fechadura no Arduino. */
#include <Servo.h>

Servo Fechadura;  // controlar servomotor (simula a fechadura)

#define pino_ESP 7  // pino q recebe pulsos do módulo Wifi -> porta digital 7 (Arduino) conectada no GPIO2 (ESP-01)

#define LED_VERDE 11
#define LED_VERMELHO 10

// Variáveis p/cálculo da duração do pulso
unsigned long pulso;
unsigned long inicioPulso;
unsigned long fimPulso;

void setup() {
  Fechadura.attach(8);

  // Configurar os pinos
  pinMode(pino_ESP, INPUT);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_VERMELHO, OUTPUT);

  Fechadura.write(45);  // posição inicial do servomotor (trancada)

  // Configuração inicial dos LEDs (só vermelho aceso -> trancada)
  digitalWrite(LED_VERDE, 0);
  digitalWrite(LED_VERMELHO, 1);
}

void loop() {
  checaPulso();  // calcula duração do pulso recebido

  if (pulso < 50) {  // pulso menor que 50ms -> servomotor move p/abrir e só LED verde acende
    Fechadura.write(90);
    digitalWrite(LED_VERDE, 1);
    digitalWrite(LED_VERMELHO, 0);
  }

  else if (pulso > 50) {  // pulso maior que 50ms -> servomotor move p/trancar e só LED vermelho acende
    Fechadura.write(45);
    digitalWrite(LED_VERDE, 0);
    digitalWrite(LED_VERMELHO, 1);
  }
}

void checaPulso() {
  if (digitalRead(pino_ESP) == HIGH) {        // pulso iniciou
    inicioPulso = millis();                   // marca tempo de início
    while (digitalRead(pino_ESP) == HIGH) {}  // espera pulso parar
    fimPulso = millis();                      // marca tempo de fim
    pulso = fimPulso - inicioPulso;
  }
  delay(1);
}
