import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";

const strongPasswordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/;

class UserController {
  static userRegistration = async (req, res) => {
    try {
      const {
        username,
        email,
        contactNumber,
        password,
        confirm_password,
        location,
        role,
      } = req.body; // Data from frontend

      const userExists = await UserModel.findOne({ email: email });
      if (userExists) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      if (!username || !email || !password || !confirm_password) {
        return res
          .status(400)
          .json({ status: "failed", msg: "All fields are required" });
      }

      if (password !== confirm_password) {
        return res.status(400).json({
          status: "failed",
          msg: "Password and confirm password do not match",
        });
      }

      // Check if password meets strong password criteria
      if (!strongPasswordRegex.test(password)) {
        return res.status(400).json({
          status: "failed",
          msg: "Password must be strong. It should contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.",
        });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const userCreated = await UserModel.create({
        profile: req?.files[0]?.path,
        username: username,
        email: email,
        contactNumber: contactNumber,
        password: hashedPassword,
        location: location,
        role: role,
      });

      console.log("Created user:", userCreated);

      return res.status(200).json({
        msg: "Registration successful",
        userId: userCreated._id.toString(),
        token: await userCreated.generateToken(),
      });
    } catch (error) {
      console.error("User Registration Error:", error);
      return res.status(500).json("Internal server error");
    }
  };

  // static userLogin = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     if (email && password) {
  //       const user = await UserModel.findOne({ email: email });
  //       if (user != null) {
  //         const isMatch = await bcrypt.compare(password, user.password);
  //         if (user.email === email && isMatch) {
  //           //Generate JWT Token
  //           const token = jwt.sign(
  //             { userID: user._id },
  //             process.env.JWT_SECRET_KEY,
  //             { expiresIn: "5d" }
  //           );
  //           res.status(201).json({
  //             status: "success",
  //             message: "Login successful",
  //             token: token,
  //           });
  //         } else {
  //           res.status(400).json({
  //             status: "failed",
  //             message: "Email or password is not valid",
  //           });
  //         }
  //       } else {
  //         res.status(401).json({
  //           status: "failed",
  //           message: "You are not registered user",
  //         });
  //       }
  //     } else {
  //       res
  //         .status(400)
  //         .json({ status: "failed", message: "All fields are required" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({ status: "failed", message: "unable to login" });
  //   }
  // };

  //controller for login users
  static userLogin = async (req, res) => {
    try {
      //takes input from frontend in req.body
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "All fields are required", success: false });
      }
      // check if user already exists
      const userExists = await UserModel.findOne({ email: email });
      if (!userExists) {
        return res.status(400).json({
          message: "No user found. Please register first to login",
          success: false,
        });
      }
      //check if password match or not
      const isMatch = await bcrypt.compare(password, userExists.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Email or password is not valid", success: false });
      }

      res.status(200).json({
        message: "Login successful",
        success: true,
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
        username: userExists.username,
        email: userExists.email,
        contactNumber: userExists.contactNumber,
        location: userExists.location,
        profile: userExists.profile,
        role: userExists.role,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  };

  // Controller function to change user password
  static changePassword = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body; // Get userId, currentPassword, and newPassword from request body

    try {
      // Find the user by their ID
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify the current password
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password with the new hashed password
      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  static loggedUser = async (req, res) => {
    res.json({ user: req.user });
  };

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await UserModel.findOne({ email: email });
      console.log(user);

      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, {
          expiresIn: "59m",
        });
        const link = `http://127.0.0.1:4000/api/user/forgotPassword/${user._id}/${token}`;
        console.log(link);

        //Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password Reset Link - Construction Professional's Nepal",
          html: `<a href =${link}>Click Here </a> to Reset Your Password`,
        });

        res.status(200).send({
          status: "success",
          message: "Password Reset Email Sent...  Please Check Your Email",
          // info: info,
        });
      } else {
        res
          .status(401)
          .send({ status: "failed", message: "Email doesn't exists" });
      }
    } else {
      res
        .status(400)
        .send({ status: "failed", message: "Email field is required" });
    }
  };

  static userPasswordReset = async (req, res) => {
    console.log("asdfasd");
    const { email, password } = req.body;
    console.log("password", email);
    const { id, token } = req.params;
    console.log("id", id);
    console.log("token", token);
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      const verifyToken = jwt.verify(token, new_secret);
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const newhashPassword = await bcrypt.hash(password, salt);

        await UserModel.findByIdAndUpdate(user._id, {
          $set: { password: newhashPassword },
        });
        res.send({
          status: "success",
          message: "password changed successfully",
        });
        console.log("password changed successfully");
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "password required" });
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).send({ status: "failed", message: "Token expired" });
      } else {
        console.log(error);
        res
          .status(500)
          .send({ status: "failed", message: "failed to change pw" });
      }
    }
    //   const { id, token } = req.params;
    //   const { password } = req.body;

    //   const oldUser = await User.findOne({ _id: id });
    //   if (!oldUser) {
    //     return res.json({ status: "User Not Exists!!" });
    //   }
    //   const secret = JWT_SECRET + oldUser.password;
    //   try {
    //     const verify = jwt.verify(token, secret);
    //     const encryptedPassword = await bcrypt.hash(password, 10);
    //     await User.updateOne(
    //       {
    //         _id: id,
    //       },
    //       {
    //         $set: {
    //           password: encryptedPassword,
    //         },
    //       }
    //     );

    //     res.render("index", { email: verify.email, status: "verified" });
    //   } catch (error) {
    //     console.log(error);
    //     res.json({ status: "Something Went Wrong" });
    //   }
  };
}

export default UserController;
