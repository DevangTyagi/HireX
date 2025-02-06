import CreatedApplication from "@/components/CreatedApplication";
import CreatedJobs from "@/components/CreatedJobs";
import { useUser } from "@clerk/clerk-react";
import React from "react";

function Myjobs() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Application"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? <CreatedApplication/> : <CreatedJobs/>}
    </div>
  );
}

export default Myjobs;
