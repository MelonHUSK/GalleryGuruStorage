const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    // Adjust the path to the uploads directory
    const uploadsDir = path.join(__dirname, '../public/uploads');

    try {
        // Check if the uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
            console.error('Uploads directory does not exist:', uploadsDir);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Uploads directory not found' }),
            };
        }

        // Read files from the uploads directory
        const files = fs.readdirSync(uploadsDir);
        const images = files.map(file => `/uploads/${file}`);  // Assuming public uploads are accessible at /uploads/
        
        return {
            statusCode: 200,
            body: JSON.stringify(images),
        };
    } catch (error) {
        console.error('Failed to list images:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to list images', error: error.message }),
        };
    }
};
