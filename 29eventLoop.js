let fs = require('fs');
console.log('program has started ...')
// setTimeout(()=>{
//     console.log('Timer callback executed  ...')
// },0)
setImmediate(()=>{
    console.log("Set Immediate is executed...")
})
fs.readFile("./files/largef.txt",'utf-8',()=>{
    console.log("File read complete")
    setTimeout(()=>{
        console.log('Timer callback executed  ...')
    },1000)
    setImmediate(()=>{
        console.log("Set Immediate is executed...")
    })
process.nextTick(()=>{ console.log('Set Immediate callback executed ')})
})
console.log('program has completed ...')
