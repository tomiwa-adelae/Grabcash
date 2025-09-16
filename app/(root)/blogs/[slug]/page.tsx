import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container py-16 md:py-32">
      <div className="text-center md:w-5/6 mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
          5 Simple Ways to Boost Your Earnings on Earnsphere in Just 7 Days
        </h1>
        <p className="text-muted-foreground text-base mt-4">
          Whether you’re new to Earnsphere or have been posting jobs and
          bounties for a while, the truth is—small tweaks can lead to big gains.
          In this post, we’ll share five practical, beginner-friendly strategies
          to help you get more done, earn more, and attract better opportunities
          within a single week.
        </p>

        <p className="text-base text-primary font-medium uppercase italic mt-6">
          EARNING & OPPORTUNITIES
        </p>
        <Image
          src={"/assets/images/blog-one-img.jpg"}
          alt="Blog image"
          width={1000}
          height={1000}
          className="aspect-video size-full object-cover rounded-lg mt-6"
        />
        <div className="text-sm mt-6">
          <span>August 2, 2025</span> <Dot className="inline-block" />{" "}
          <span className="text-muted-foreground">3 minutes read</span>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-base mt-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. In adipisci,
          eaque optio tenetur ullam rem asperiores debitis nihil nemo eos
          eligendi facilis, aperiam cum laudantium deserunt voluptatem
          voluptatibus eius possimus facere saepe quos praesentium nobis
          perferendis! Natus possimus modi et molestias in veritatis repellendus
          adipisci iste alias. Perferendis repellat, blanditiis vel nostrum
          magni natus officiis consequatur maiores recusandae praesentium, odit
          illum aliquid nihil provident impedit commodi molestiae, voluptatem
          tenetur beatae? Ipsum sequi earum, numquam praesentium laborum iure
          laboriosam eligendi consectetur veniam similique commodi facilis
          libero enim. Tempore, magnam ipsam. Voluptatem officiis debitis fugiat
          nihil repellat voluptate eaque eius! Dolorum placeat explicabo
          voluptatum! Perspiciatis quas nemo repudiandae harum facilis iure
          maiores, quisquam magni vel unde expedita corrupti veritatis maxime
          temporibus nesciunt nihil vitae magnam. Doloribus, sequi ullam
          adipisci blanditiis sed eum ipsam debitis suscipit fuga veritatis ea
          in accusantium, beatae perferendis dolore modi vitae dicta eveniet
          necessitatibus. Quia eum delectus, eaque velit dolores ipsa eos. Modi,
          possimus ipsa corporis ducimus esse deserunt, pariatur accusantium,
          non maiores nesciunt eius voluptates! Consequatur sed dolore
          dignissimos qui quaerat commodi sint! Vitae voluptate, corrupti dolore
          adipisci ipsa, quasi iusto in minima harum id doloremque! Consequatur
          explicabo quos sit voluptates nostrum molestiae eveniet culpa id cum.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          voluptas blanditiis aliquid voluptatum cumque fugit odit excepturi
          odio molestias modi, autem expedita quos, atque consequatur. Id harum
          sunt cupiditate aliquid aspernatur eligendi, nobis molestiae, qui
          asperiores placeat repudiandae iste nisi assumenda! Laboriosam unde
          saepe velit voluptates ratione officia rem ipsa fuga blanditiis,
          accusamus odit quibusdam corporis enim in, voluptas provident dicta
          molestias! Voluptate nulla atque, eos iusto ad reprehenderit possimus
          minus tempore obcaecati deleniti animi, expedita quas facere
          laudantium voluptatem. Numquam ex placeat et, sequi expedita ad nobis
          quas quos, quibusdam iure harum accusamus eaque? Placeat, esse
          incidunt quia corporis modi nam dolorum alias totam doloribus,
          provident tempora. Debitis porro expedita magni, molestias sint
          aliquam alias aut veniam distinctio cumque! Sequi, sit eveniet ducimus
          natus asperiores ea eius officiis sint eaque mollitia porro molestiae,
          voluptatem nobis dolorum temporibus assumenda alias delectus error
          enim exercitationem deleniti amet. Qui quidem tempore nemo fuga
          aliquam. Consequuntur autem veniam libero rerum suscipit consectetur
          porro praesentium ratione natus ad ullam harum dicta quam, vitae,
          quisquam sunt mollitia velit asperiores. Quidem quod ipsam corrupti
          labore? Ea dignissimos laboriosam, consequuntur totam expedita quidem
          suscipit amet et in nemo. Ipsam harum cum esse exercitationem, quasi
          fuga alias dolores?
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="font-medium text-base">See more articles</p>
        <Button size="md" asChild variant={"ghost"}>
          <Link href="/" className="underline hover:text-primary text-primary">
            Earning & Opporturnities
          </Link>
        </Button>
      </div>
      <div className="bg-[#F3F7FA] rounded-lg mt-6 p-8">
        <div className="flex flex-col md:flex-row items-center justify-start gap-3 md:gap-6">
          <Image
            src={"/assets/images/user.webp"}
            alt="Tomiwa adelae"
            width={1000}
            height={1000}
            className="rounded-full size-[120px] md:size-[100px] object-cover"
          />
          <div className="space-y-1.5 text-center md:text-left">
            <div className="space-y-0.5">
              <h4 className="font-medium text-base underline">Sarah Adeyemi</h4>
              <p className="text-sm text-muted-foreground">
                Content & Community Strategist at Earnsphere
              </p>
            </div>
            <div className="text-sm flex items-center justify-center md:justify-start gap-4">
              <a className="text-primary underline" href="mailto:">
                Email
              </a>
              <a className="text-primary underline" href="mailto:">
                Linkedin
              </a>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground text-base mt-6">
          Sarah is passionate about simplifying the future of work. At
          Earnsphere, she creates content that helps users understand how to
          maximize opportunities, build income streams, and grow within the
          community. With a background in digital marketing and user engagement,
          she blends insights with storytelling to make learning about
          micro-jobs and bounties easy and inspiring. When she’s not writing,
          Sarah enjoys exploring productivity hacks and mentoring young
          freelancers.
        </p>
      </div>
    </div>
  );
};

export default page;
