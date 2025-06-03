
// Importing the User model
const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' }
];


//const User= require("../models/User");

import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';


// exports.getUsers = async(req, res) => {
//     // Simulating a database call
//     const users = await User.find();

//     res.json(users);
// }

export const getUsers = async(req, res) => {
    // Simulating a database call
    const users = await User.find();

    res.json(users);
}

// exports.getUserInfo = (req, res) => {
//     const userId = parseInt(req.params.id);
//     const user = users.find(u => u.id === userId);

//     if (!user) {
//         return res.status(404).send('User not found');
//     }

//     res.json(user);
// }

export const getUserInfo = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.json(user);
}

// exports.createUser = async (req, res) => {
//     console.log("Creating user with data:", req.body);
//   const user = new User(req.body);
//   const saved = await user.save();
//   res.status(201).json(saved);
// };

export const createUser = async (req, res) => {
    console.log("Creating user with data:", req.body);
  const user = new User(req.body);
  const saved = await user.save();
  res.status(201).json(saved);
};

// exports.updateUser = async (req, res) => {
//     const {id} = req.params;
//     try{
//  const updatedUser = await User.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true } // returns updated document
//     );

    
    
//  if (!updatedUser) {
//       return res.status(404).send('User not found');
//     }
//     res.json(updatedUser);

//     }catch (error) {
//         console.error("Error updating user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     };
   


// }

export const updateUser = async (req, res) => {
    const {id} = req.params;
    try{
 const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // returns updated document
    );

    
    
 if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);

    }catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    };
   


}

// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedUser = await User.findByIdAndDelete(id);
//     if (!deletedUser) {
//       return res.status(404).send('User not found');
//     }
//     res.send(`User with id ${id} deleted`);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };


export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.send(`User with id ${id} deleted`);
  } catch (err) {
    res.status(500).send('Server error');
  }
};


// exports.getUserById = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//         res.json(user);
//     } catch (error) {
//         console.error("Error fetching user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


