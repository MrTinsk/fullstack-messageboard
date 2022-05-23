import bcrypt from "bcrypt";
import User from "./../models/User.js";


/**
 * Controller method to register the user
 * @param {*} req
 * @param {*} res
 */

 export const register = async (req, res) => {
    try {

      const username = await User.findOne({ username: req.body.username });

      if (username) {
        return res.status(400).json({ message: "username is already in use" });
      }

    

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const userToAdd = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
        ip: req.ip
    
      });
  
      return res
        .status(200)
        .json({ message: "User was created", user: userToAdd.username});
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error happened", error: error.message });
    }
  };
  