import { getCompanies } from "@/api/api_companies";
import { getJobs } from "@/api/api_jobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import usefetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

const Joblisting = () => {
  const [location, setlocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnjobs,
    data: jobs,
    loading: loadingjobs,
  } = usefetch(getJobs, { location, company_id, searchQuery });

  const { fn: fnCompanies, data: companies } = usefetch(getCompanies);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-Query");
    if (query) setSearchQuery(query);
  };

  const Clearfilters = () => {
    setlocation("");
    setCompany_id("")
    setSearchQuery("")
  }
  // console.log(jobs);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnjobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div >
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 ">
        Latest Jobs
      </h1>

      {/* {add filters} */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3 "
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          name="search-Query"
          className="h-full flex-1 px-4 text-md"
          // onChange={handleInputChange}
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setlocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies && companies.length > 0 ? (
                companies.map(({ name, id }) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))
              ) : (
                <div>No Companies Available</div> // Fallback message
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="destructive" className="w-1/2" onClick = {Clearfilters}>
            Clear Filters
        </Button>
      </div>

      {loadingjobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingjobs === false && (
<div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedinit={job?.saved?.length > 0}
                />
              );        
            })
          ) : (
            <div> No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Joblisting;
