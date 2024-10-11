const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    const form = new multiparty.Form();
    const data = await new Promise((resolve, reject) => {
      form.parse(event.body, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const tempPath = data.files.file[0].path; // Adjust according to the field name used in your form
    const uploadsDir = path.join(__dirname, '../public/uploads'); // Ensure this path is correct

    // Move file from tempPath to uploads directory
    const targetPath = path.join(uploadsDir, data.files.file[0].originalFilename);
    fs.renameSync(tempPath, targetPath);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Upload successful!' }),
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Upload failed', error: error.message }),
    };
  }
};
