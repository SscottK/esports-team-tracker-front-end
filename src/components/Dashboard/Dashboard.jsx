const Dashboard = ({ user}) => {
    return(
        <main>
            <h1>Welcome, {user.name}</h1>
            <p>
                This page is only visible if you are signed in
            </p>
        </main>
    )
};


export default Dashboard