const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    try {
        // Parse the event body (Assuming it's JSON with base64 string)
        const body = JSON.parse(event.body);
        const base64String = body.image;  // The base64-encoded image string
        const fileName = body.fileName || 'uploaded_image.jpg'; // Get filename or use default

        // Decode base64 string into buffer
        const data = Buffer.from(base64String, 'base64');

        // Define the file path to save the image locally
        const filePath = path.join(__dirname, '../../public/uploads', fileName);

        // Write the buffer to a file
        fs.writeFileSync(filePath, data);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Image uploaded successfully!' })
        };
    } catch (err) {
        console.error('Error uploading image:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to upload image' })
        };
    }
};
