import {useState} from 'react';
import {useSignup} from '../hooks/useSignup';
const Signup=()=>{
    const [email, setEmail]=useState('');
    const [password, setPass]=useState('');
    const {signup,isLoading, error}=useSignup();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await signup(email, password);
        setEmail('');
        setPass('');
    }
    return(
        <form onSubmit={handleSubmit} className='signup'>
            <h3>Sign up</h3>
            <label>Email</label>
            <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <label>Şifre</label>
            <input type='password' onChange={(e)=>setPass(e.target.value)} value={password}></input>
            <button disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
export default Signup;