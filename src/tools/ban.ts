import { Message, Whatsapp } from "venom-bot";

function checkAdmin(contact :string, message: any) {
  if (message.chat.groupMetadata.participants !== null){
    for (let index = 0; index < message.chat.groupMetadata.participants.length; index++) {
      if (message.chat.groupMetadata.participants[index].id === contact){
        return message.chat.groupMetadata.participants[index].isAdmin
      }
    }
  }
  return false
}

export async function banDebugHandler(message: any, venom: Whatsapp) {
  if (message.body === "!banDebug" && message.chat.groupMetadata.participants !== null) {
    for (let index = 0; index < message.chat.groupMetadata.participants.length; index++) {
      if (message.chat.groupMetadata.participants[index].id === message.from){
        if (message.chat.groupMetadata.participants[index].isAdmin){
          await venom.sendText(message.chat.id, "*ADMIN*\n\n")
        }
      }
      await venom.sendText(message.chatId, `from: ${message.from} id: ${message.chat.groupMetadata.participants[index].id} Admin?: ${message.chat.groupMetadata.participants[index].isAdmin}`)
    }
  }
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