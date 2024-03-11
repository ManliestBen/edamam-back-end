import { Recipe } from "../models/recipe.js"


async function search(req, res) {
  console.log(req.body)
  res.json([{recipeName: 'TEST'}, {recipeName: 'TEST2'}])
}

export {
  search
}