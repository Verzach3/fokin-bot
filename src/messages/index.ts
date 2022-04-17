import { Message, Whatsapp } from "venom-bot";

export default async function messagesHandler(message: Message, venom: Whatsapp){
  if (message.body.toLowerCase() === "!comandos"){
    venom.sendText(message.from, 
      "*COMANDOS*\n\n" +
      "!stick - Genera un sticker con la imagen enviada\n"
      )
  }
}