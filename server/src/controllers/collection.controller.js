import Collection from "../models/collection.schema.js"
import asyncHandler from "../service/asyncHandler.js"

/**********************************************************
 * @CREATE_COLLECTION
 * @route https://localhost:5000/api/collection/
 * @description Controller used for creating a new collection
 * @description Only admin can create the collection
 *********************************************************/



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

  /**
   * @UPDATE_COLLECTION
   * @route http://localhost:5000/api/collection/:collectionId
   * @description Controller for updating the collection details
   * @description Only admin can update the collection
   */



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

/**
   * @DELETE_COLLECTION
   * @route http://localhost:5000/api/collection/:collectionId
   * @description Controller for deleting the collection
   * @description Only admin can delete the collection
   */

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

  /**
   * @GET_ALL_COLLECTION
   * @route http://localhost:5000/api/collection/
   * @description Controller for getting all collection list
   * @description Only admin can get collection list
   * @returns Collection Object with available collection in DB
   */



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
