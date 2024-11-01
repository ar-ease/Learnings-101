import { Client } from "pg";

// Async function to insert data into a table
async function getUser(email: string) {
  const client = new Client({
    connectionString:
      "postgresql://neondb_owner:h0QYpa3lAvXT@ep-wild-river-a5si0z6s.us-east-2.aws.neon.tech/neondb?sslmode=require",
  });
  try {
    await client.connect(); // Ensure client connection is established
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      console.log("User found:", result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log("No user found with the given email.");
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error("Error during fetching user:", err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

getUser("user5@gmail.com").catch(console.error);
