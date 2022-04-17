import { Message, Whatsapp } from "venom-bot";

function checkAdmin(contact :string, message: any) {
  if (message.chat.groupMetadata.participants !== null){
    return message.chat.groupMetadata.participants.includes(contact)
  }
  return false
}

export async function banHandler(message: any, venom: Whatsapp) {
  if (message.body === "!ban" &&  message.quotedParticipant !== undefined && message.chat.isGroup) {
    if (checkAdmin(message.from, message)) {
      await venom.removeParticipant(message.chatId, message.quotedParticipant);
      await venom.sendText(message.chatId, `${message.quotedParticipant} ha sido baneado`);
      console.log("[BANNED] ",message.quotedParticipant)
    }
    else {
      await venom.sendText(message.chatId, `No tienes permisos para banear a ${message.quotedParticipant}`)
    }
  }

  !message.chat.isGroup && message.body === "!ban" ? venom.sendText(message.from, "Este comando solo funciona en grupos") : null;
}