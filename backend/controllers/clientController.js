import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";

class UserController {
  // static userRegistration = async (req, res) => {
  //   try {
  //     const { username, email, password, confirm_password } = req.body; //data from frontend
  //     const userExists = await UserModel.findOne({ email: email });
  //     if (userExists) {
  //       res.status(400).json({ msg: "email already exists" });
  //     } else {
  //       if (username && email && password && confirm_password) {
  //         if (password === confirm_password) {
  //           try {
  //             const salt = await bcrypt.genSalt(10);
  //             const hasPassword = await bcrypt.hash(password, salt);
  //             const doc = new UserModel({
  //               username: username,
  //               email: email,
  //               password: hasPassword,
  //             });
  //             await doc.save();
  //             const saved_user = await UserModel.findOne({ email: email });

  //             // Generate JWT Token
  //             const token = jwt.sign(
  //               { userID: saved_user._id },
  //               process.env.JWT_SECRET_KEY,
  //               { expiresIn: "5d" }
  //             );
  //             // res.status(201).json({ status: 201, saved_user, token: token });
  //             res.status(200).json({
  //               status: "success",
  //               message: "Registration successful",
  //               saved_user,
  //               token: token,
  //             });
  //           } catch (error) {
  //             console.log(error);
  //             res
  //               .status(400)
  //               .json({ status: "failed", message: "Unable to register" });
  //           }
  //         } else {
  //           res.status(400).json({
  //             status: "failed",
  //             message: "Password and confirm password doesnot match",
  //           });
  //         }
  //       } else {
  //         res
  //           .status(400)
  //           .json({ status: "failed", message: "All fields are required" });
  //       }
  //     }
  //   } catch (error) {
  //     res.status(500).json("internal server error");
  //   }
  // };

  static userRegistration = async (req, res) => {
    try {
      const { username, email, password, confirm_password, role } = req.body; //data from frontend
      const userExists = await UserModel.findOne({ email: email });
      if (userExists) {
        res.status(400).json({ msg: "email already exists" });
      } else {
        if (username && email && password && confirm_password) {
          if (password === confirm_password) {
            //hash the password
            const salt = await bcrypt.genSalt(10);
            const hasPassword = await bcrypt.hash(password, salt);

            const userCreated = await UserModel.create({
              username: username,
              email: email,
              password: hasPassword,
              role,
            });

            // const saved_user = await userModel.findOne({ email: email });

            // Generate JWT Token
            // const token = jwt.sign(
            //   { userID: saved_user._id },
            //   process.env.JWT_SECRET_KEY,
            //   { expiresIn: "5d" }
            // );
            // res.status(201).json({ status: 201, saved_user, token: token });
            res.status(200).json({
              msg: "registration successful",
              userId: userCreated._id.toString(),
              token: await userCreated.generateToken(),
            });
          } else {
            res.status(400).json({
              status: "failed",
              msg: "Password and confirm password doesnot match",
            });
          }
        } else {
          res
            .status(400)
            .json({ status: "failed", msg: "All fields are required" });
        }
      }
    } catch (error) {
      res.status(500).json("internal server error");
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

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "All fields are required", success: false });
      }

      const userExists = await UserModel.findOne({ email: email });
      if (!userExists) {
        return res
          .status(404)
          .json({ message: "No user found", success: false });
      }

      const isMatch = await bcrypt.compare(password, userExists.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Email or password is not valid", success: false });
      }

      res.status(200).json({
        msg: "Login successful",
        success: true,
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
        email: userExists.email,
        role: userExists.role,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { password, confirm_password } = req.body;
    if (password && confirm_password) {
      if (password !== confirm_password) {
        res.status(400).json({
          status: "failed",
          message: "New Password and confirm password not mactched ",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: {
            password: newHashPassword,
          },
        });
        // console.log(req.user._id);
        res.status(201).json({
          status: "success",
          message: "Password chanaged successfully",
        });
      }
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
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
          expiresIn: "15m",
        });
        const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
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
    const { password, confirm_password } = req.body;
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && confirm_password) {
        if (password !== confirm_password) {
          res.status(400).send({
            status: "failed",
            message: "New password and confirm password doesnot match",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await UserModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
          res.status(200).send({
            status: "success",
            message: "Password reset successfully",
          });
        }
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "all fields are required" });
      }
    } catch (error) {
      res.status(401).send({ status: "failed", message: "Invalid token" });
    }
  };
}

export default UserController;
