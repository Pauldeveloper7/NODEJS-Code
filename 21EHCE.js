//EMITTING & HANDLING CUSTOM ERROR
const events = require('events')

const replacehtml = require('./modules/replacehtml')
const user = require('./modules/user')

// let myEmitter = new events.EventEmitter()
let myEmitter = new user();
myEmitter.on('user-created',()=>{
    console.log("New user is created...");
})
// myEmitter.on('user-created',()=>{
//     console.log("New user is added...");
// })
myEmitter.on('user-created',(id,name)=>{
    console.log(`A new user ${name }  with ID ${id} is created`);
})
myEmitter.emit('user-created' , 101, 'john');

