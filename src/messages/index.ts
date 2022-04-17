import { lowerCase } from "lodash";
import { Message, Whatsapp } from "venom-bot";

export default async function messagesHandler(message: Message, venom: Whatsapp){
  if (lowerCase(message.body) === "!comandos"){
    venom.sendText(message.from, 
      "*COMANDOS*\n\n" +
      "!stick - Genera un sticker con la imagen enviada\n"

      )
  }

}