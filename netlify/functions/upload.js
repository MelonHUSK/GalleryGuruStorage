exports.handler = async (event, context) => {
    try {
        if (event.httpMethod === 'POST') {
            const data = JSON.parse(event.body);

            // Check if the required fields are present
            if (!data.file || !data.fileName) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'File and fileName are required' }),
                };
            }

            // Simulate processing or storing the uploaded data
            console.log(`Received file: ${data.fileName}`);
            
            // Your upload logic goes here

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'File upload received', data }),
            };
        }

        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    } catch (error) {
        console.error('Error processing the request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server error' }),
        };
    }
};
