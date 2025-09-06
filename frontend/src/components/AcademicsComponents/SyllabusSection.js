import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Download, Eye, FileText, AlertCircle, X } from "lucide-react";
import syllabusData from "../../data/syllabusData.json"; // adjust path if needed
import "../../styles/AcademicsStyles/Syllabus.css";

const noop = () => {};

/* Simple Modal (focus lock & body scroll lock basic) */
const Modal = ({ open, onClose = noop, title, children, footer }) => {
  const overlayRef = useRef();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // focus first focusable element inside modal
      const t = setTimeout(() => {
        const el = overlayRef.current?.querySelector("button, a, input, textarea, select");
        el?.focus();
      }, 50);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title || "Dialog"} ref={overlayRef}>
      <div className="modal-card" role="document">
        <header className="modal-header">
          <div className="modal-title">
            <FileText size={18} />
            <h3>{title}</h3>
          </div>
          <button className="icon-btn" aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        <div className="modal-body">{children}</div>

        {footer ? <div className="modal-footer">{footer}</div> : null}
      </div>
    </div>
  );
};

/* Custom simple Select using native select for accessibility + styling */
const StyledSelect = ({ value, onChange, options = [], id, ariaLabel }) => {
  return (
    <div className="styled-select">
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-label={ariaLabel}>
        {options.map((opt) => (
          <option key={opt.id || opt.value || opt} value={opt.id ?? opt.value ?? opt}>
            {opt.label ?? opt.name ?? opt}
          </option>
        ))}
      </select>
      <svg className="select-caret" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
        <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
};

const SyllabusSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("c23");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [searchAllCurricula, setSearchAllCurricula] = useState(false);

  const [previewSubject, setPreviewSubject] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState(null);

  const curricula = syllabusData?.curricula || [];

  const currentCurriculum = useMemo(
    () => curricula.find((c) => c.id === selectedCurriculum) || curricula[0] || { branches: [] },
    [curricula, selectedCurriculum]
  );

  const availableBranches = currentCurriculum?.branches || [];

  useEffect(() => {
    // set default branch when curriculum changes
    if (availableBranches.length > 0) {
      setSelectedBranch((prev) => (prev ? prev : availableBranches[0].id));
    } else {
      setSelectedBranch("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurriculum, availableBranches.length]);

  // Build filteredSubjects (same structure as prior: array of {id, name, subjects: [...] })
  const filteredSubjects = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();

    // Show branch semesters if no search and not searching all curricula
    if (!q && !searchAllCurricula) {
      const branch = availableBranches.find((b) => b.id === selectedBranch);
      return branch?.semesters || [];
    }

    if (searchAllCurricula) {
      const allSubjects = [];
      curricula.forEach((curr) => {
        curr.branches.forEach((br) => {
          br.semesters.forEach((sem) => {
            sem.subjects.forEach((sub) => {
              if (
                !q ||
                (sub.name && sub.name.toLowerCase().includes(q)) ||
                (sub.code && sub.code.toLowerCase().includes(q)) ||
                (sub.description && sub.description.toLowerCase().includes(q))
              ) {
                allSubjects.push({
                  ...sub,
                  curriculum: curr.code,
                  branch: br.code,
                  semester: sem.name,
                });
              }
            });
          });
        });
      });

      // group by curriculum-branch-semester
      const grouped = {};
      allSubjects.forEach((s) => {
        const key = `${s.curriculum}-${s.branch}-${s.semester}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(s);
      });

      return Object.entries(grouped).map(([key, subs]) => ({
        id: key,
        name: subs[0].semester,
        code: key,
        subjects: subs,
      }));
    } else {
      // search only within current branch
      const branch = availableBranches.find((b) => b.id === selectedBranch);
      if (!branch) return [];
      return branch.semesters
        .map((sem) => ({
          ...sem,
          subjects: sem.subjects.filter(
            (sub) =>
              (sub.name && sub.name.toLowerCase().includes(q)) ||
              (sub.code && sub.code.toLowerCase().includes(q)) ||
              (sub.description && sub.description.toLowerCase().includes(q))
          ),
        }))
        .filter((sem) => sem.subjects && sem.subjects.length > 0);
    }
  }, [searchQuery, searchAllCurricula, curricula, availableBranches, selectedBranch]);

  // Ensure selected tab is valid when filteredSubjects change
  useEffect(() => {
    if (filteredSubjects && filteredSubjects.length > 0) {
      setSelectedTab((prev) => {
        const exists = filteredSubjects.some((s) => s.id === prev);
        return exists ? prev : filteredSubjects[0].id;
      });
    } else {
      setSelectedTab(null);
    }
  }, [filteredSubjects]);

  const handlePreview = (subject) => {
    setPreviewSubject(subject);
    setIsPreviewOpen(true);
  };

  const handleDownload = (subject) => {
    if (subject?.syllabus_pdf) {
      window.open(subject.syllabus_pdf, "_blank", "noopener");
    }
  };

  /* UI components */
  const CurriculumPills = () => (
    <div className="pills-row" role="tablist" aria-label="Curriculum selection">
      {curricula.map((c) => {
        const active = selectedCurriculum === c.id && !searchAllCurricula;
        return (
          <button
            key={c.id}
            className={`pill ${active ? "pill-active" : ""}`}
            onClick={() => {
              setSelectedCurriculum(c.id);
              setSearchAllCurricula(false);
            }}
            aria-pressed={active}
          >
            {c.code}
          </button>
        );
      })}

      <button
        className={`pill pill-searchall ${searchAllCurricula ? "pill-active" : ""}`}
        onClick={() => {
          setSearchAllCurricula((s) => !s);
          if (!searchAllCurricula) {
            setSelectedTab(null);
          }
        }}
        aria-pressed={searchAllCurricula}
      >
        Search all curricula
      </button>
    </div>
  );

  const SubjectCard = ({ subject, showMetadata = false }) => {
    return (
      <article className="subject-card" aria-labelledby={`sub-${subject.id}`}>
        <div className="card-head">
          <h4 id={`sub-${subject.id}`} className="subject-name">
            {subject.name}
          </h4>
          {subject.description ? <p className="subject-desc">{subject.description}</p> : null}
        </div>

        <div className="card-meta">
          {showMetadata && subject.curriculum && <span className="chip">{subject.curriculum}</span>}
          {subject.code && <span className="chip subtle">{subject.code}</span>}
          {subject.version && <span className="meta-text">v{subject.version}</span>}
          {subject.last_updated && <span className="meta-text">Updated {new Date(subject.last_updated).toLocaleDateString()}</span>}
        </div>

        <div className="card-actions">
          {subject.syllabus_pdf ? (
            <>
              <button className="btn primary" onClick={() => handlePreview(subject)} aria-label={`Preview ${subject.name}`}>
                <Eye size={14} /> Preview
              </button>
              <button className="btn outline" onClick={() => handleDownload(subject)} aria-label={`Download ${subject.name}`}>
                <Download size={14} /> Download
              </button>
            </>
          ) : (
            <div className="missing-block">
              <div className="missing-left">
                <AlertCircle size={16} />
                <span className="missing-text">Syllabus not uploaded</span>
              </div>
              <button className="btn small" onClick={() => alert("Request sent to admin")}>
                Request
              </button>
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <section className="syllabus-root">
      <div className="container">
        <header className="page-header">
          <div>
            <h1 className="page-title">Syllabus</h1>
            <p className="page-sub">Find subject syllabi for your curriculum and branch. Preview or download PDFs quickly.</p>
          </div>

          <div className="search-wrap">
            <label htmlFor="syllabus-search" className="visually-hidden">Search syllabus</label>
            <div className="search-input">
              <Search size={16} />
              <input
                id="syllabus-search"
                type="search"
                placeholder="Search subjects, codes or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search syllabus"
              />
              {searchQuery ? (
                <button className="icon-clear" onClick={() => setSearchQuery("")} aria-label="Clear search">×</button>
              ) : null}
            </div>

            <div className="controls-inline">
              <CurriculumPills />
            </div>
          </div>
          </header>

        <div className="branch-row">
          {!searchAllCurricula && availableBranches.length > 0 ? (
            <>
              <label htmlFor="branch-select" className="small-label">Branch</label>
              <StyledSelect
                id="branch-select"
                ariaLabel="Select branch"
                value={selectedBranch}
                onChange={(v) => setSelectedBranch(v)}
                options={availableBranches.map((b) => ({ id: b.id, label: `${b.name} (${b.code})` }))}
              />
            </>
          ) : null}
        </div>

        <div className="content-area">
          {filteredSubjects.length === 0 ? (
            <div className="empty-state" role="status" aria-live="polite">
              <FileText size={56} className="muted-large" />
              <h3>{searchQuery ? `No results for “${searchQuery}”` : "No subjects available"}</h3>
              <p className="muted"> {searchQuery ? 'Try different keywords or enable "Search all curricula".' : "Select a branch to view available subjects."}</p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="tabs-row" role="tablist" aria-label="Semesters">
                {filteredSubjects.map((sem) => (
                  <button
                    key={sem.id}
                    role="tab"
                    aria-selected={selectedTab === sem.id}
                    className={`tab ${selectedTab === sem.id ? "tab-active" : ""}`}
                    onClick={() => setSelectedTab(sem.id)}
                  >
                    {sem.name}
                    <span className="tab-count">{sem.subjects?.length ?? 0}</span>
                  </button>
                ))}
              </div>

              {/* Tab panels */}
              <div className="tab-panels">
                {filteredSubjects.map((sem) => (
                  <div
                    key={sem.id}
                    role="tabpanel"
                    hidden={selectedTab !== sem.id}
                    aria-labelledby={`tab-${sem.id}`}
                    className="panel"
                  >
                    {selectedTab === sem.id && (
                      <div className="grid-subjects">
                        {sem.subjects.map((sub) => (
                          <SubjectCard subject={sub} showMetadata={searchAllCurricula} key={sub.id} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Preview modal */}
        <Modal
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={previewSubject?.name}
          footer={
            <div className="modal-actions">
              <button className="btn outline" onClick={() => setIsPreviewOpen(false)}><X size={14} /> Close</button>
              {previewSubject?.syllabus_pdf ? (
                <button className="btn primary" onClick={() => handleDownload(previewSubject)}><Download size={14} /> Download PDF</button>
              ) : null}
            </div>
          }
        >
          {previewSubject?.syllabus_pdf ? (
            <div className="pdf-frame-wrap">
              <iframe
                title={`${previewSubject.name} syllabus`}
                src={previewSubject.syllabus_pdf}
                className="pdf-iframe"
              />
            </div>
          ) : (
            <div className="empty-preview">
              <FileText size={48} />
              <p>PDF preview not available. You can download to view the file.</p>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default SyllabusSection;
