import express from 'express';
import {
    getCoffees,
    getCoffeeById,
    createCoffee,
    updateCoffee,
    deleteCoffee
} from '../controllers/coffeeController.js';
import validateCoffee from '../middleware/validateCoffee.js';

const router = express.Router();

router.get('/', getCoffees);
router.get('/:id', getCoffeeById);
router.post('/', validateCoffee, createCoffee);
router.put('/:id', validateCoffee, updateCoffee);
router.delete('/:id', deleteCoffee);

export default router;