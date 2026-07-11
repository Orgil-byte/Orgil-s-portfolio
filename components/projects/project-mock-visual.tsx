import type { ProjectVisual } from "@/data/projects";

export function ProjectMockVisual({
  variant,
  compact = false,
}: Readonly<{ variant: ProjectVisual; compact?: boolean }>) {
  return (
    <div
      aria-hidden="true"
      className={`project-mock project-mock--${variant} ${compact ? "project-mock--compact" : ""}`}
    >
      <div className="project-mock__bar">
        <span>OU / LAB</span>
        <span>{variant === "grading" ? "REVIEW" : "WORKSPACE"}</span>
      </div>

      {variant === "workspace" && (
        <div className="project-mock__workspace">
          <aside>
            <strong>KNOWSPACE</strong>
            <span className="is-active">All sources</span>
            <span>Research.pdf</span>
            <span>Product notes</span>
            <span>Decisions</span>
          </aside>
          <div className="project-mock__answer">
            <small>ASK THE WORKSPACE</small>
            <p>How does the source policy affect document access?</p>
            <div className="project-mock__response">
              Access follows workspace roles and remains traceable to the
              original source.
            </div>
            <div className="project-mock__sources">
              <span>[01] POLICY.PDF</span>
              <span>[02] NOTES.MD</span>
            </div>
          </div>
        </div>
      )}

      {variant === "grading" && (
        <div className="project-mock__grading">
          <div className="project-mock__scan">
            <small>EXAM / 024</small>
            {["A", "C", "B", "D", "A"].map((answer, index) => (
              <span key={index}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {answer}
              </span>
            ))}
          </div>
          <div className="project-mock__score">
            <span className="project-mock__processing">AI REVIEW / 86%</span>
            <strong>18 / 20</strong>
            <div>
              <span>Question</span>
              <span>Confidence</span>
              <span>Score</span>
              <span>04</span>
              <span>Review</span>
              <span>0</span>
              <span>05</span>
              <span>High</span>
              <span>2</span>
            </div>
          </div>
        </div>
      )}

      {variant === "rag" && (
        <div className="project-mock__rag">
          <div className="project-mock__nodes">
            <span>WORKSPACE</span>
            <i />
            <span>DOCUMENTS</span>
            <i />
            <span>RETRIEVAL</span>
          </div>
          <div className="project-mock__chat">
            <small>PINEQUEST / SHARED ASSISTANT</small>
            <p>Summarize the onboarding decision and show the sources.</p>
            <div>
              <span>ANSWER</span>
              <strong>3 SOURCE REFERENCES</strong>
            </div>
          </div>
        </div>
      )}

      <div className="project-mock__footer">
        <span>PROTOTYPE INTERFACE</span>
        <span>ORGIL ULZIITOGTOKH</span>
      </div>
    </div>
  );
}
