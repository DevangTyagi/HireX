import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {isSignedIn , user , isLoaded} = useUser();
    const {pathname} = useLocation();

    if (!isLoaded) {
        return null; 
      }
    if(isLoaded && !isSignedIn && isSignedIn!==undefined){
      return <Navigate to="https://hirex-nine.vercel.app/?sign-in=true" />
    }

    if (
        user !== undefined &&
        !user?.unsafeMetadata?.role &&
        pathname !== "/onboarding"
      )
        return <Navigate to="/onboarding" />;


    return children;
}

export default ProtectedRoute
