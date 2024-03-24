import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  //spliting the Bearer and token which comes from headers
  const token = authorization.split(" ")[1];
  try {
    //get the _id from the token by verifying the token 
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await  UserModel.findOne({ _id}).select('_id')
    next()


  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;