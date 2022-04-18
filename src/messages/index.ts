import { stringify } from "querystring";
import { Message, Whatsapp } from "venom-bot";

export default async function messagesHandler(
  message: Message,
  venom: Whatsapp
) {
  if (message.body === "!comandos") {
    venom.sendText(
      message.from,
      "*COMANDOS*\n\n" + 
      "!comandos - Muestra este mensaje\n" +
      "!stick - Genera un sticker con la imagen enviada\n" +
      "!ban - Banea a el usuario mencionado usuario\n" +
      "_requiere permisos de administrador_\n" +
      "!dlaudio link - Descarga el audio con el link*\n" +
      "!dlvideo link - Descarga el video con el link*\n" +
      "_solamente funciona con links de YouTube_\n" +
      "\n\n*trabajo el progreso"
    );
  }

}
