import jwt from "jsonwebtoken";

export function createJWT(email, userId, durationInMilliseconds) {
    const payload = {
        email,
        userId,
        durationInMilliseconds
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: durationInMilliseconds,
    });
}