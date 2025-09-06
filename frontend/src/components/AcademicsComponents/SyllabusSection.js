import React, { useState, useMemo, useEffect } from "react";
import syllabusData from "../../data/syllabusData.json";
import '../../styles/AcademicsStyles/Syllabus.css';

export default function SyllabusSection() {
  const curricula = syllabusData.curricula || [];

  // Determine the default curriculum: latest by start_year
  const defaultCurriculum = useMemo(() => {
    if (curricula.length === 0) return null;
    return curricula.reduce((latest, current) =>
      (current.start_year > latest.start_year ? current : latest)
    );
  }, [curricula]);

  const [selectedCurriculumId, setSelectedCurriculumId] = useState(defaultCurriculum?.id || null);
  const selectedCurriculum = useMemo(() =>
    curricula.find(c => c.id === selectedCurriculumId) || defaultCurriculum,
    [curricula, selectedCurriculumId, defaultCurriculum]
  );

  const branches = selectedCurriculum?.branches || [];
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id || null);
  const selectedBranch = useMemo(() =>
    branches.find(b => b.id === selectedBranchId) || branches[0],
    [branches, selectedBranchId]
  );

  const semesters = selectedBranch?.semesters || [];
  const [selectedSemesterId, setSelectedSemesterId] = useState(semesters[0]?.id || null);
  const selectedSemester = useMemo(() =>
    semesters.find(s => s.id === selectedSemesterId) || semesters[0],
    [semesters, selectedSemesterId]
  );

  // Reset branch and semester when curriculum changes
  useEffect(() => {
    setSelectedBranchId(selectedCurriculum?.branches[0]?.id || null);
  }, [selectedCurriculum]);

  // Reset semester when branch changes
  useEffect(() => {
    setSelectedSemesterId(selectedBranch?.semesters[0]?.id || null);
  }, [selectedBranch]);

  function handleOpenPdf(url) {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("Syllabus PDF not available for this subject.");
    }
  }

  return (
    <section className="syllabus-section">
      <h2>Syllabus</h2>

      <div className="syllabus-controls">
        {/* Curriculum Selection */}
        <label htmlFor="curriculumSelect" className="sr-only">Select Curriculum</label>
        <select
          id="curriculumSelect"
          value={selectedCurriculumId || ''}
          onChange={e => setSelectedCurriculumId(e.target.value)}
          className="curriculum-select"
          aria-label="Select Curriculum"
        >
          {curricula.length === 0 && <option value="">No Curricula Available</option>}
          {curricula.map(c => (
            <option key={c.id} value={c.id}>
              {c.code} ({c.start_year}-{c.end_year})
            </option>
          ))}
        </select>

        {/* Branch Selection */}
        <label htmlFor="branchSelect" className="sr-only">Select Branch</label>
        <select
          id="branchSelect"
          value={selectedBranchId || ''}
          onChange={e => setSelectedBranchId(e.target.value)}
          className="branch-select"
          aria-label="Select Branch"
          disabled={!selectedCurriculum || branches.length === 0}
        >
          {branches.length === 0 && <option value="">No Branches Available</option>}
          {branches.map(b => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {selectedBranch && (
        <div className="semester-tabs" role="tablist" aria-label="Semesters">
          {semesters.length === 0 && <p>No Semesters Available for this Branch.</p>}
          {semesters.map(s => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === selectedSemesterId}
              onClick={() => setSelectedSemesterId(s.id)}
              className={`semester-tab ${s.id === selectedSemesterId ? 'active' : ''}`}
              id={`tab-${s.id}`}
              aria-controls={`panel-${s.id}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {selectedSemester && (
        <div
          className="subject-list"
          role="tabpanel"
          id={`panel-${selectedSemester.id}`}
          aria-labelledby={`tab-${selectedSemester.id}`}
        >
          {selectedSemester.subjects.length === 0 && <p>No subjects found for this semester.</p>}
          {selectedSemester.subjects.map(sub => (
            <article key={sub.id} className="subject-card" aria-labelledby={`title-${sub.id}`}>
              <h3 id={`title-${sub.id}`}>{sub.name}</h3>
              {sub.description && <p className="subject-description">{sub.description}</p>}
              <div className="subject-actions">
                <button
                  onClick={() => handleOpenPdf(sub.syllabus_pdf)}
                  disabled={!sub.syllabus_pdf}
                  className="syllabus-download-button"
                >
                  {sub.syllabus_pdf ? "View / Download Syllabus" : "Syllabus Not Available"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {!selectedCurriculum && <p>No curriculum data available.</p>}
      {selectedCurriculum && !selectedBranch && <p>Please select a branch to view syllabus.</p>}
      {selectedCurriculum && selectedBranch && !selectedSemester && <p>Please select a semester to view syllabus.</p>}
    </section>
  );
}