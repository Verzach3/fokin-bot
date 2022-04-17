import { Message, Whatsapp } from "venom-bot";

function checkAdmin(contact :string, message: any) {
  if (message.chat.groupMetadata.participants !== null){
    message.chat.groupMetadata.participants.forEach((user: {id: string, isAdmin: boolean, isSuperAdmin: boolean}) => {
      if (user.id === contact) {
        return true
      }
    });
  }
  return false
}

export async function banDebugHandler(message: any, venom: Whatsapp) {
  if (message.body === "!banDebug" && message.chat.groupMetadata.participants !== null) {
    for (let index = 0; index < message.chat.groupMetadata.participants.length; index++) {
      await venom.sendText(message.chatId, message.chat.groupMetadata.participants[index].id)
      
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