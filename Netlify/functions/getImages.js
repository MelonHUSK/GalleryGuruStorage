const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    // Check if the request method is GET
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const uploadsDir = path.join(__dirname, '/public/uploads'); // Ensure this path is correct
        const files = await fs.promises.readdir(uploadsDir);

        return {
            statusCode: 200,
            body: JSON.stringify(files), // Return the list of files
        };
    } catch (error) {
        console.error('Error reading files:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to list images', error: error.message }),
        };
    }
};
