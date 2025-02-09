import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, PenBox } from "lucide-react";
function Header() {
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("sign-in")) setshowsignin(true);
  }, [search]);

  const [showsignin, setshowsignin] = useState(false);
  const { user } = useUser();
  console.log(user)

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      setshowsignin(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between item-center">
        <Link>
          <img src="/Gold_logo_2.png" alt="logo" className="h-16" />
        </Link>
        <div className="flex gap-2 sm:gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setshowsignin(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full mt-3">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/saved-job"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showsignin && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlay}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
}

export default Header;
