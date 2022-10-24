import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistance from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails=({workout})=>{
    const {dispatch}=useWorkoutsContext();
    const {user}=useAuthContext();
    const handleDelete=async()=>{
        if(!user){
            return
        }
        const response=await fetch('/api/workouts/'+workout._id,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`
            },
        });
        const json=await response.json();
        if(response.ok){dispatch({type:'DELETE_WORKOUT',payload:json})}

    }
    return(
        <div>      
            {user &&(
                <div className="workout-details">
                    <h4>{workout.title}</h4>
                    <p><strong>Load (kg):</strong>{workout.load}</p>
                    <p><strong>Reps:</strong>{workout.reps}</p>
                    <p>{formatDistance(new Date(workout.createdAt),{addSuffix:true})}</p>
                    <div onClick={handleDelete} className="ui vertical animated button" style={{float: "right", marginTop:"-35px"}}>
                        <div className="hidden content">Delete</div>
                        <div className="visible content">
                            <i className="trash icon"></i>
                        </div>
                    </div>
                </div>
            )}
        </div>
        

    )
}

export default WorkoutDetails;