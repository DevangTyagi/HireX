import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Boxes,
  BriefcaseBusiness,
  BriefcaseBusinessIcon,
  Download,
  School,
} from "lucide-react";
import usefetch from "@/hooks/usefetch";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateApplicationStatus } from "@/api/api_applications";

function ApplicationCard({ application, isCandidate = false }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { fn: fnHiringstatus, loading: loadingApplicationstatus } = usefetch(
    updateApplicationStatus,
    { job_id: application.job_id ,
        application_id : application.id
    }
  );

  const handleStatusChange = (status) => {
    fnHiringstatus(status);
  };

  return (
    <Card>
      {loadingApplicationstatus && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.Company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-4 ">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <BriefcaseBusinessIcon size={16} />
            {application?.experience} years of experience
          </div>
          <div className="flex gap-2 items-center">
            <Boxes size={16} />
            Skills : {application?.skills}
          </div>
          <div className="flex gap-2 items-center">
            <School size={16} />
            {application?.education}
          </div>
        </div>
        <hr />
      </CardContent>

      <CardFooter className="flex justify-between">
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className="capitalize font-bold">
            {" "}
            Status : {application?.status}
          </span>
        ) : (
          <Select onValueChange={handleStatusChange} defaultValue={application.status}>
            <SelectTrigger className="w-52">
              <SelectValue
                placeholder={
                 "Application Status"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
}

export default ApplicationCard;
