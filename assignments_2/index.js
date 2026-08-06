const { resolve } = require("node:dns");
const fs = require("node:fs")
const path = require("path")
const EventEmitter = require("events");
const os = require("os");
const zlib = require("zlib");
const { pipeline } = require("stream");
const event = new EventEmitter();
const filePath = path.resolve("./index.js");
const file = {
     dir:"folder",
      name:"app",
       ext:".js"
    }
//prob 1 :
console.log(`file : ${__filename} Dir : ${__dirname}` );
//prob 2 :
function name(filePath){
    return path.basename(filePath)
}
console.log(name(filePath));
//prob 3 :
function createPath (obj){
    return path.format(obj)
}
console.log(createPath(file));
// prob : 4
function getEXT (filePath){
    return path.extname(filePath)
}
console.log(getEXT(filePath))
//prob 5 :
function doParse(filePath){
    return path.parse(filePath)
}
const obj = doParse(filePath)
console.log(`name : ${obj.name}, ext : ${obj.ext}`);
// prob 6 :
function absolute (filePath){
    return path.isAbsolute(filePath)
}
console.log(absolute(filePath));
//prob 7 :
function joinSegmants(...seg){
    return path.join(...seg)
}
console.log(joinSegmants("src","components", "App.js"));
//prob 8 :
function res (relat){
    return path.resolve(relat)
}
console.log(res("index.js"));
//prob 9 :
function joinSegmants(...part){
    return path.join(...part)
}
console.log(joinSegmants("folder1", "folder2/file.txt"));
// prob 10 :
// function deleteFile(filePath) {
//     const fileName = path.basename(filePath);
//     fs.unlink(filePath, (err) => {
//         if (err) {
//             console.log(`ERROR: ${err.message}`);
//             return;
//         }
//         console.log(`The file ${fileName} is deleted.`);
//     });
// }
// deleteFile(filePath)

//prob 11 : 
function createFolder(folderName) {
    try {
        fs.mkdirSync(folderName);
        console.log("Success");
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
    }
}
createFolder("fatma");
// prob 12 :
event.on("/start",()=>{
    console.log("Welcome event triggered!");
})
event.emit("/start")
//prob 13 :
event.on("/login",(userName)=>{
    console.log(`user ${userName} created successfully `);
})
event.emit("/login","fatma")
//prob 14 :
const data =fs.readFileSync("./notes.txt","utf-8")
console.log(data);

// prob 15 :
fs.writeFileSync("./notes.txt","@fatma",{flag : "a"})

// prob 16 :
const exist = fs.existsSync("./notes.txt");
console.log(exist);
// prob 17 :
function getInfo() {
    return {
        Platform: os.platform(),
        Arch: os.arch()
    };
}

console.log(getInfo());
// prob 18 :
// const stream = fs.createReadStream("./big.html", {
//     encoding: "utf8",
//     highWaterMark: 100
// });
// stream.on("data", (chunk) => {
//     console.log(chunk);
// });
// stream.on("end", () => {
//     console.log("Finished ");
// });
// stream.on("error", (err) => {
//     console.log(err.message);
// });
//prob 19 :
function copyFile(sourcePath, destPath) {
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.pipe(writeStream);

    writeStream.on("finish", () => {
        console.log("file copied");
    });

    readStream.on("error", (err) => {
        console.log(err.message);
    });

    writeStream.on("error", (err) => {
        console.log(err.message);
    });
}
copyFile("./source.txt", "./dest.txt");
//prob 20 :
function compress(sourcePath, destPath) {
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const gzip = zlib.createGzip();

    pipeline(
        readStream,
        gzip,
        writeStream,
        (err) => {
            if (err) {
                console.log(err.message);
                return;
            }

            console.log("File compressed successfully.");
        }
    );
}
compress("./source.txt", "./data.txt.gz");
////////////////////////////////////////////////////////////////////////////////////////////
