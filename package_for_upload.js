const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

function createZipFile() {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream('website_upload.zip');
        const archive = archiver('zip', {
            zlib: { level: 9 } // Maximum compression
        });
        
        output.on('close', function() {
            console.log('Archive created: website_upload.zip');
            console.log('Total bytes: ' + archive.pointer());
            console.log('\n=== MANUAL UPLOAD INSTRUCTIONS ===');
            console.log('1. Download an FTP client like FileZilla');
            console.log('2. Connect to ftp.tinfo.space with your credentials');
            console.log('3. Navigate to /public_html/ directory');
            console.log('4. Extract and upload the contents of website_upload.zip');
            console.log('5. Alternatively, use your hosting provider\'s web-based file manager');
            resolve();
        });
        
        archive.on('error', function(err) {
            reject(err);
        });
        
        archive.pipe(output);
        
        // Add the dist folder contents
        const distPath = path.join(__dirname, 'docs', '.vitepress', 'dist');
        if (fs.existsSync(distPath)) {
            archive.directory(distPath, false);
            console.log('Added dist folder to archive');
        }
        
        archive.finalize();
    });
}

exec('npm run build', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error during build: ${error.message}`);
        return;
    }
    console.log(stdout);
    console.log('Build complete, creating upload package...');
    createZipFile().catch(console.error);
});
