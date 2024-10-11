const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        const uploadsDir = path.join(__dirname, 'public/uploads');

        form.parse(event.body, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                return reject({
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Failed to parse form data', error: err.message }),
                });
            }

            // Ensure the uploads directory exists
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true }); // Create uploads directory if it doesn't exist
            }

            const file = files.file[0];
            const tempPath = file.path;
            const newFilePath = path.join(uploadsDir, file.originalFilename);

            try {
                // Move the file from temp to uploads directory
                fs.renameSync(tempPath, newFilePath);
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Upload successful', filePath: newFilePath }),
                });
            } catch (error) {
                console.error('Error saving file:', error);
                reject({
                    statusCode: 500,
                    body: JSON.stringify({ message: 'Upload failed', error: error.message }),
                });
            }
        });
    });
};
