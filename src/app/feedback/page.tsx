import type { Metadata } from "next";
import FeedbackForm from "@/components/feedback-form";

/* /feedback: the week-13 user test, handed to testers as a link.

   Not in the navigation and not in the sitemap, and robots are told to keep
   out: it is an instrument for a handful of invited people, not part of the
   reference site. Everything below the heading is the client form. */

export const metadata: Metadata = {
  title: "Help me test this site",
  description:
    "Six short tasks on Koi-dex, then a few questions. About fifteen minutes.",
  robots: { index: false, follow: false },
};

export default function FeedbackPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:px-8">
      <h1 className="font-pally text-3xl font-bold">Help me test this site</h1>
      <p className="mt-2 max-w-prose text-black/60">
        Six short tasks, then a few questions about how it went. About fifteen
        minutes, and you can stop whenever you like.
      </p>
      <div className="mt-8">
        <FeedbackForm />
      </div>
    </div>
  );
}
