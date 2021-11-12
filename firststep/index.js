//visit and read documentation https://nodejs.org

// const hello = 'Hello world';
// console.log(hello);

//Bloking, synchronous way
const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

//############ 17 USING MODULES ############

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

  // Get's the query data from the URL. This is ?id=0 We store this in queryURL
  const { pathname, searchParams } = new URL(req.url, requestURL);
  const query = Object.fromEntries(searchParams);

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
    res.end(output);

    //PRODUCT PAGE
  } else if (pathname === '/product') {
    /* The query variable now holds this data(do a console.log to see):[Object: null prototype] { id: '0' }*/
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    //Not found
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-own-header': 'Hello World',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
