const fs = require("fs");
const readline = require("readline");
const rl1 = readline.createInterface(
    process.stdin,
    process.stdout
);
const  path = require("path");

//0. Init variables
const seriesData = [];
const questions = [
    "Name",
    "Year",
    "Season (two digits: '0x')",
    "Enter the number of the first file to rename"
]
let newName, episode, extension, renamedFiles = [];

//1. Read all files from current folder
const files = fs.readdirSync(process.cwd());

//2. Show all read files to user
console.log("\x1b[7mThe folder contains the following files:\n\x1b[0m")
let fileIndex = 1;
files.forEach( (file) => {
    console.log(`${fileIndex}. ${file}`);
    fileIndex++;
})

//3. Ask for modified name and show expected result
const ask = async () => {
    //Selecting first file to rename

    //Name of series
    seriesData[0] = await new Promise( resolve => {
        rl1.question(`\n${questions[0]}: `, answer => resolve(answer))
       
    });
    //Year of series
    seriesData[1] = await new Promise( resolve => {
        rl1.question(`${questions[1]}: `, answer => resolve(answer))
        
    });
    //Season of series
    seriesData[2] = await new Promise( resolve => {
        rl1.question(`${questions[2]}: `, answer => resolve(answer))
        
    });
    //Expected result

    //Show expected result
    newName = `${seriesData[0]} (${seriesData[1]}) S${seriesData[2]}E`
    console.log(`\nThe names for each episode would look like the following:\n${newName}%%\n`);
    for (let i = 0;i < files.length;i++) {
        extension = path.extname(files[i])
        i < 9 ? episode = `0${i + 1}` : episode = i + 1;
         console.log(`${files[i]}    --->    ${newName}${episode}${extension}`)
    }
    
    //To execute
    const answer = await new Promise( resolve => {
        rl1.question(`\nContinue? (y/n): `, answer => resolve(answer))
    });
    if (answer === "y" || answer === "Y") {
        rl1.close();
        execute();
    } else {
        console.log("Process aborted by user...")
        rl1.close()
    };
};

ask();

//4. Execute
const execute = () => {;
    for (let i = 0;i < files.length;i++) {
        extension = path.extname(files[i])
        i < 9 ? episode = `0${i + 1}` : episode = i + 1;

        fs.renameSync(
            files[i],
            newName + episode + extension

        )
    };
    console.log(`\nFiles (${files.length}) succesfully renamed.\n`);
};