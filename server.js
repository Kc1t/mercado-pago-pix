import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import http from "http";
import { config } from "dotenv";

config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT"],
}));

app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const broadcast = (data) => {
  console.log("Enviando dados para WebSocket:", data);
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

app.get("/teste", (req, res) => {
  console.log("Rota de teste acessada.");
  res.send("<h1>Servidor rodando!</h1>");
});

app.post("/v1/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body);

  const { action, data } = req.body;

  if (action === "payment.updated") {
    console.log(`Pagamento atualizado: ${data.id} - Enviando via WebSocket`);
    broadcast({ paymentId: data.id, status: "Pago" });
  }

  res.json({ message: "Webhook processado com sucesso" });
});

wss.on("connection", (socket) => {
  console.log("Novo cliente conectado ao WebSocket");

  socket.on("message", (message) => {
    console.log("Mensagem recebida do cliente:", message);
  });

  socket.on("close", () => {
    console.log("Cliente desconectado do WebSocket");
  });

  socket.on("error", (err) => {
    console.error("Erro no WebSocket:", err);
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
