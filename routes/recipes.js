import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as recipesCtrl from '../controllers/recipes.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/search', checkAuth, recipesCtrl.search)
router.get('/:edamamId', checkAuth, recipesCtrl.show)

export { router }
