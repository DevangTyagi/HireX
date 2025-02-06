import { getApplications } from "@/api/api_applications";
import usefetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import ApplicationCard from "./ApplicationCard";
import { BarLoader } from "react-spinners";

function CreatedApplication() {
  const { user } = useUser();
  const {
    fn: fnapplication,
    data: applications,
    loading: loadingapplications,
  } = usefetch(getApplications, { user_id: user.id });

  useEffect(() => {
    fnapplication();
  }, []);

  if (loadingapplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate = {true}
          />
        );
      })}
    </div>
  );
}

export default CreatedApplication;
