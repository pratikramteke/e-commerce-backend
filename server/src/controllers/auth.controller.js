import User from "../models/user.schema.js"
import asyncHandler from "../service/asyncHandler.js"

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
}

export const signUp = asyncHandler(async (req, res) => {
  // get data from user
  const { name, email, password } = req.body

  // validation
  if (!name || !email || !password) {
    throw new Error("Please add all fields")
  }

  // check if user already exists
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new Error("User already exists")
  }

  const user = await User.create({ name, email, password })
  const token = user.getJWTtoken()

  // safety
  user.password = undefined

  // store this token in user's cookie
  res.cookie("token", token, cookieOptions)

  // send back a response to user
  res.status(200).json({
    success: true,
    token,
    user,
  })
})


/*********************************************************
 * @LOGIN
 * @route http://localhost:5000/api/auth/login
 * @description User Login Controller for signing in the user
 * @returns User Object
 *********************************************************/



export const login = asyncHandler(async (req, res) => {
  // get data from user
  const { email, password } = req.body

  // validation
  if (!email || !password) {
    throw new Error("please fill all details")
  }

  const user = User.findOne({ email }).select("+password")

  if (!user) {
    throw new Error("Invalid credentials")
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (isPasswordMatched) {
    const token = user.getJWTtoken()
    user.password = undefined
    res.cookie("token", token, cookieOptions)
    return res.status(200).json({
      success: true,
      token,
      user,
    })
  }

  throw new Error("Password is incorrect")
})

/**********************************************************
 * @LOGOUT
 * @route http://localhost:5000/api/auth/logout
 * @description User Logout Controller for logging out the user
 * @description Removes token from cookies
 * @returns Success Message with "Logged Out"
 **********************************************************/

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: "Logged Out",
  })
})

/**********************************************************
 * @GET_PROFILE
 * @route http://localhost:5000/api/auth/profile
 * @description check token in cookies, if present then returns user details
 * @returns Logged In User Details
 **********************************************************/

export const getProfile = asyncHandler(async (req, res) => {
  const { user } = req

  if (!user) {
    throw new Error("User not found")
  }

  res.status(200).json({
    success: true,
    user,
  })
})
