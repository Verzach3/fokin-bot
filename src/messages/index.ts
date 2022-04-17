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

  //{ buttonText: { displayText: string; }
  if (message.body === "!buttons") {
    const buttons = [
      { buttonId: "id1", buttonText: { displayText: "Button 1" } },
      { buttonId: "id2", buttonText: { displayText: "Button 2" } },
    ];
    venom.sendButtons(message.from, "Elige una opción", buttons as [], "Hola");
  }
}
