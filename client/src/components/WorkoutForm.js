import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {useAuthContext} from '../hooks/useAuthContext';
const WorkoutForm=()=>{
    const [title, setTitle]=useState('');
    const [reps, setReps]=useState('');
    const [load, setLoad]=useState('');
    const [error, setError]=useState(null);
    const {dispatch}=useWorkoutsContext();
    const {user}=useAuthContext();
    const handleNewWorkout=async (e)=>{
        e.preventDefault();
        const workout={title, reps,load};
        const response=await fetch('/api/workouts',{
            method:'POST',           
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body:JSON.stringify(workout)
        })
        const json =await response.json();
        if(!response.ok){setError(json.error);}
        if(response.ok){
            setTitle(''); setReps(''); setLoad(''); setError(null);
            dispatch({type:"CREATE_WORKOUT", payload:json});
        }
    }

   
    return(
        <div>

        
       {user && <form onSubmit={handleNewWorkout} className='create'>
       <div className="workout-details ">
           <h3>Add a new workout</h3>
           <label>Excersize Title:</label>
           <input type='text'  value={title} onChange={(e)=>setTitle(e.target.value)}></input>
           <label>Reps:</label>
           <input type='number'  min="0" value={reps} onChange={(e)=>setReps(e.target.value)}></input>
           <label>Load (kg):</label>
           <input type='number' min="0" value={load} onChange={(e)=>setLoad(e.target.value)}></input>
           <button>Add workout</button>
           {error && <div className="error">{error}</div>}
       </div> 
   </form>
    }
        </div>
        
           
    )
}

export default WorkoutForm;