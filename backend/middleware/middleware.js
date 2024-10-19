import jwt from "jsonwebtoken";
const _jwt = jwt;
const JWT_secret = "secret_key";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, secretkey, null);
    if (decode.exp <= Math.floor(Date.now() / 1000)) {
      return res.status(401).send({ message: "Token has expired" });
    }
    req.userData = decode;
  } catch {
    return res.status(401).send({ message: "Auth Fail" });
  }
};
