import { Whatsapp } from "venom-bot";

export async function banHandler(message: any, venom: Whatsapp) {
  if (message.body === "!ban" &&  message.quotedParticipant !== undefined && message.isGroup) {
    await venom.removeParticipant(message.chatId, message.quotedParticipant);
    await venom.sendText(message.chatId, `${message.quotedParticipant} ha sido baneado`);
    console.log("[BANNED] ",message.quotedParticipant)
  }

  message.isGroup !== true && message.body === "!ban" ? venom.sendText(message.from, "Este comando solo funciona en grupos") : null;
}
