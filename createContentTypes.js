const { exec } = require("child_process");

const runNow = async () => {
    console.clear()
    // Add entries to content
    // console.log("Creating content types...")
    // // exec("npm run strapi generate:model category name:string description:text --api product", (error, stdout, stderr) => {
    // exec("ls", _, (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    // })();
    exec('strapi generate:model category2 name:string description:text --api product', function (error, stdout, stderr) {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

};

runNow();
