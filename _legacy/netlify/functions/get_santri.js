const { Client } = require('pg');

exports.handler = async (event, context) => {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const client = new Client({
        connectionString: 'postgresql://neondb_owner:npg_m2WaKfdqA7le@ep-hidden-glade-a1d3ihyy-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    });

    try {
        await client.connect();

        // Select all students ordered by newest first (using ID)
        const result = await client.query('SELECT * FROM pendaftaran_santri ORDER BY id DESC');

        await client.end();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Allow CORS for now
            },
            body: JSON.stringify(result.rows),
        };
    } catch (error) {
        console.error('Database Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
        };
    }
};
