import {useState} from 'react';
import {useSignin} from '../hooks/useSignin'

const Signin=()=>{
    const [email, setEmail]=useState('');
    const [password, setPass]=useState('');
    const {signin, error, isLoading}=useSignin();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await signin(email, password);
    }
    return(
        <form onSubmit={handleSubmit} className='login'>
            <h3>Sign in</h3>
            <label>Email</label>
            <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <label>Şifre</label>
            <input type='password' onChange={(e)=>setPass(e.target.value)} value={password}></input>
            <button disabled={isLoading}>Sign in</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
export default Signin;