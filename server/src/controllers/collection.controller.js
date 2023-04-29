import Collection from "../models/collection.schema.js"
import asyncHandler from "../service/asyncHandler.js"

export const createCollection = asyncHandler(async (req, res) => {
  const { name } = req.body

  if (!name) {
    throw new Error("Collection name is required")
  }

  const collection = await Collection.create({ name })

  res.status(200).json({
    success: true,
    message: "Collection was created successfully",
    collection,
  })
})

export const updateCollection = asyncHandler(async (req, res) => {
  const { name } = req.body
  const { id: collecionId } = req.params

  if (!name) {
    throw new Error("Collection name is required")
  }

  let updateCollection = await Collection.findByIdAndUpdate(
    collecionId,
    { name },
    { new: true, runValidators: true }
  )

  if (!updateCollection) {
    throw new Error("Collection not found")
  }

  res.status(200).json({
    success: true,
    message: "Collection updated successfully",
    updateCollection,
  })
})

export const deleteCollection = asyncHandler(async (req, res) => {
  const { id: collecionId } = req.params

  const collectionToDelete = await Collection.findById(collecionId)

  if (!collectionToDelete) {
    throw new Error("Collection to deleted not found")
  }

  await collectionToDelete.remove()

  res.status(200).json({
    success: true,
    message: "Collection deleted successfully",
  })
})

export const getAllCollection = asyncHandler(async (req, res) => {
  const collections = await Collection.find()

  if (!collections) {
    throw new Error("No collection found")
  }

  res.status(200).json({
    success: true,
    collections,
  })
})
