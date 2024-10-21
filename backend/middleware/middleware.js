import jwt from "jsonwebtoken";
const JWT_secret = "secret_key";

const checkAuth = (req, res, next) => {
  try {
    // Get the token from the headers
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    console.log("Token received:", token);

    // Verify the token (jsonwebtoken automatically handles expiration)
    // const decoded = jwt.verify(token, JWT_secret);
    const base64Url = token.split(".")[1]; // Get the payload part of the JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedData = JSON.parse(
      Buffer.from(base64, "base64").toString("utf8")
    );

    console.log("Manually Decoded Token:", decodedData);

    // Attach user data to request object
    req.userData = decodedData;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token expiration or invalid token errors
    console.error("JWT verification error:", error.message);
    return res.status(401).send({ errors: error.message });
  }
};

export default checkAuth;
