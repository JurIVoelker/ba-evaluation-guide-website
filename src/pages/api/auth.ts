// Importing necessary types from Next.js
import type { NextApiRequest, NextApiResponse } from "next";

// Default handler function for the API route
export default function handler(_: NextApiRequest, res: NextApiResponse) {
  // Setting the 'WWW-authenticate' header to prompt Basic Authentication
  res.setHeader("WWW-authenticate", 'Basic realm="Secure Area"');

  // Setting the HTTP status code to 401 (Unauthorized)
  res.statusCode = 401;

  // Sending a response indicating authentication is required
  res.end(`Auth Required.`);
}
