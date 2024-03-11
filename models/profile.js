import mongoose from 'mongoose'

const Schema = mongoose.Schema

const shoppingListSchema = new Schema({
  item: String,
  recipe: {type: Schema.Types.ObjectId, ref: 'Recipe'},
  purchased: Boolean
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  photo: String,
  recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
  shoppingList: [shoppingListSchema]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
