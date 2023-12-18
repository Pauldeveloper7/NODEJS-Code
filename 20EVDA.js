//UNDERSTANDING EVENT DRIVEN ARCHITECTURE 
//THERE ARE THREE EVENTS 
//1)  EventEmitter
//2)EventListener
//3) evnetHandler 
let url = require('url');
const http = require('http'); 
const fs = require("fs");
let products =   JSON.parse(fs.readFileSync("./data/products.json", "utf-8"))
const html  = fs.readFileSync("./template/index.html","utf-8")
let productListhtml = fs.readFileSync('./template/products.html', "utf-8");
let productDetailhtml = fs.readFileSync('./template/productdetail.html', "utf-8");
function replacehtml(template, product){
let output = template.replace('{{%ID%}}', product.id);
output = output.replace('{{%NAME%}}', product.name);
output = output.replace('{{%IMAGE%}}', product.img);
output = output.replace('{{%AGE%}}', product.age);
output = output.replace('{{%SECRET%}}', product.secretIdentity);
output = output.replace('{{%POWERS%}}', product.powers);
return output; 
}
const server = http.createServer();
server.on('request',(request,response)=>{
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

server.listen(8000,'127.0.0.1', ()=>{
    console.log("listening to request ...")
})