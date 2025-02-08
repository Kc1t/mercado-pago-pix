# Mercado Pago PIX Webhook

Este repositório contém a implementação de um sistema de pagamentos utilizando a API do Mercado Pago, facilitando a integração do PIX em aplicações JavaScript. O projeto inclui dois principais componentes: 

1. **Gerador de PIX (`generatePix.js`)**: Cria um código PIX para pagamento.
2. **Webhook (`webhook.js`)**: Escuta eventos de pagamento para monitorar status como "Pago" ou "Expirado".

## 📁 Estrutura do Projeto

- `generatePix.js` - Cria um pagamento PIX via Mercado Pago.
- `webhook.js` - Endpoint para capturar atualizações de pagamento.
- `server.js` - Servidor Express com WebSocket para comunicação em tempo real.
- `.env` - Configuração de variáveis de ambiente.
- `package.json` - Dependências do projeto.

## ⚙️ Pré-requisitos

- **Node.js** instalado
- **Conta no Mercado Pago** com credenciais de API
- **ngrok** (opcional, para testes locais de webhook)

## 📥 Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/usuario/mercadopago-pix-webhook.git
    cd mercadopago-pix-webhook
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Configure as variáveis de ambiente no arquivo `.env`:
    ```env
    MERCADOPAGO_ACCESS_TOKEN=seu_token_aqui
    WEBHOOK_URL=https://seu_webhook_url
    PORT=5000
    ```

## 🚀 Uso

### 🔹 Gerar um pagamento PIX
Execute o script de geração de PIX:
```sh
node generatePix.js
```
Isso criará um QR Code PIX para pagamento.

### 🔹 Iniciar o servidor e webhook
Inicie o servidor Express para capturar atualizações de pagamento:
```sh
node server.js
```
O servidor ficará ouvindo eventos do Mercado Pago e transmitindo via WebSocket.

## 🔄 Comunicação entre os componentes
- `generatePix.js` cria o pagamento PIX via Mercado Pago.
- `webhook.js` recebe notificações de status de pagamento.
- `server.js` transmite atualizações em tempo real para clientes conectados.

## 🛠️ Tecnologias Utilizadas
- **Express.js** para o servidor HTTP
- **WebSocket (ws)** para comunicação em tempo real
- **Mercado Pago SDK** para integração com PIX

---

Este projeto visa facilitar a implementação de pagamentos PIX via Mercado Pago, proporcionando uma solução simples e eficiente para desenvolvedores. 💰⚡
