import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile.js';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
function Home() {

  const { isLoading, err } = useAuth0();

  return (
    <>
      
      {err && <p>Authentication Error</p>}
      {!err && isLoading && <p>Loading...</p>}
      {!err && !isLoading && (
        <>
          
            <LoginButton />
            <LogoutButton />
            <Profile />
         
        </>
      )}
     
      
    </>
  );
}

export default Home;
