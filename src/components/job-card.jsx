import { useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { deleteJob, saveJobs } from "@/api/api_jobs";
import usefetch from "@/hooks/usefetch";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
const JobCard = ({
  job,
  isMyJob = false,
  savedinit = false,
  onjobsaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedinit);
  const { user } = useUser();
  const { loading: loadingDeleteJob, fn: fnDeleteJob } = usefetch(deleteJob, {
    job_id: job.id,
  });

  const {
    fn: fnsavedjobs,
    data: savedjobs,
    loading: loadingsavedjobs,
  } = usefetch(saveJobs, { alreadySaved: saved });

  useEffect(() => {
    if (savedjobs !== undefined) setSaved(savedjobs?.length > 0);
  }, [savedjobs]);

  const handleDeleteJob = async () => {
    await fnDeleteJob()
    onjobsaved();
    
  };

  const handleSaveJob = async () => {
    await fnsavedjobs({
      user_id: user.id,
      job_id: job.id,
    });
    onjobsaved();
  };

  return (
    <Card className="flex flex-col">
      {loadingDeleteJob && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-pink-300 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.Company && <img src={job.Company.logo_url} className="h-6" />}
          <div className=" flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/jobs/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingsavedjobs}
          >
            {saved ? (
              <HeartIcon size={20} stroke="red" fill="red" />
            ) : (
              <HeartIcon size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
