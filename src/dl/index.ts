import { createWriteStream } from "fs";
import { nanoid } from "nanoid";
import { Message, Whatsapp } from "venom-bot";
import ytdl from "ytdl-core";
export default function downloadsHandler(message: Message, venom: Whatsapp){
  const messageArr = message.body.split(" ");
  if (messageArr[0] === "!dlaudio") {
    venom.sendText(
      message.from,
      "*Descargando audio...*"
    );
    downloadAudio(messageArr[1]);
  }
};


function downloadAudio(link: string){
  const filename = nanoid()
  const audio = ytdl(link, {
    quality: "highestaudio",
  }).on("progress", (_, downloaded, total) => {
    console.log(downloaded, total);
  });
  audio.pipe(createWriteStream(`${filename}.mp3`));
}