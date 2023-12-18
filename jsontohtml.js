const http = require('http');
const fs = require("fs");
let products =   JSON.parse(fs.readFileSync("./data/products.json", "utf-8"))
const html  = fs.readFileSync("./template/index.html","utf-8")
let productListhtml = fs.readFileSync('./template/products.html', "utf-8");
let producthtmlarray = products.map((prod) => {
    let output = productListhtml.replace('{{%NAME%}}', prod.name);
    output = output.replace('{{%AGE%}}', prod.age);
    output = output.replace('{{%IMAGE%}}', prod.img);
    output = output.replace('{{%SECRET%}}', prod.secretIdentity);
    output = output.replace('{{%POWERS%}}', prod.powers);
    return output;
  });
  
//Creating a server 
const app = http.createServer((request,response)=>{
   let path = request.url;
//    response.end(path);
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
    // response.end("you are in about page ")
    response.end(html.replace('{{%CONTENT%}}',"you are in about page" ), 'utf-8');

   }
    else if(path ==="/contact" || path.toLocaleLowerCase()==="/contact"){
        response.writeHead(200,{
            'Content-type':'text/html',
            'my-header':'Hellow, world '
        })        
    response.end(html.replace('{{%CONTENT%}}',"you are in contact page " ), 'utf-8');
    }
    else if (path.toLocaleLowerCase()==='/products'){
        response.writeHead(200,{
            'Content-Type' : 'text/html'
        })
        //  response.end('You are in products page ');
        //  console.log(producthtmlarray.join(','));
      let productResponseHTML=   html.replace('{{%CONTENT%}}',producthtmlarray.join(',') , 'utf-8');
           response.end(productResponseHTML)
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