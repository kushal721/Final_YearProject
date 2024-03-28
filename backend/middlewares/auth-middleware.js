// import jwt from "jsonwebtoken";
// import UserModel from "../models/User.js";

// const checkUserAuth = async (req, res, next) => {
//   try {
//     let token;

//     // Get token from the Authorization header
//     const authHeader = req.headers.authorization;

//     // Check if Authorization header is present and starts with "Bearer"
//     if (authHeader && authHeader.startsWith("Bearer")) {
//       // Extract the token
//       token = authHeader.split(" ")[1];

//       // Verify the token
//       const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

//       // Get user from token
//       req.user = await UserModel.findById(userID).select("-password");

//       // Call next middleware
//       return next();
//     } else {
//       // No token found in header
//       return res
//         .status(401)
//         .send({ status: "failed", message: "Unauthorized User, No token" });
//     }
//   } catch (error) {
//     // Token verification failed
//     console.error(error);
//     return res
//       .status(401)
//       .send({ status: "failed", message: "Unauthorized User, Invalid token" });
//   }
// };

// export default checkUserAuth;

// import jwt from "jsonwebtoken";

// export default   function  checkUserAuth(req, res, next) {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res
//       .status(401)
//       .send({ status: "failed", message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(
//       token.split(" ")[1],
//       process.env.JWT_SECRET_KEY,
//       (err, decoded) => {
//         if (err) {
//           res
//             .status(401)
//             .send({ status: "failed", message: "Unauthorized User" });
//         } else {
//           req.body.userId = decoded.userId;
//           next();
//         }
//       }
//     );
//   } catch (error) {
//     return res
//     .status(401)
//     .send({ status: "failed", message: "Unauthorized user"
//   })
// }
// }

import jwt from "jsonwebtoken";

const checkUserAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
export default checkUserAuth;
