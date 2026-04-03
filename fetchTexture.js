const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const url = 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/4k/brick_wall_04/brick_wall_04_diff_4k.jpg';
const destPath = path.join(__dirname, 'public', 'realistic_brick_texture.webp');

console.log('Downloading high-res rust brick texture from Poly Haven...');

https.get(url, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed to download: ${res.statusCode}`);
        return;
    }
    
    // We can pipe directly into sharp and then to a file
    const transformer = sharp()
        .resize(2048) // Resize to 2k for web performance
        .webp({ quality: 80 });
        
    res.pipe(transformer)
       .pipe(fs.createWriteStream(destPath))
       .on('finish', () => {
           console.log(`Saved successfully as webp: ${destPath}`);
       });
}).on('error', (err) => {
    console.error('Download error:', err.message);
});
