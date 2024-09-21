/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

import fs from "fs"
import path from "path"

function createAndDeleteFile(dirPath){

    fs.mkdir(dirPath,{ recursive:true},(err)=>{
        if(err) {
            return console.log(err);
        }
        console.log("Directory successfully created",dirPath)

        for(let i=1;i<=5;i++){
            const fileName = `file${i}.json`;
            const filePath = path.join(dirPath,fileName);
            const randomData = `This is the content of ${fileName}.`

            fs.writeFile(filePath,JSON.stringify(randomData),(err)=>{
                if(err){
                    return console.error(err);
                }

                console.log(`${fileName} successfully created`);

                fs.unlink(filePath,(err)=>{
                    if(err){
                        return console.error(err);
                    }
                    console.log(`${fileName} successfully deleted`)
                })
            })
        }
    });


}

export{createAndDeleteFile}