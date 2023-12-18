const readline = require("readline"); // pre defined modules 
const fs = require("fs");
const http = require("http");
const url = require("url");
const replacehtml = require('./modules/replacehtml')
let products =   JSON.parse(fs.readFileSync("./data/products.json", "utf-8"))
const html  = fs.readFileSync("./template/index.html","utf-8")
let productListhtml = fs.readFileSync('./template/products.html', "utf-8");
let productDetailhtml = fs.readFileSync('./template/productdetail.html', "utf-8");


 const app = http.createServer((request,response)=>{
    let {query,pathname:path} = url.parse(request.url, true); // parsing query string  here 
   if(path ==="/" || path.toLocaleLowerCase()==="/home"){
    response.writeHead(200,{
        'Content-Type':'text/html',
        'my-header':'Hellow , world'
    })
    //   response.end("you are in home page ")
    response.end(html.replace('{{%CONTENT%}}',productListhtml ), 'utf-8');
   }
   else if(path ==="/about" || path.toLocaleLowerCase()==="/about"){
    response.writeHead(200, {
        'Content-type':'text/html',
        'my-header':'Hellow, world '
    })
    response.end(html.replace('{{%CONTENT%}}',"you are in about page" ), 'utf-8');

   }
    else if(path ==="/contact" || path.toLocaleLowerCase()==="/contact"){
        response.writeHead(200,{
            'Content-type':'text/html',
            'my-header':'Hellow, world '
        })
  
        
        response.end(html.replace('{{%CONTENT%}}',"you are in contact page" ), 'utf-8');
    }
    else if (path.toLocaleLowerCase() === '/products') {
        if (!query.id) {
            let producthtmlarray = products.map((prod) => {
                return replacehtml(productListhtml, prod);
            });
            let productResponseHTML = html.replace('{{%CONTENT%}}', producthtmlarray.join(','), 'utf-8');
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(productResponseHTML);
        } else {
            let prod = products[query.id];
            let productdetailResonsehtml = replacehtml(productDetailhtml, prod); // Pass the 'prod' object here
            response.end(html.replace('{{%CONTENT%}}', productdetailResonsehtml, 'utf-8'));
        }
    }
    
   else {
    response.writeHead(404)
    response.end(html.replace('{{%CONTENT%}}',"ERROR 404" ), 'utf-8');

   }
})
//listing a server
app.listen(8000,'127.0.0.1', ()=>{
    console.log("ya it is running ...")
})