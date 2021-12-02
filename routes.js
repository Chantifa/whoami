import router from "express";
import {register, login} from "./controllers/auth.js";
import {getRanking, getUserInfo} from "./model/userInfoRepo.js";
import {getOverview} from "./model/RoomMembershipRepo.js";

const route = router.Router();

route.post('/register', register)
route.post('/login', login)

route.get('/ranking', getRanking)
route.get('/userInfo/:userId', getUserInfo)

route.get('/games', getOverview)

export default route;
