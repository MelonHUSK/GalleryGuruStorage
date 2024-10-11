const AWS = require('aws-sdk'); // Optional: Use AWS S3 to store the images

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);

        // Logic to save the image (to AWS S3 or your preferred method)
        const fileData = data.file; // Assume you're sending a base64 string

        // For example, using AWS S3
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'YOUR_BUCKET_NAME',
            Key: `uploads/${Date.now()}-${data.fileName}`,
            Body: Buffer.from(fileData, 'base64'),
            ContentType: 'image/jpeg', // Change according to the file type
        };

        try {
            await s3.upload(params).promise();
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'File uploaded successfully' }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'File upload failed' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
    };
};
