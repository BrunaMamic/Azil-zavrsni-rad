import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle the login logic here
    const { username, password } = req.body;

    // Perform authentication and validation
    if (username === 'test' && password === 'aaa') {
      // Authentication successful
      const user = {
        id: 1,
        username: 'test',
        email: 'admin@example.com',
      };

      // Set the user in session or create a JWT token and send it back as a response
      // For example, you can use a session library like `next-auth` to manage user sessions

      // Return a success response
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    // Method not allowed
    res.status(405).json({ message: 'Method not allowed' });
  }
}
