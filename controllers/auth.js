import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createJWT} from "../utils/auth.js";

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function register(req, res, next) {
    const {name, email, password, password_confirmation} = req.body;
    let errors = [];
    if (!name) {
        errors.push({name: "required"});
    }
    if (!email) {
        errors.push({email: "required"});
    }
    if (!emailRegexp.test(email)) {
        errors.push({email: "invalid"});
    }
    if (!password) {
        errors.push({password: "required"});
    }
    if (!password_confirmation) {
        errors.push({
            password_confirmation: "required",
        });
    }
    if (password !== password_confirmation) {
        errors.push({password: "mismatch"});
    }
    if (errors.length > 0) {
        return res.status(422).json({errors: errors}); // 422 = Unprocessable Entity means there are errors
    }
    User.findOne({email: email})
        .then(user => {
            if (user) {
                return res.status(409).json({errors: [{user: "email already exists"}]}); // 409 = Conflict
            } else {
                const user = new User({
                    name: name,
                    email: email,
                    password: password,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(response => {
                                res.status(201).json({ // 201 = Created,
                                    success: true,
                                    result: response
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{error: err}]
                                });
                            });
                    });
                });
            }
        }).catch(err => {
        res.status(500).json({
            errors: [{error: err}]
        });
    })
}

export function login(req, res) {
    const { email, password } = req.body;
    const errors = [];

    if (!email) {
        errors.push({
            email: "required",
        });
    }
    if (!emailRegexp.test(email)) {
        errors.push({
            email: "invalid email",
        });
    }
    if (!password) {
        errors.push({
            password: "required",
        });
    }
    if (errors.length > 0) {
        return res.status(422).json({ // 422 = Unprocessable Entity means there are errors
            errors: errors,
        });
    }
    User.findOne({
        email: email,
    })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    errors: [
                        {
                            user: "not found",
                        },
                    ],
                });
            } else {
                bcrypt
                    .compare(password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            return res.status(401).json({ // 401 = unauthorized, it lacks valid auth credentials
                                errors: [
                                    {
                                        password: "incorrect",
                                    },
                                ],
                            });
                        }
                        const access_token = createJWT(user.email, user._id, 31556952000);
                        jwt.verify(
                            access_token,
                            process.env.TOKEN_SECRET,
                            (err, decoded) => {
                                if (err) {
                                    res.status(500).json({
                                        errors: err,
                                    });
                                }
                                if (decoded) {
                                    return res.status(200).json({
                                        success: true,
                                        token: access_token,
                                        message: user,
                                    });
                                }
                            }
                        );
                    })
                    .catch((err) => {
                        res.status(500).json({
                            errors: err,
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).json({
                errors: err,
            });
        });
}
