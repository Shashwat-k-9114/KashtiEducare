import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Shell } from "@/components/admin/Shell";
import { COOKIE, verifySession } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  // The proxy already gates /admin; checking again here means a mistake in one layer can't expose the portal.
  if (!(await verifySession((await cookies()).get(COOKIE)?.value))) redirect("/admin/login");
  return <Shell>{children}</Shell>;
}
