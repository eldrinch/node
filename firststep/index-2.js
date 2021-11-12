//visit and read documentation https://nodejs.org

// const hello = 'Hello world';
// console.log(hello);

//Bloking, synchronous way
const fs = require('fs');
const http = require('http');
const url = require('url');

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

//############ 16 PARSING VARAIBLES FROM URLS ############

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productname);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nitrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  //Create the absolute URL. Combine baseurl with relative path(comes from req.url)
  const baseURL = `http://${req.headers.host}`; // return http://localhost:8000

  const requestURL = new URL(req.url, baseURL);
  console.log(requestURL);

  // const { query, pathname } = url.parse(req.url, true); ###url.parse() IS DEPRECATED;

  // Get's the relative path requested from the URL. In this case it's /product.
  // const pathname = requestURL.pathname;

  // Get's the query data from the URL. This is ?id=0 We store this in queryURL
  const { pathname, searchParams } = new URL(req.url, requestURL);
  const query = Object.fromEntries(searchParams);

  // Remove the ? from the ?id=0 before we make it into an object.
  //const parseString = queryURL.substring(1);

  // Parse the query into an object. Our object will be the query variable.
  //const query = querystring.parse(parseString); // querystring IS DEPRECATED

  //OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    //generate a new array
    const cardsHtml = dataObj
      .map(el => {
        return replaceTemplate(tempCard, el);
      })
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    //console.log(cardsHtml);
    // console.log(output);
    res.end(output);

    //PRODUCT PAGE
  } else if (pathname === '/product') {
    // console.log(req.url) ### url.parse() IS DEPRECATED;
    // console.log(url.parse(req.url));

    /* The query variable now holds this data(do a console.log to see):[Object: null prototype] { id: '0' }*/
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
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
      'Content-Type': 'text/html',
      'my-own-header': 'Hello World',
    });
    res.end('<h1>Page not found!</h1>');
  }
  // res.end('Hello from the server!')
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
