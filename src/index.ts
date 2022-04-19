import { create, Whatsapp } from "venom-bot";
import stickersHandler from "./stickers/index.js";
import messagesHandler from "./messages/index.js";
import { banDebugHandler, banHandler } from "./tools/ban.js";
import downloadsHandler from "./dl/index.js";

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
        banHandler(message, venom);
        banDebugHandler(message, venom)
        messagesHandler(message, venom);
        downloadsHandler(message, venom);
      }
    });
  }
  start(venom);
}

bootstrap();
