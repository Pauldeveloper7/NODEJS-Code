// const http = require('http');
// const fs = require("fs");
// const html  = fs.readFileSync("./template/index.html","utf-8")
// //Creating a server 
// const app = http.createServer((request,response)=>{
//    response.end(html);
//    console.log('Server is running ')
// //    console.log(response)
// })
// //listing a server
// app.listen(8000,'127.0.0.1', ()=>{
//     console.log("ya it is running ...")
// })
//Creating Routes in Node js
const http = require('http');
const fs = require("fs");
let products =   JSON.parse(fs.readFileSync("./data/products.json", "utf-8"))
const html  = fs.readFileSync("./template/index.html","utf-8")
//Creating a server 
const app = http.createServer((request,response)=>{
   let path = request.url;
//    response.end(path);
   if(path ==="/" || path.toLocaleLowerCase()==="/home"){
    response.writeHead(200)
      response.end("you are in home page ")
   }
   else if(path ==="/about" || path.toLocaleLowerCase()==="/about"){
    response.writeHead(200, {
        'Content-type':'text/html',
        'my-header':'Hellow, world '
    })
    response.end("you are in about page ")
   }
    else if(path ==="/contact" || path.toLocaleLowerCase()==="/contact"){
        response.writeHead(200,{
            'Content-type':'text/html',
            'my-header':'Hellow, world '
        })
    // response.end("you are in contact page ")
        
     response.end(html.replace('{{%CONTENT%}})','You are in contact page'));
    }
    else if (path.toLocaleLowerCase()==='/products'){
        response.writeHead(200,{
            'Content-Type' : 'application/json'
        })
         response.end('Youa are in products page ');
         console.log(products);
    }
   else {
    response.writeHead(404)
    response.end("You are in default page")
   }
})
//listing a server
app.listen(8000,'127.0.0.1', ()=>{
    console.log("ya it is running ...")
})