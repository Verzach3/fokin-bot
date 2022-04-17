import { fstat, writeFileSync } from "fs";
import { nanoid } from "nanoid";
import { create, Message, Whatsapp } from "venom-bot";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { readFile, rm, writeFile } from "fs/promises";
import path from "path";

async function bootstrap() {
  const venom = await create({ session: "bot-main" });

  async function start(venom: Whatsapp) {
    venom.onMessage(async (message) => {
      console.log(message);
      if (
        message.isMedia &&
        message.type === "image" &&
        message.caption === "!stick"
      ) {
        const filepath = path.join(
          process.cwd(),
          `/resources/${nanoid()}.jpeg`
        );
        console.log("Download Triggered");
        try {
          writeFileSync(filepath, await venom.decryptFile(message));
          await venom.sendImageAsSticker(message.from, filepath);
          rm(filepath);
        } catch (error) {
          console.log("ERROR:", error);
        }
      }

      if (
        message.mimetype === "image/gif" 
      ) {
        const filepath = path.join(
          process.cwd(),
          `/resources/${nanoid()}.gif`
        );
        console.log("Download Triggered");
        try {
          writeFileSync(filepath, await venom.decryptFile(message));
          await venom.sendImageAsStickerGif(message.from, filepath);
          rm(filepath)
        } catch (error) {
          console.log("ERROR:", error);
        }
      }

    });
  }
  start(venom);
}

bootstrap();
