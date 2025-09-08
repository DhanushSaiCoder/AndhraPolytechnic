import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Download, Eye, FileText, AlertCircle, X, ChevronDown } from "lucide-react";
import syllabusData from "../../data/syllabusData.json";
import "../../styles/AcademicsStyles/Syllabus.css";

const noop = () => {};

const Modal = ({ open, onClose = noop, title, children, footer }) => {
  const overlayRef = useRef();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => {
        overlayRef.current?.querySelector("button, a, input, textarea, select")?.focus();
      }, 50);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="syllabus__modal-overlay" role="dialog" aria-modal="true" aria-label={title || "Dialog"} ref={overlayRef}>
      <div className="syllabus__modal-card" role="document">
        <header className="syllabus__modal-header">
          <div className="syllabus__modal-title">
            <FileText size={18} />
            <h3>{title}</h3>
          </div>
          <button className="syllabus__icon-btn" aria-label="Close dialog" onClick={onClose}>
            <X size={20} />
          </button>
        </header>
        <div className="syllabus__modal-body">{children}</div>
        {footer && <div className="syllabus__modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

const StyledSelect = ({ value, onChange, options = [], id, ariaLabel, placeholder, disabled }) => (
  <div className="syllabus__select-wrapper">
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-label={ariaLabel} disabled={disabled}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.id || opt.value || opt} value={opt.id ?? opt.value ?? opt}>
          {opt.label ?? opt.name ?? opt}
        </option>
      ))}
    </select>
    <ChevronDown size={18} className="syllabus__select-caret" />
  </div>
);

const SyllabusSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("c23"); // Default to 'c23'
  const [selectedBranch, setSelectedBranch] = useState("");
  const [previewSubject, setPreviewSubject] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const curricula = useMemo(() => [
    { id: "all", code: "All Curricula", name: "All Curricula", branches: [] }, // New "All Curricula" option
    ...(syllabusData?.curricula || []),
  ], [syllabusData]);

  const isSearchingAllCurricula = selectedCurriculum === "all";

  const currentCurriculum = useMemo(
    () => curricula.find((c) => c.id === selectedCurriculum) || curricula[1] || { branches: [] }, // Skip 'all' option for default
    [curricula, selectedCurriculum]
  );

  const availableBranches = useMemo(() => {
    if (isSearchingAllCurricula) return [];
    return currentCurriculum?.branches || [];
  }, [isSearchingAllCurricula, currentCurriculum]);

  useEffect(() => {
    if (!isSearchingAllCurricula && availableBranches.length > 0 && !selectedBranch) {
      setSelectedBranch(availableBranches[0].id);
    } else if (isSearchingAllCurricula) {
      setSelectedBranch(""); // Clear branch selection when searching all curricula
    }
  }, [selectedCurriculum, availableBranches, selectedBranch, isSearchingAllCurricula]);

  const filteredSubjects = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();

    const filterSubjects = (subjects) =>
      subjects.filter(
        (sub) =>
          !q ||
          (sub.name && sub.name.toLowerCase().includes(q)) ||
          (sub.code && sub.code.toLowerCase().includes(q))
      );

    if (isSearchingAllCurricula) {
      const allSubjects = [];
      curricula.filter(c => c.id !== "all").forEach((curr) => { // Exclude 'all' option from iteration
        curr.branches.forEach((br) => {
          br.semesters.forEach((sem) => {
            const matchedSubjects = filterSubjects(sem.subjects);
            if (matchedSubjects.length > 0) {
              allSubjects.push({
                id: `${curr.id}-${br.id}-${sem.id}`,
                name: `${curr.code} - ${br.name} - ${sem.name}`,
                subjects: matchedSubjects,
              });
            }
          });
        });
      });
      return allSubjects;
    }

    // If no search query and not searching all curricula, show all semesters for the selected branch
    if (!q && !isSearchingAllCurricula) {
      const branch = availableBranches.find((b) => b.id === selectedBranch);
      return branch?.semesters || [];
    }

    const branch = availableBranches.find((b) => b.id === selectedBranch);
    if (!branch) return [];

    return branch.semesters
      .map((sem) => ({
        ...sem,
        subjects: filterSubjects(sem.subjects),
      }))
      .filter((sem) => sem.subjects.length > 0);
  }, [searchQuery, isSearchingAllCurricula, curricula, availableBranches, selectedBranch]);

  const handlePreview = (subject) => {
    setPreviewSubject(subject);
    setIsPreviewOpen(true);
  };

  const handleDownload = (subject) => {
    if (subject?.syllabus_pdf) {
      window.open(subject.syllabus_pdf, "_blank", "noopener");
    }
  };

  const SubjectCard = ({ subject }) => (
    <article className="syllabus__subject-card" aria-labelledby={`sub-${subject.id}`}>
      <div className="syllabus__card-main">
        <div className="syllabus__card-icon"><FileText size={24} /></div>
        <div className="syllabus__card-info">
          <h4 id={`sub-${subject.id}`} className="syllabus__subject-name">{subject.name}</h4>
          <span className="syllabus__subject-code">{subject.code}</span>
        </div>
      </div>
      <div className="syllabus__card-actions">
        {subject.syllabus_pdf ? (
          <>
            <button className="syllabus__icon-btn" onClick={() => handlePreview(subject)} aria-label={`Preview ${subject.name}`}>
              <Eye size={18} />
            </button>
            <button className="syllabus__icon-btn" onClick={() => handleDownload(subject)} aria-label={`Download ${subject.name}`}>
              <Download size={18} />
            </button>
          </>
        ) : (
          <div className="syllabus__missing-indicator">
            <AlertCircle size={16} />
            <span>Unavailable</span>
          </div>
        )}
      </div>
    </article>
  );

  return (
    <section className="syllabus__root">
      <div className="syllabus__container">
        <header className="syllabus__header">
          <h1 className="syllabus__title">Syllabus</h1>
          <p className="syllabus__subtitle">Find, preview, and download subject syllabi for all curricula.</p>
        </header>

        <div className="syllabus__controls">
          <div className="syllabus__search-input">
            <Search size={20} className="syllabus__search-icon" />
            <input
              id="syllabus-search"
              type="search"
              placeholder="Search by subject name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search syllabus"
            />
            {searchQuery && (
              <button className="syllabus__clear-btn" onClick={() => setSearchQuery("")} aria-label="Clear search">
                <X size={18} />
              </button>
            )}
          </div>

          <div className="syllabus__filters">
            <StyledSelect
              id="curriculum-select"
              ariaLabel="Select curriculum"
              value={selectedCurriculum}
              onChange={(v) => setSelectedCurriculum(v)}
              options={curricula.map((c) => ({ id: c.id, label: c.code }))}
            />
            <StyledSelect
              id="branch-select"
              ariaLabel="Select branch"
              value={selectedBranch}
              onChange={(v) => setSelectedBranch(v)}
              options={availableBranches.map((b) => ({ id: b.id, label: b.name }))}
              placeholder="Select Branch"
              disabled={isSearchingAllCurricula}
            />
          </div>
        </div>

        <div className="syllabus__content-area">
          {filteredSubjects.length === 0 ? (
            <div className="syllabus__empty-state" role="status" aria-live="polite">
              <FileText size={48} />
              <h3>{searchQuery ? `No results for "${searchQuery}"` : "No subjects found"}</h3>
              <p>{searchQuery ? "Try a different search term." : "Select a curriculum and branch to see subjects."}</p>
            </div>
          ) : (
            <div className="syllabus__results">
              {filteredSubjects.map((semester) => (
                <div key={semester.id} className="syllabus__semester-group">
                  <h3 className="syllabus__semester-title">{semester.name}</h3>
                  <div className="syllabus__grid">
                    {semester.subjects.map((sub) => (
                      <SubjectCard subject={sub} key={sub.id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Modal
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={previewSubject?.name}
          footer={
            <div className="syllabus__modal-actions">
              <button className="syllabus__btn secondary" onClick={() => setIsPreviewOpen(false)}>
                <X size={16} /> Close
              </button>
              {previewSubject?.syllabus_pdf && (
                <button className="syllabus__btn primary" onClick={() => handleDownload(previewSubject)}>
                  <Download size={16} /> Download PDF
                </button>
              )}
            </div>
          }
        >
          {previewSubject?.syllabus_pdf ? (
            <div className="syllabus__pdf-frame-wrap">
              <iframe
                title={`${previewSubject.name} syllabus`}
                src={previewSubject.syllabus_pdf}
                className="syllabus__pdf-iframe"
              />
            </div>
          ) : (
            <div className="syllabus__empty-preview">
              <FileText size={48} />
              <p>PDF preview is not available for this subject.</p>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default SyllabusSection;
