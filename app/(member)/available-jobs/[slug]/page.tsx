import React from "react";
import { PageHeader } from "../../_components/PageHeader";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { NairaIcon } from "@/components/NairaIcon";
import { getDefaultClassNames } from "react-day-picker";
import { JobCTAs } from "./_components/JobCTAs";
import { ProofForm } from "./_components/ProofForm";
import { EMAIL_ADDRESS } from "@/constants";

const page = () => {
  return (
    <div className="py-12">
      <div className="container">
        <PageHeader title="Job Details" />
        <div className="space-y-4 mt-4">
          <p className="text-base">
            Job title:{" "}
            <span className="text-muted-foreground">App store review</span>
          </p>
          <p className="text-base">
            Job ID: <span className="text-muted-foreground">ES21089</span>
          </p>
          <p className="text-base">
            Job Description:
            <span className="text-muted-foreground">
              {" "}
              You're required to download the SmartBudget Tracker on App Store,
              explore its features for a few minutes, and leave a short, honest
              review on the app store. This job is for genuine users only —
              avoid spam or generic feedback.  We encourage you to mention
              specific features you found useful, any improvements you’d
              suggest, or your overall experience with the app. Once your review
              is submitted and visible on the app store, kindly upload a
              screenshot of your live review along with proof that the app is
              installed on your device. To maintain quality, only submissions
              with a 4-star rating or above and thoughtful feedback will be
              approved.
            </span>
          </p>
          <p className="text-base">
            Job Type:{" "}
            <span className="text-primary hover:underline">Micro-Job</span>
          </p>
          <p className="text-base">
            Job Category:{" "}
            <span className="text-muted-foreground">App Promotion</span>
          </p>
          <p className="text-base">
            Job Poster:{" "}
            <span className="text-blue-400 underline hover:text-primary">
              Adam Sandler
            </span>
          </p>
          <p className="text-base">
            Job Link:{" "}
            <span className="text-blue-400 hover:underline hover:text-primary">
              https://earnsphere.com/job/one{" "}
              <CopyToClipboard text={"https://earnsphere.com/job/one"} />
            </span>
          </p>
          <p className="text-base">
            Reward:{" "}
            <span className="text-muted-foreground">
              <NairaIcon />
              200.00
            </span>
          </p>
          <p className="text-base">
            Time Estimate:{" "}
            <span className="text-muted-foreground">6-8 minutes</span>
          </p>
          <p className="text-base">
            Available Slots:{" "}
            <span className="text-muted-foreground">49 remaining</span>
          </p>
          <p className="text-base">
            Status: <span className="text-primary">Open</span>
          </p>
          <p className="text-base">Submission Deadline: 23 Movember, 2025</p>
        </div>
        <div className="mt-6">
          <p className="text-base text-muted-foreground">
            Clicking on Start Job indicates your interest in the task and you
            will be counted in as an applicant.{" "}
          </p>
          <JobCTAs />
        </div>
        <div className="mt-6">
          <h2 className="font-semibold text-xl md:text-2xl">Instructions</h2>
          <ul className="space-y-2 mt-2 text-base">
            <li>1. Click on the job link and install the app.</li>
            <li>2. Explore the features for at least 3 minutes.</li>
            <li>
              3. Leave a genuine review (mention what you liked or what could be
              improved).
            </li>
            <li>4. Give a 4-star rating or higher.</li>
            <li>5. Take a screenshot of your review once it goes live.</li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold text-xl md:text-2xl">
            Proof of Completion
          </h2>
          <p className="text-base text-muted-foreground">You must upload:</p>
          <ul className="space-y-2 mt-2 text-base list-disc list-inside">
            <li>Screenshot of your review on the app store</li>
            <li>Optional: Screenshot of the installed app on your device</li>
          </ul>
          <ProofForm />
        </div>
        <div className="mt-10 space-y-2.5 text-base">
          <p>Please follow instructions exactly as stated.</p>
          <p>
            Only complete the task as described—no extras. Submit the required
            proof once done. Job posters will review your submissions within 7
            days. Wrong or incomplete entries affect your rating and may lead to
            blacklisting.
          </p>
          <p>
            Respect all job posters and fellow users. If you notice suspicious
            activity or are asked to do more than what’s listed, report it
            immediately with the job ID to:{" "}
            <a
              className="text-primary hover:underline"
              href={`mailto:${EMAIL_ADDRESS}`}
            >
              {EMAIL_ADDRESS}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
