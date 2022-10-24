const Workout=require('../models/WorkoutModel');
const mongoose=require('mongoose');

const createWorkout=async (req, res)=>{
    const {title, reps, load}=req.body;

    try{
        const userId=req.user._id;
        const workout= await Workout.create(
            {userId, title, reps, load}
        )
        res.status(200).json(workout);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const getWorkouts=async(req, res)=>{
    const userId=req.user._id;
    const workouts=await Workout.find({userId}).sort({createdAt: -1});

    res.status(200).json(workouts);
}

const getWorkout=async(req, res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {return res.status(404).json({error:'workout bulunmuyor'})};

    const workout=await Workout.findById(id);

    if(!workout){return res.status(404).json({error:'workout bulunmuyor'})};

    res.status(200).json(workout);
}

const updateWorkout=async(req,res)=>{
    const {id} =req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
    {return res.status(404).json({error:'workout bulunmuyor'})};

    const workout=await Workout.findOneAndUpdate({_id:id},);

    if(!workout){
        return res.status(400).json({error: 'workout bulunmuyor'});
    }

    res.status(200).json(workout);
}

const deleteWorkout=async(req, res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {return res.status(404).json({error:'workout bulunmuyor'})};

    const workout=await Workout.findOneAndDelete({_id: id}, {...req.body});

    if(!workout){
        return res.status(400).json({error: 'workout bulunmuyor'});
    }

    res.status(200).json(workout);
}



module.exports={
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout,
}