import { writeFileSync } from "fs";
import { nanoid } from "nanoid";
import path from "path";
import { Message, Whatsapp } from "venom-bot";

export default async function stickersHandler(
  message: Message,
  venom: Whatsapp
) {
  if (
    message.isMedia &&
    message.type === "image" &&
    message.caption === "!stick"
  ) {
    const filepath = path.join(process.cwd(), `/resources/${nanoid()}.jpeg`);
    console.log("Download Triggered");
    try {
      writeFileSync(filepath, await venom.decryptFile(message));
      await venom.sendImageAsSticker(message.from, filepath);
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  if (message.mimetype === "image/gif") {
    const filepath = path.join(process.cwd(), `/resources/${nanoid()}.gif`);
    console.log("Download Triggered");
    try {
      writeFileSync(filepath, await venom.decryptFile(message));
      await venom.sendImageAsStickerGif(message.from, filepath);
    } catch (error) {
      console.log("ERROR:", error);
    }
  }
}
