import Teams from "../Teams/Teams";

const Dashboard = ({ user}) => {
    return(
        <main>
            <h1>Welcome, {user.username}</h1>
            <p>
                This page is only visible if you are signed in
            </p>
            <div className="teams">
                <Teams user={user}/>
            </div>
        </main>
    )
};


export default Dashboard