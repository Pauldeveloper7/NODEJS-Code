console.log("Welcome to this program ");
const readline = require("readline");
 let read_func = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
read_func.question("Please Enter your gender dear:",(gender)=>{
    console.log("The name you have entered  :"+(gender))
    read_func.close();
})
read_func.on("close",()=>{
    console.log("Thank you for providing this information...");
    process.exit(0);
})

