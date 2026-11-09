// Generated from legacy/index.html by scripts/convert.mjs
export function Cookie() {
  return (
    <>
      <div
        className="cookie"
        role="dialog"
        aria-live="polite"
        aria-label="Cookie preferences"
      >
        {" "}
        <p>
          {
            "We use cookies to understand how visitors use this site. Analytics only turns on if you say yes. Nothing is tracked until then. "
          }
          <a href="/contact">Questions? Contact us.</a>
        </p>{" "}
        <div className="btn-row">
          <button
            className="btn btn-outline btn-sm"
            type="button"
            data-consent="reject"
          >
            Reject
          </button>
          <button
            className="btn btn-primary btn-sm"
            type="button"
            data-consent="accept"
          >
            Accept
          </button>
        </div>{" "}
      </div>
    </>
  );
}
