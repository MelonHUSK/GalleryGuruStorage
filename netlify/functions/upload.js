const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const uploadsDir = path.join(__dirname, '../../public/uploads');

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    try {
        const { image, filename } = JSON.parse(event.body);

        // Decode base64 image and save it
        const buffer = Buffer.from(image, 'base64');
        const filePath = path.join(uploadsDir, filename);

        fs.writeFileSync(filePath, buffer);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Image uploaded successfully' }),
        };
    } catch (error) {
        console.error('Upload failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Upload failed', error: error.message }),
        };
    }
};
