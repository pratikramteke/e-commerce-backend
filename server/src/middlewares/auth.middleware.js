import User from "../models/user.schema.js"
import JWT from "jsonwebtoken"
import asyncHandler from "../service/asyncHandler.js"
import config from "../config/index.js"

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.cookies.token ||
    (req.headers.autorization && req.headers.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.autorization.split(" ")[1]
  }

  if (!token) {
    throw new Error("Not authorized to access the resources")
  }

  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET)
    req.user = await User.findById(decodedJwtPayload._id, "name email role")
    next()
  } catch (error) {
    throw new Error("Not authorized to access the resources")
  }
})

export const authorize = (...requiredRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      throw new Error("You are not authorized")
    }
    next()
  })
