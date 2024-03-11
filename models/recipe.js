import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: String,
  edamamId: String,
  addedBy: {type: Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export { Recipe }
