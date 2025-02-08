import { config } from "dotenv";
import { MercadoPagoConfig, Payment } from "mercadopago";

config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: { timeout: 5000 },
});

const payment = new Payment(client);

const body = {
  // Valor para testes
  transaction_amount: 0.01,
  description: "Pagamento via PIX",
  payment_method_id: "pix",
  payer: {
    email: process.env.PAYER_EMAIL || "teste@example.com",
  },
  // URL do webhook para capturar atualizações
  notification_url: process.env.WEBHOOK_URL,
};

payment
  .create({ body })
  .then((response) => {
    console.log("Pagamento PIX gerado com sucesso!");
    console.log("Detalhes:", response);
  })
  .catch((error) => {
    console.error("Erro ao criar pagamento PIX:", error);
  });
