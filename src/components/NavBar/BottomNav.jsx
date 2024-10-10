import { Link } from "react-router-dom";


const BottomNav = ({ user }) => {
    return (
        <>
        { user ? (
            <></>
        ) : (
        <nav>
            <ul>
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </ul>
        </nav>
    )}
    </>
)
}

export default BottomNav