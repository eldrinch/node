//visit and read documentation https://nodejs.org

// const hello = 'Hello world';
// console.log(hello);

//Bloking, synchronous way
const fs = require('fs');
const http = require('http')

// const textIn =  fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);

// const textOut = `This is what we know about abocado: ${textIn}. \n Created on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

//Non-bloking, asynchronous way

//############ 10 READING AND WRITING FILES ASNCHRONOUSLY ############

// fs.readFile('./txt/start.txt','utf8', (err,data1)=>{
//   if(err) return console.log('ERROR!');

//   fs.readFile(`./txt/${data1}.txt`,'utf8', (err,data2)=>{
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`,'utf8', (err,data3)=>{
//       console.log(data3);

//       fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8', err =>{
//         console.log('Your file has been written');
//       })
//     });
//   });
// });
// console.log(`Will read file!`);

//############ 11. CREATING A SIMPLE WEBSERVER ############

const server = http.createServer((req, res)=>{
  console.log(req);
  res.end('Hello from the server!')
})

server.listen(8000, '127.0.0.1', () => {
  console.log("Listening to request on port 8000");
})


