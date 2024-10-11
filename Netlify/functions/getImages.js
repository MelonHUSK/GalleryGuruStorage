const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    const uploadsDir = path.join(__dirname, '../../public/uploads');
    const imageNames = fs.readdirSync(uploadsDir);

    return {
      statusCode: 200,
      body: JSON.stringify(imageNames),  // Return list of image filenames
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error: Cannot list images" }),
    };
  }
};
