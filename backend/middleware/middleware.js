import jwt from "jsonwebtoken";
const _jwt = jwt;
const JWT_secret = "secret_key";

const checkAuth = (req, res, next) => {
  try {
    // Get the token from the headers
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    console.log("Token received:", token);

    // Verify the token
    const decodedData = _jwt.verify(token, JWT_secret);
    console.log("Decoded Data:", decodedData);

    // Attach user data to request object
    req.userData = decodedData;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).send({ errors: error.message });
  }
};

export default checkAuth;
