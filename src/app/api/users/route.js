// Import necessary modules from Next.js and Vercel's PostgreSQL SDK
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Named export for the GET HTTP method
export async function GET(request) {
    try {
        // Fetch data from your PostgreSQL database
        const result = await sql`SELECT * FROM rounds where USER_ID = 1 ORDER BY DATE_PLAYED DESC LIMIT 20;`;

        // Send the fetched data as a JSON response
        return NextResponse.json(result);
    } catch (error) {
        // Properly handle any errors
        console.error("Database fetch error:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
