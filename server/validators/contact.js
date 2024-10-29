// <https://github.com/colinhacks/zod>

const { z } = require("zod");

// Creating an object schema
const contactSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim(), 
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(10, { message: "Message must be at least of 10 characters" }) 
});
  
module.exports = { contactSchema }; 