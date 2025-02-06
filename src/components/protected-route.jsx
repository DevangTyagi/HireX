import { useSignIn, useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();
  const { signIn } = useSignIn();

  if (!isLoaded) {
    return null;
  }
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    signIn.redirectToSignIn({ returnBackUrl: pathname });
    return null;
  }

  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  )
    return <Navigate to="/onboarding" />;

  return children;
};

export default ProtectedRoute;
