import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { shadesOfPurple } from "@clerk/themes";
const afterSignInUrl = import.meta.env.VITE_AFTER_SIGN_IN_URL;
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
      publishableKey={PUBLISHABLE_KEY}
      signIn={{ afterSignInUrl: afterSignInUrl }}
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);

// import { ClerkProvider } from "@clerk/clerk-react";

// function App({ children }) {
//   const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
//   const afterSignInUrl = import.meta.env.VITE_AFTER_SIGN_IN_URL;

//   return (
//     <ClerkProvider
//       publishableKey={clerkPubKey}
//       signIn={{ afterSignInUrl: afterSignInUrl }}
//     >
//       {children}
//     </ClerkProvider>
//   );
// }

export default App;
