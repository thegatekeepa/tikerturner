import { z } from 'zod';
import User from '../models/model.user.js'; 

// 1. Schema handles purely synchronous structural validation
export const validateNewUserName = z.object({
  username: z
    .string()
    .min(4)
});

// 2. Used inside your controller
export const handleUserRegistration = async (req, res) => {
  // Sync validation works perfectly here
  const validation = validateNewUserName.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json(validation.error.format());
  }

  // Extract the valid format data
  const { username } = validation.data;

  try {
    // 3. Perform the async database check manually
    const userExists = await User.findOne({ username });
    
    if (userExists) {
      return res.status(400).json({
        username: {
          _errors: ["Username already taken"]
        }
      });
    }

    // Process valid registration here...
    
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};


// to be used in controller
//const validation = await validateNewUserName.safeParseAsync(req.body);
//if (!validation.success) {
  //return res.status(400).json(validation.error.format());
//}
