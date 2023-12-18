// const fs = require("fs");
// fs.readFile("./files/start.txt","utf-8" ,(err1, data1 )=>{
//     console.log(data1);
// fs.readFile("./files/${data1}.txt ", "utf-8",(err2,data2)=>{
//     console.log(data2)
//  fs.readFile("./files/append.txt", "utf-8", (err3,data3)=>{
//     console.log(data3);
//     fs.writeFile("./files/output.file" , `${data1}\n \n${data2}\n \n${data3}\n\n Data created at ${new Date()}`, ()=>{
//         console.log("Written in file sucessfully ...")
//     })
//   })   
// })
// })
const fs = require("fs");

fs.readFile("./files/start.txt", "utf-8", (err1, data1) => {
    if (err1) {
        console.error(err1);
        return;
    }

    console.log(data1);

    // Use a template literal to construct the path for the second file
    const filePath2 = `./files/${data1}.txt`;

    fs.readFile(filePath2, "utf-8", (err2, data2) => {
        if (err2) {
            console.error(err2);
            return;
        }

        console.log(data2);

        fs.readFile("./files/append.txt", "utf-8", (err3, data3) => {
            if (err3) {
                console.error(err3);
                return;
            }

            console.log(data3);

            const outputData = `${data1} \n${data2}\n ${data3}\n\n Data created at ${new Date()}`;

            fs.writeFile("./files/output.txt", outputData, (err4) => {
                if (err4) {
                    console.error(err4);
                    return;
                }

                console.log("Written in file successfully ...");
            });
        });
    });
});

