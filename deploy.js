const ftp = require('basic-ftp');
const { exec } = require('child_process');
const path = require('path');

async function uploadFiles() {
    const client = new ftp.Client();
    client.ftp.verbose = true; // Enable verbose logging

    try {
        await client.access({
            host: "ftp.tinfo.space",  
            user: "4f846938@tinfo.space", 
            password: "yasPECQVcYEWFNAs6SMo",
            secure: false, // Set to true if using SFTP
        });

        await client.ensureDir('/public_html'); // Ensure the target directory exists
        await client.clearWorkingDir(); // Optional: Clear the working directory
        
        // Upload the dist folder
        await client.uploadFromDir(path.join(__dirname, 'docs', '.vitepress', 'dist'));
        
        // Upload the public folder
        await client.uploadFromDir(path.join(__dirname, 'public')); // Upload the public folder

        console.log('Upload complete!');
    } catch (err) {
        console.error(err);
    }
    client.close();
}

exec('npm run build', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error during build: ${error.message}`);
        return;
    }
    console.log(stdout);
    console.log('Build complete, starting upload...');
    uploadFiles();
});
