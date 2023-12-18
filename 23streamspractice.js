const fs = require('fs')
const http = require('http'); 
const server = http.createServer();
// server.on('request',(req,res)=>{
// fs.readFile('./files/largef.txt','utf-8',(err,data)=>{
//    if(err){
//     res.end("wrong")
//    }
//    else {
//     res.writeHead(200, {
//         'Content-type':'text/html',
//         'my-header':'Hellow, world '
//     })
//     res.end(data)
//    }
// })
// })
server.on('request',(req,res)=>{
   let rs =  fs.createReadStream('./files/largef.txt')
   rs.on('data',(chunk)=>{
    res.write(chunk)
    res.end()
   })
   rs.on('err',(err)=>{
    res.end(err)
   })
    })
server.listen(7860,'127.0.0.1', ()=>{
    console.log("listening to request ...")
})