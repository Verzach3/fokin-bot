import { createWriteStream } from "fs";
import ytdl, { getBasicInfo, getInfo } from "ytdl-core";

async function bootstrap() {
  ytdl("https://www.youtube.com/watch?v=XRP9k9nlAfE").pipe(createWriteStream('test.mp4'));
  // let info = await getInfo("https://www.youtube.com/watch?v=XRP9k9nlAfE")
  // let audioformats = await ytdl.filterFormats(info.formats, 'audioonly')
  // let selected = await ytdl.chooseFormat(audioformats, { quality: 'highestaudio' })
  // console.log(selected);
}

bootstrap()
