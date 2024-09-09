// app/api/query.ts

import { NextRequest, NextResponse } from "next/server";

type Data = {
  response?: string;
  error?: string;
};

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request
    const { query } = await req.json();

    // Ensure 'query' is defined
    if (typeof query !== 'string') {
      throw new Error('Invalid query format');
    }

    const apiResponse = await fetch('http://localhost:8000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    // Check if the response is okay
    if (!apiResponse.ok) {
      throw new Error('Failed to fetch from the AI backend.');
    }

    // Parse the JSON response from the API
    const data: Data = await apiResponse.json();

    // Return the response data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Return an error response
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
