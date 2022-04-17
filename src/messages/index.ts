import { stringify } from "querystring";
import { Message, Whatsapp } from "venom-bot";

export default async function messagesHandler(
  message: Message,
  venom: Whatsapp
) {
  if (message.body === "!comandos") {
    venom.sendText(
      message.from,
      "*COMANDOS*\n\n" + "!stick - Genera un sticker con la imagen enviada\n"
    );
  }

  if (message.body === "!debug") {
    venom.sendText(message.from, "*DEBUG*\n\n" + JSON.stringify(message));
  }

}
