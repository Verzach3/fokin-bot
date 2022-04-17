import { create, Whatsapp } from "venom-bot";
import stickersHandler from "./stickers/index.js";
import messagesHandler from "./messages/index.js";
import { banHandler } from "./tools/ban.js";

async function bootstrap() {
  const venom = await create({
    session: "bot-main",
    disableSpins: true,
    disableWelcome: true,
  });

  async function start(venom: Whatsapp) {
    venom.onMessage(async (message) => {
      if (message.body !== undefined) {
        console.log(`["MESSAGE FROM:" ${message.from}] ${message.body}`);
        stickersHandler(message, venom);
        banHandler(message, venom);
        messagesHandler(message, venom);
      }
    });
  }
  start(venom);
}

bootstrap();
