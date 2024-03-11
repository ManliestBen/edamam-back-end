import { Recipe } from "../models/recipe.js"
import { Profile } from "../models/profile.js"
const edamamUrl = `https://api.edamam.com/api/recipes/v2`

async function search(req, res) {
  try {
    const apiResponse = await fetch(`${edamamUrl}?type=public&q=${req.body.query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)
    const apiData = await apiResponse.json()
    apiData.hits.forEach(recipe => delete recipe['_links'])
    res.json(apiData.hits)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const apiResponse = await fetch(`${edamamUrl}/${req.params.edamamId}?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)
    const apiData = await apiResponse.json()
    delete apiData['_links']
    res.json(apiData.recipe)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function create(req, res) {
  // add an addedBy property to req.body
  req.body.addedBy = req.user.profile
  // create the new recipe
  const recipe = await Recipe.create(req.body)
  // find the profile of the logged in user (populate recipes)
  const profile = await Profile.findById(req.user.profile).populate('recipes')
  // add the full recipe to the profile
  profile.recipes.push(recipe)
  // save the profile
  await profile.save()
  // respond to the front end with the update profile
  res.json(profile)
}

export {
  search,
  show,
  create
}