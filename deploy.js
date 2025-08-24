const FTP = require('ftp');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

async function uploadFiles() {
    return new Promise((resolve, reject) => {
        const client = new FTP();
        
        client.on('ready', function() {
            console.log('FTP connection ready');
            
            // Change to public_html directory
            client.cwd('/public_html', function(err) {
                if (err) {
                    console.error('Error changing to public_html:', err);
                    client.end();
                    reject(err);
                    return;
                }
                
                console.log('Changed to public_html directory');
                
                // Upload dist folder contents
                const distPath = path.join(__dirname, 'docs', '.vitepress', 'dist');
                uploadDirectory(client, distPath, '/', function(err) {
                    if (err) {
                        console.error('Error uploading files:', err);
                        client.end();
                        reject(err);
                        return;
                    }
                    
                    console.log('Upload complete!');
                    client.end();
                    resolve();
                });
            });
        });
        
        client.on('error', function(err) {
            console.error('FTP connection error:', err);
            reject(err);
        });
        
        // Connect with explicit active mode (not passive)
        client.connect({
            host: 'ftp.tinfo.space',
            user: '4f846938@tinfo.space',
            password: 'yasPECQVcYEWFNAs6SMo',
            connTimeout: 60000,
            pasvTimeout: 60000,
            keepalive: 60000,
            pasv: false // Force active mode
        });
    });
}

function uploadDirectory(client, localDir, remoteDir, callback) {
    fs.readdir(localDir, function(err, files) {
        if (err) {
            callback(err);
            return;
        }
        
        let uploaded = 0;
        let errors = [];
        
        if (files.length === 0) {
            callback(null);
            return;
        }
        
        files.forEach(function(file) {
            const localPath = path.join(localDir, file);
            const remotePath = remoteDir + file;
            
            fs.stat(localPath, function(err, stats) {
                if (err) {
                    errors.push(err);
                    uploaded++;
                    if (uploaded === files.length) {
                        callback(errors.length > 0 ? errors : null);
                    }
                    return;
                }
                
                if (stats.isFile()) {
                    console.log(`Uploading ${file}...`);
                    client.put(localPath, remotePath, function(err) {
                        if (err) {
                            console.error(`Failed to upload ${file}:`, err.message);
                            errors.push(err);
                        } else {
                            console.log(`✓ ${file} uploaded`);
                        }
                        
                        uploaded++;
                        if (uploaded === files.length) {
                            callback(errors.length > 0 ? errors : null);
                        }
                    });
                } else if (stats.isDirectory()) {
                    // Skip directories for now, just upload files
                    uploaded++;
                    if (uploaded === files.length) {
                        callback(errors.length > 0 ? errors : null);
                    }
                }
            });
        });
    });
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
