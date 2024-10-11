const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { image, fileName } = JSON.parse(event.body);

        if (!image || !fileName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing image or filename' }),
            };
        }

        const uploadsDir = path.join(__dirname, '/public/uploads');

        // Create the uploads directory if it doesn't exist
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const filePath = path.join(uploadsDir, fileName);
        const buffer = Buffer.from(image, 'base64');

        await fs.promises.writeFile(filePath, buffer);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Upload successful!' }),
        };
    } catch (error) {
        console.error('Upload error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Upload failed', error: error.message }),
        };
    }
};
