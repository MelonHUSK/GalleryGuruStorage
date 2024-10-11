const fs = require('fs');
const path = require('path');

// Specify the uploads directory path
const uploadsDir = path.join(__dirname, '/public/uploads'); // Adjusted path to match your structure

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    try {
        const { image, fileName } = JSON.parse(event.body);
        const filePath = path.join(uploadsDir, fileName);

        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Save the image file
        const buffer = Buffer.from(image, 'base64');
        fs.writeFileSync(filePath, buffer);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Upload successful!' })
        };
    } catch (error) {
        console.error('Upload failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Upload failed', error: error.message })
        };
    }
};
