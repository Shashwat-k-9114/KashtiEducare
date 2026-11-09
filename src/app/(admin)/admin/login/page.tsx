import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, adminConfigured, verifySession } from "@/lib/admin/auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await verifySession((await cookies()).get(COOKIE)?.value)) redirect("/admin");
  return (
    <div className="a-login">
      <section className="a-login-art">
        <a className="a-brand" href="/" aria-label="Kashti Educare">
          <img src="/brand/logo.jpg" alt="Kashti Educare" width={740} height={360} />
        </a>
        <div>
          <span className="a-script">Real world · Real learning · Real impact</span>
          <h1>Run the site, <em>your way.</em></h1>
          <p>Edit programmes, people, partners and stories, and follow every enquiry that comes in, all from one place.</p>
        </div>
        <p style={{ margin: 0, fontSize: ".85rem", opacity: 0.8 }}>© 2026 Kashti Educare · Admin portal</p>
      </section>
      <section className="a-login-form">
        <div className="a-login-card">
          <div>
            <span className="a-eyebrow">Admin portal</span>
            <h2>Welcome back</h2>
            <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>Enter the admin password to continue.</p>
          </div>
          {!adminConfigured() ? (
            <div className="a-alert warn">Not set up yet: add ADMIN_PASSWORD and ADMIN_SESSION_SECRET to the environment variables.</div>
          ) : null}
          <LoginForm />
        </div>
      </section>
    </div>
  );
}
