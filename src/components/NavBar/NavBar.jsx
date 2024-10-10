import { Link } from "react-router-dom";

const NavBar = ({ user, handleSignout }) => {
    return (
        <>  
            { user ?( 
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
                </ul>
            </nav> 
            ) : (
                <></>
            )}           
        </>
            
    )
}

export default NavBar