import Teams from "../Teams/Teams";
import TimeForm from "../TimeForm/TimeForm"

const Dashboard = ({ user, preparedData}) => {
    return(
        <main>
            <h1>Welcome, {user.username}</h1>
            <p>
                This page is only visible if you are signed in
            </p>
            <div className="teams">
                <Teams user={user} preparedData={preparedData}/>
                <TimeForm user={user} />
            </div>
        </main>
    )
};


export default Dashboard