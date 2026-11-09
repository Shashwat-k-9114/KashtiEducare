import { SubmissionsView } from "@/components/admin/SubmissionsView";

export const metadata = { title: "Submissions" };
export const dynamic = "force-dynamic";

export default function SubmissionsPage() {
  return (
    <>
      <header className="a-head">
        <span className="a-eyebrow">Inbox</span>
        <h1>Form submissions</h1>
        <p>Every enquiry and newsletter sign-up from the website. Set a status, keep private notes, reply, or export to a spreadsheet.</p>
      </header>
      <SubmissionsView />
    </>
  );
}
