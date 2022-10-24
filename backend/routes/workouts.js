const express=require('express');
const Workout=require('../models/WorkoutModel')
const router=express.Router();
const  {createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout, }=require('../controllers/workoutController')
const useAuth=require('../middleware/useAuth');
router.use(useAuth);

router.post('/', createWorkout);

router.get('/', getWorkouts);

router.get('/:id', getWorkout);

router.patch('/:id', updateWorkout);

router.delete('/:id', deleteWorkout);


module.exports =router;