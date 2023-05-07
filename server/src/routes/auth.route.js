import { Router } from "express"
import {
  getprofile,
  login,
  logout,
  signUp,
} from "../controllers/auth.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/logout", logout)

router.get("/profile", isLoggedIn, getprofile)

export default router
