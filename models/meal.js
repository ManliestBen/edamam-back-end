import mongoose from 'mongoose'

const Schema = mongoose.Schema

const mealSchema = new Schema({
  recipe: {type: Schema.Types.ObjectId, ref: 'Recipe'},
  mealType: {
    type: String, 
    enum: ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert']
  },
  date: {type: Date}
},{
  timestamps: true,
})

const Meal = mongoose.model('Meal', mealSchema)

export { Meal }
