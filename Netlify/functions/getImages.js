const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const dirPath = path.join(__dirname, '../../public/uploads'); // Adjust as needed
    try {
        const files = await fs.promises.readdir(dirPath);
        const images = files.filter(file => /\.(jpg|jpeg|png)$/.test(file)); // Filter for image files
        return {
            statusCode: 200,
            body: JSON.stringify(images),
        };
    } catch (error) {
        console.error('Error listing images:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error: Cannot list images' }),
        };
    }
};
