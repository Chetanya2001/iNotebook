import jwt from "jsonwebtoken";
const _jwt = jwt;
const JWT_secret = "secret_key";

const checkAuth = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    console.log(token);
    const decode = jwt.verify(token, JWT_secret, null);
    if (decode.exp <= Math.floor(Date.now() / 1000)) {
      return res.status(401).send({ message: "Token has expired" });
    }
    req.userData = decode;
  } catch (error) {
    return res.status(401).send({ errors: error.message });
  }
  next();
};

export default checkAuth;
