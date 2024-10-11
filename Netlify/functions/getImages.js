const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    try {
        const { image, fileName } = JSON.parse(event.body);  // Make sure event.body is parsed correctly

        // Assuming you want to save the image as a file
        const filePath = path.join(__dirname, '../../public/uploads', fileName);
        const buffer = Buffer.from(image, 'base64'); // Convert base64 string to buffer
        await fs.promises.writeFile(filePath, buffer); // Save the file

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Upload successful!' }),
        };
    } catch (error) {
        console.error('Error in upload function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Upload failed', error: error.message }),
        };
    }
};
