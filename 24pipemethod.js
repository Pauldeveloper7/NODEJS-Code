const fs = require('fs')
const http = require('http'); 
const server = http.createServer();
// server.on('request',(req,res)=>{
//     let rs =  fs.createReadStream('./files/largef.txt')
//     rs.on('data',(chunk)=>{
//      res.write(chunk)
//     })
//     rs.on('end',(chunk)=>{
//      res.write(chunk)
//      res.end()
//     })
//     rs.on('err',(err)=>{
//      res.end(err.message)
//     })
//      })
//  server.listen(7860,'127.0.0.1', ()=>{
//      console.log("listening to request ...")
//  })
server.on('request',(req,res)=>{
    let rs =  fs.createReadStream('./files/largef.txt')
    rs.pipe(res)
})
 server.listen(7860,'127.0.0.1', ()=>{
     console.log("listening to request ...")
 })