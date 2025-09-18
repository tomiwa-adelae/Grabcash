// // "use client";
// // import { Button } from "@/components/ui/button";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { EllipsisIcon } from "lucide-react";
// // import Link from "next/link";
// // import { RejectSubmissionModal } from "./RejectSubmissionModal";
// // import { useState, useTransition } from "react";
// // import { GetJobApplicantsType } from "@/app/data/user/job/submitted/get-job-applicants";
// // import { approveApplication } from "../actions";
// // import { tryCatch } from "@/hooks/use-try-catch";
// // import { toast } from "sonner";
// // import { Loader } from "@/components/Loader";

// // interface Props {
// //   applicant: GetJobApplicantsType;
// //   slug: string;
// // }

// // export const SubmissionActions = ({ slug, applicant }: Props) => {
// //   const [pending, startTransition] = useTransition();

// //   const [openRejectModal, setOpenRejectModal] = useState(false);

// //   const handleApproveSubmission = () => {
// //     startTransition(async () => {
// //       const { data: result, error } = await tryCatch(
// //         approveApplication(applicant.id, slug)
// //       );

// //       if (error) {
// //         toast.error(error.message || "Oops! Internal server error");
// //         return;
// //       }

// //       if (result?.status === "success") {
// //         toast.success(result.message);
// //       } else {
// //         toast.error(result.message);
// //       }
// //     });
// //   };

// //   return (
// //     <>
// //       <DropdownMenu>
// //         <DropdownMenuTrigger
// //           asChild
// //           onClick={(e) => {
// //             e.stopPropagation(); // This prevents the row click
// //             e.preventDefault(); // Optional: prevents any default behavior
// //           }}
// //         >
// //           <Button
// //             size="icon"
// //             variant="outline"
// //             className="rounded-full shadow-none"
// //             aria-label="Open edit menu"
// //             onClick={(e) => {
// //               e.stopPropagation(); // This prevents the row click
// //               e.preventDefault(); // Optional: prevents any default behavior
// //             }}
// //           >
// //             <EllipsisIcon size={16} aria-hidden="true" />
// //           </Button>
// //         </DropdownMenuTrigger>
// //         <DropdownMenuContent
// //           align="end"
// //           onClick={(e) => e.stopPropagation()} // Also prevent clicks inside dropdown from bubbling
// //         >
// //           <DropdownMenuItem asChild>
// //             <Link
// //               href={`/jobs/${slug}/submissions/${applicant.id}`}
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               View Submission
// //             </Link>
// //           </DropdownMenuItem>
// //           {applicant.status === "PENDING" && (
// //             <>
// //               <DropdownMenuItem
// //                 disabled={pending}
// //                 onSelect={(e) => {
// //                   e.preventDefault();
// //                   e.stopPropagation();
// //                   handleApproveSubmission();
// //                 }}
// //               >
// //                 {pending ? (
// //                   <Loader text="Approving..." />
// //                 ) : (
// //                   "Approve submission"
// //                 )}
// //               </DropdownMenuItem>
// //               <DropdownMenuItem
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   setOpenRejectModal(true);
// //                   console.log(applicant);
// //                 }}
// //               >
// //                 Reject submission
// //               </DropdownMenuItem>
// //             </>
// //           )}
// //         </DropdownMenuContent>
// //       </DropdownMenu>
// //       {openRejectModal && (
// //         <RejectSubmissionModal
// //           open={openRejectModal}
// //           closeModal={() => setOpenRejectModal(false)}
// //           applicantName={applicant?.User.name!}
// //           jobTitle={applicant?.Job.title!}
// //           slug={slug}
// //           applicantId={applicant?.id!}
// //         />
// //       )}
// //     </>
// //   );
// // };

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { EllipsisIcon } from "lucide-react";
// import Link from "next/link";
// import { RejectSubmissionModal } from "./RejectSubmissionModal";
// import { useState, useTransition } from "react";
// import { GetJobApplicantsType } from "@/app/data/user/job/submitted/get-job-applicants";
// import { approveApplication } from "../actions";
// import { tryCatch } from "@/hooks/use-try-catch";
// import { toast } from "sonner";
// import { Loader } from "@/components/Loader";

// interface Props {
//   applicant: GetJobApplicantsType;
//   slug: string;
// }

// export const SubmissionActions = ({ slug, applicant }: Props) => {
//   const [pending, startTransition] = useTransition();
//   const [openRejectModal, setOpenRejectModal] = useState(false);

//   const handleApproveSubmission = () => {
//     startTransition(async () => {
//       const { data: result, error } = await tryCatch(
//         approveApplication(applicant.id, slug)
//       );

//       if (error) {
//         toast.error(error.message || "Oops! Internal server error");
//         return;
//       }

//       if (result?.status === "success") {
//         toast.success(result.message);
//       } else {
//         toast.error(result.message);
//       }
//     });
//   };

//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             size="icon"
//             variant="outline"
//             className="rounded-full shadow-none"
//             aria-label="Open edit menu"
//             onClick={(e) => {
//               e.stopPropagation(); // This prevents the row click
//               e.preventDefault(); // Optional: prevents any default behavior
//             }}
//           >
//             <EllipsisIcon size={16} aria-hidden="true" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent
//           align="end"
//           onClick={(e) => e.stopPropagation()} // Also prevent clicks inside dropdown from bubbling
//         >
//           <DropdownMenuItem asChild>
//             <Link
//               href={`/jobs/${slug}/submissions/${applicant.id}`}
//               onClick={(e) => e.stopPropagation()}
//             >
//               View Submission
//             </Link>
//           </DropdownMenuItem>
//           {applicant.status === "PENDING" && (
//             <>
//               <DropdownMenuItem
//                 disabled={pending}
//                 onSelect={(e) => {
//                   e.preventDefault();
//                   handleApproveSubmission();
//                 }}
//               >
//                 {pending ? (
//                   <Loader text="Approving..." />
//                 ) : (
//                   "Approve submission"
//                 )}
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onSelect={(e) => {
//                   e.preventDefault();
//                   setOpenRejectModal(true);
//                 }}
//               >
//                 Reject submission
//               </DropdownMenuItem>
//             </>
//           )}
//         </DropdownMenuContent>
//       </DropdownMenu>
//       {openRejectModal && (
//         <RejectSubmissionModal
//           open={openRejectModal}
//           closeModal={() => setOpenRejectModal(false)}
//           applicantName={applicant?.User.name!}
//           jobTitle={applicant?.Job.title!}
//           slug={slug}
//           applicantId={applicant?.id!}
//         />
//       )}
//     </>
//   );
// };

"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { GetJobApplicantsType } from "@/app/data/user/job/submitted/get-job-applicants";
import { approveApplication } from "../actions";
import { tryCatch } from "@/hooks/use-try-catch";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";

interface Props {
  applicant: GetJobApplicantsType;
  slug: string;
  onReject?: () => void; // Callback to handle reject modal
}

export const SubmissionActions = ({ slug, applicant, onReject }: Props) => {
  const [pending, startTransition] = useTransition();

  const handleApproveSubmission = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        approveApplication(applicant.id, slug)
      );

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <EllipsisIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem asChild>
          <Link
            href={`/jobs/${slug}/submissions/${applicant.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            View Submission
          </Link>
        </DropdownMenuItem>
        {applicant.status === "PENDING" && (
          <>
            <DropdownMenuItem
              disabled={pending}
              onSelect={(e) => {
                e.preventDefault();
                handleApproveSubmission();
              }}
            >
              {pending ? <Loader text="Approving..." /> : "Approve submission"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                onReject?.(); // Call the parent's reject handler
              }}
            >
              Reject submission
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
