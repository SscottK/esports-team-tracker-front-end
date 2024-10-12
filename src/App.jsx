import { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authServices'
import BottomNav from './components/NavBar/BottomNav';
import Team from './components/Team/Team';
import EditTeam from './components/Team/EditTeam';


const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [preparedData, setPreparedData] = useState(null);
  
  
  

    useEffect(() => {
    const prepareUserData = async () => {
        const userData = await authService.getUserData(user)
        console.log(userData);
        
        setPreparedData(userData)
        
        
    }
    if (user) prepareUserData();
    
    }, [user])

  const handleSignout = () => {
    authService.signOut()
    setUser(null)
  }

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout}/>
      <Routes>
        { user ? (
          <Route path="/" element={<Dashboard user={user} preparedData={preparedData}/>} />
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser}/>} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        <Route path="/teams/:teamId" element={<Team user={user} />} />
        <Route path="/times/:userId/" element={<h1>User times page</h1>} />
        <Route path="/teams/:teamId/edit" element={<EditTeam user={user} />} />

      </Routes>
      <BottomNav user={user} />
    </>
  )
}

export default App
