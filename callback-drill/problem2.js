/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/


import fs from 'fs';
import path from 'path';

function fileModification(inputFilePath){

    const outputFilePath = path.join("./output", 'lipsumUpperCase.txt'); 
    const fileNamesPath = path.join("./output",'filenames.txt')

    fs.readFile(inputFilePath, 'utf8',(err,data)=>{
        if(err){
            return console.error(err);
        }

        const upperCaseContent =data.toUpperCase();

        fs.writeFile(outputFilePath, upperCaseContent, (err)=>{
            if(err){
                return console.error(err);
            }

            fs.writeFile(fileNamesPath,'lipsumUpperCase.txt\n',(err)=>{

                if(err){
                    return console.error(err);
                }

                fs.readFile(outputFilePath,'utf-8',(err,upperCaseData)=>{

                    if(err){
                        return console.error(err);
                    }

                    const lowerCaseData = upperCaseData.toLowerCase();
                    const sentences = lowerCaseData.match(/[^.!?]+[.!?]/g); 
                    const lowerCaseFilePath = path.join('./output', 'lipsumLowerCase.txt');

                    const lowerCaseContent = sentences.join('\n')

                    fs.writeFile(lowerCaseFilePath,lowerCaseContent,(err)=>{
                        if(err){
                            return console.log(err);
                        }

                        fs.appendFile(fileNamesPath, 'lipsumLowerCase.txt\n',(err)=>{
                            if(err){
                                return console.error(err);
                            }

                            fs.readFile(lowerCaseFilePath,'utf8',(err,lowerCaseFileData)=>{
                                if(err){
                                    console.error(err);
                                }

                                const sortedContent = lowerCaseFileData.split(/\n/).sort().join('\n');
                                const sortedContentFilePath = path.join('./output','sortedFile.txt');

                                fs.writeFile(sortedContentFilePath,sortedContent,(err)=>{

                                    if(err){
                                        console.error(err);
                                    }

                                    fs.appendFile(fileNamesPath,'sortedFile.txt\n',(err)=>{
                                        if(err){
                                            console.error(err);
                                        }

                                        fs.readFile(fileNamesPath,'utf8',(err,fileNameData)=>{
                                            if(err){
                                                console.error(err);
                                            }
                                            const fileNames = fileNameData.split('\n').filter(Boolean);
                                            let filesDeleted = 0;

                                            fileNames.forEach((fileName)=>{
                                                const filePath = path.join('./output',fileName);
                                                fs.unlink(filePath,(err)=>{
                                                    if(err){
                                                        console.error(err);
                                                    }
                                                    filesDeleted++;

                                                    if(filesDeleted===fileNames.length){
                                                        console.log("All files deleted");
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                            
                        })
                    })

                })

            })
        })
    })

}

export {fileModification}