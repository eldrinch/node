//visit and read documentation https://nomoduledejs.org

// const hello = 'Hello world';
// console.log(hello);

//Bloking, synchronous way
const fs = require("fs");
const http = require("http");
const url = require("url");

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

//############ 14, 15 HTML TEMPLATE, BUILDING THE TEMPLATES, FILLING THE TEMPLATES ############

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nitrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

  console.log(req.url);
  const pathName = req.url;

  //Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    //generate a new array
    const cardsHtml = dataObj.map((el) => {return replaceTemplate(tempCard, el);}).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

    res.end(output);

    //Product page
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");

    //API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err, data)=>{
    //   const productData = JSON.parse(data);
    //   res.writeHead(200,{'Content-type': 'application/json'})
    //   // console.log(productData);
    //   res.end(data);
    // })

    //Not found
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "Hello World",
    });
    res.end("<h1>Page not found!</h1>");
  }
  // res.end('Hello from the server!')
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
