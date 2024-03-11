import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId).populate('recipes')
    res.json(profile)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function addIngredient(req, res) {
  try {
    console.log(req.body)
    const profile = await Profile.findById(req.user.profile)
    .populate('recipes')
    req.body.ingredients.forEach(ingredient => {
      profile.shoppingList.push({item: ingredient, recipe: req.body.edamamId})
    })
    profile.save()
    res.json(profile)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
  
}

export { index, addPhoto, show, addIngredient }
