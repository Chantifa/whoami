import jwt from "jsonwebtoken";

export function createJWT(email, userId, duration) {
    const payload = {
        email,
        userId,
        duration
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: duration,
    });
}