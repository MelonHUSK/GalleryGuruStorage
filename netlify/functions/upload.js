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
        // Parse the JSON body of the request
        const { image, fileName } = JSON.parse(event.body);

        // Validate incoming data
        if (!image || !fileName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing image or filename' }),
            };
        }

        // Define the directory to save the uploaded image
        const uploadsDir = path.join(__dirname, '/public/uploads');

        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Create the path for the new file
        const filePath = path.join(uploadsDir, fileName);

        // Convert base64 string to Buffer
        const buffer = Buffer.from(image, 'base64');

        // Write the file to the filesystem
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
