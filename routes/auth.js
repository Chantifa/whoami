import router from "express";
import {register, login} from "../controllers/auth.js";

const route = router.Router();

route.post('/register', register)
route.post('/login', login)

export default route;
