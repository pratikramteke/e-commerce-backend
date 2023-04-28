import mongoose from "mongoose"
import app from "./app.js"
import config from "./config/index.js"

;(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL)
    console.log("Database Connected")

    app.on("error", (error) => {
      console.error("ERROR: ", error)
      throw error
    })

    app.listen(config.PORT, () =>
      console.log(`App Run on http://localhost:${config.PORT}`)
    )
  } catch (error) {
    console.error("ERROR: ", error)
    throw error
  }
})()
