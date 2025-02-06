import { getSingleJob, UpdateHiringStatus } from "@/api/api_jobs";
import ApplicationCard from "@/components/ApplicationCard";
import ApplyJobDrawer from "@/components/apply_job";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usefetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const JobePage = () => {
  const { user, isLoaded } = useUser();

  const { id } = useParams();
  const {
    fn: fnjob,
    data: job,
    loading: loadingjobs,
  } = usefetch(getSingleJob, { job_id: id });
  // console.log(job?.application)

  useEffect(() => {
    if (isLoaded) fnjob();
  }, [isLoaded]);

  const { loading: loadingHiringstatus, fn: fnHiringstatus } = usefetch(
    UpdateHiringStatus,
    { job_id: id }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "Open";
    fnHiringstatus(isOpen)
      .then(() => fnjob())
      .catch((error) => console.error("Error updating status:", error));
  };

  if (!isLoaded || loadingjobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex p-4 flex-col-reverse gap-6 md:flex-row justify-between item-center">
        <h1 className="gradient-title font-extrabold text-3xl text-center sm:text-5xl pb-3 ">
          {job?.title}
        </h1>
        <img
          src={job?.Company?.logo_url}
          className="h-12 w-auto object-contain"
          alt={job?.title}
        />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {job?.location}
        </div>

        <div className="flex gap-2">
          <Briefcase />
          {job?.application?.length} Applicants
        </div>

        <div className="flex gap-2">
          {job?.IsOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed />
              Closed
            </>
          )}
        </div>
      </div>

      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.IsOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status : " + (job?.IsOpen ? "(Open)" : "Closed")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the Job</h2>
      <p className="sm:text-lg">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are Looking For
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnjob}
          applied={job?.application.find((ap) => ap.candidate_id === user.id)}
        />
      )}
      {loadingHiringstatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.application?.length > 0 && job?.recruiter_id === user.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
          {job?.application?.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobePage;
