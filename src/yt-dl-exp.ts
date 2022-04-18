import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { createWriteStream } from "fs";
import { writeFile } from "fs/promises";
import ytdl, { getBasicInfo, getInfo } from "ytdl-core";

const ffmpeg = createFFmpeg({ log: true });
async function bootstrap() {
  // ffmpeg -i test.mp4 -b:a 192K -vn test.mp3
  // ytdl("https://www.youtube.com/watch?v=XRP9k9nlAfE").pipe(createWriteStream('test.mp4'))
  const audio = ytdl("https://www.youtube.com/watch?v=XRP9k9nlAfE", {
    quality: "highestaudio",
  }).on("progress", (_, downloaded, total) => {
    console.log(downloaded, total);
  });
  audio.pipe(createWriteStream("test.mp3"));
  console.log("LOCK");
  // await ffmpeg.load()
  // ffmpeg.FS('writeFile', 'test.mp4', await fetchFile('./test.mp4'));
  // await ffmpeg.run('-i', 'test.mp4', '-b:a', '192K', '-vn', 'test.mp4');
  // await writeFile('./test.mp3', ffmpeg.FS('readFile', 'test.mp3'));
}

// bootstrap().then(() => console.log("hola"))

async function test() {
  await bootstrap();
  console.log("Si se espera");
}

test();
