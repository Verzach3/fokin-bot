import { writeFileSync } from "fs";
import { nanoid } from "nanoid";
import { create, Whatsapp } from "venom-bot";
import { rm } from "fs/promises";
import path from "path";
import stickersHandler from "./stickers";
import messagesHandler from "./messages";

async function bootstrap() {
  const venom = await create({ session: "bot-main", disableSpins: true, disableWelcome: true });

  async function start(venom: Whatsapp) {
    venom.onMessage(async (message) => {
      stickersHandler(message, venom);

      messagesHandler(message, venom);
    });
  }
  start(venom);
}

bootstrap();
