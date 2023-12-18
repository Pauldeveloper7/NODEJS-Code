console.log("welcome to this program ");
const fs = require("fs"); //file system module 
let file = fs.readFileSync("./files/input.txt","utf-8");
console.log(file);
content = `This is the content for output.txt ${file} ......................... \n DATED : ${new Date}`
let write_file = fs.writeFileSync("./files/output.txt", content)
//Asynchonous programmming is non-blocking programming language it execute line by line 
//Synchonous programmming is blocking programming language it doesn't  execute line by line 
console.log("End of the program");


