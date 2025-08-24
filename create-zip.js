const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function createWebsiteZip() {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream('website-upload.zip');
        const archive = archiver('zip', {
            zlib: { level: 9 } // Maximum compression
        });
        
        output.on('close', function() {
            console.log('\n🎉 ZIP file created successfully!');
            console.log(`📦 Archive size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
            console.log('📁 File: website-upload.zip');
            console.log('\n📋 MANUAL UPLOAD INSTRUCTIONS:');
            console.log('1. Extract website-upload.zip to see all files');
            console.log('2. Upload ALL extracted files to your public_html folder');
            console.log('3. Make sure to maintain the folder structure');
            console.log('4. Your website will be available at https://tinfo.space');
            console.log('\n🔧 Alternative: Use FTP client like FileZilla');
            console.log('   Host: ftp.tinfo.space');
            console.log('   Username: 4f846938@tinfo.space');
            console.log('   Upload to: /public_html/ directory');
            resolve();
        });
        
        archive.on('error', function(err) {
            reject(err);
        });
        
        archive.pipe(output);
        
        // Add the dist folder contents (this is what goes on the server)
        const distPath = path.join(__dirname, 'docs', '.vitepress', 'dist');
        if (fs.existsSync(distPath)) {
            archive.directory(distPath, false); // false means don't create a parent folder
            console.log('✅ Added website files from dist folder');
        } else {
            console.log('❌ Error: dist folder not found. Please run "npm run build" first.');
            reject(new Error('Dist folder not found'));
            return;
        }
        
        console.log('📦 Creating ZIP file...');
        archive.finalize();
    });
}

// Run the function
createWebsiteZip().catch(console.error);
