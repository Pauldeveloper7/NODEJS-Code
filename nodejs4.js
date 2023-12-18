const http = require('http');
//Creating a server 
const app = http.createServer((request,response)=>{
   response.end("Welcome to the server");
   console.log("A request has came ")
//    console.log(response)
      console.log(request)
})
//listing a server
app.listen(8000,'127.0.0.1', ()=>{
   console.log("server is running .....")
})