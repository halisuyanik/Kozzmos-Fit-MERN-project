import {Link} from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';


const Navbar =()=>{
    const {logout}=useLogout();
    const {user}=useAuthContext();
    const handleLogout=()=>{
        logout();
    }
    return(
        <header>
            <div className="container">
                <Link to='/'><h1>Kozzmos Fit</h1></Link>
                <nav>
                    {!user && (
                        <div>
                            <Link to='/signin'>Sign in</Link>
                            <Link to='/signup'>Sign up</Link>
                        </div>
                    )}
                    {user &&(
                        <div>
                            <span>{user.email}</span>                
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    )}
                </nav>
                
                
            </div>
        </header>
    )
}

export default Navbar;