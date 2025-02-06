import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
function LandingPage() {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 ">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Discover a world of possibilities
          <span className="flex item-center gap-2 sm:gap-6">
            & let{" "}
            <img
              src="src\assets\Gold_logo_2.png"
              alt="logo"
              className="h-11 sm:h-16 lg:h-28"
            />
          </span>{" "}
          <span className="tracking-tighter">take you there</span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      <div className="flex item-center justify-center gap-10">
        <Link to={"/jobs"}>
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10 -z-10">
        <CarouselContent className="flex gap-5 sm:gap-20 item-center">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img src={path} className="h-9 sm:h-14 object-contain" />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <img src="src/assets/Hirex Banner.png" alt="banner" className="w-full" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Jobs Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for Jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post Jobs, manage applications, and find the Best Candidate</p>
          </CardContent>
        </Card>
      </section>

      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
}

export default LandingPage;
