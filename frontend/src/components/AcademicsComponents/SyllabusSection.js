import React, { useEffect, useMemo, useState } from "react";
import { Search, FileText, AlertCircle, X, ChevronDown } from "lucide-react";
import syllabusService from "../../services/syllabusService";
import "../../styles/AcademicsStyles/Syllabus.css";
import Fuse from 'fuse.js';

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
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [curricula, setCurricula] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSyllabusData = async () => {
      try {
        const response = await syllabusService.getSyllabus();
        setCurricula(response.data);
        if (response.data.length > 0) {
          setSelectedCurriculum(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching syllabus data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSyllabusData();
  }, []);

  const allSubjectsFlattened = useMemo(() => {
    const subjects = [];
    curricula.forEach(curriculum => {
      curriculum.branches.forEach(branch => {
        branch.semesters.forEach(semester => {
          semester.subjects.forEach(subject => {
            subjects.push({
              ...subject,
              curriculumId: curriculum._id,
              curriculumCode: curriculum.code,
              branchId: branch.department._id,
              branchName: branch.department.name,
              semesterId: semester._id,
              semesterName: semester.name,
            });
          });
        });
      });
    });
    return subjects;
  }, [curricula]);

  const fuse = useMemo(() => {
    const options = {
      keys: ["name", "code"],
      threshold: 0.3,
    };
    return new Fuse(allSubjectsFlattened, options);
  }, [allSubjectsFlattened]);

  const currentCurriculum = useMemo(
    () => curricula.find((c) => c._id === selectedCurriculum),
    [curricula, selectedCurriculum]
  );

  const availableBranches = useMemo(() => {
    return currentCurriculum?.branches || [];
  }, [currentCurriculum]);

  useEffect(() => {
    if (availableBranches.length > 0 && !selectedBranch) {
      setSelectedBranch(availableBranches[0].department._id);
    } else if (availableBranches.length > 0 && !availableBranches.find(b => b.department._id === selectedBranch)) {
      setSelectedBranch(availableBranches[0].department._id);
    }
  }, [selectedCurriculum, availableBranches, selectedBranch]);

  const filteredSubjects = useMemo(() => {
    const q = (searchQuery || "").trim();

    if (q) {
      const fuseResults = fuse.search(q);
      const groupedResults = {};

      fuseResults.forEach(({ item: subject }) => {
        const curriculumKey = subject.curriculumId;
        const branchKey = subject.branchId;
        const semesterKey = subject.semesterId;

        if (!groupedResults[curriculumKey]) {
          groupedResults[curriculumKey] = { code: subject.curriculumCode, branches: {} };
        }
        if (!groupedResults[curriculumKey].branches[branchKey]) {
          groupedResults[curriculumKey].branches[branchKey] = { name: subject.branchName, semesters: {} };
        }
        if (!groupedResults[curriculumKey].branches[branchKey].semesters[semesterKey]) {
          groupedResults[curriculumKey].branches[branchKey].semesters[semesterKey] = {
            id: semesterKey,
            name: subject.semesterName,
            subjects: [],
          };
        }
        groupedResults[curriculumKey].branches[branchKey].semesters[semesterKey].subjects.push(subject);
      });

      const finalResults = [];
      for (const currKey in groupedResults) {
        for (const branchKey in groupedResults[currKey].branches) {
          for (const semKey in groupedResults[currKey].branches[branchKey].semesters) {
            finalResults.push(groupedResults[currKey].branches[branchKey].semesters[semKey]);
          }
        }
      }
      return finalResults;
    }

    const branch = availableBranches.find((b) => b.department._id === selectedBranch);
    return branch?.semesters || [];
  }, [searchQuery, curricula, availableBranches, selectedBranch, fuse]);

  const SubjectCard = ({ subject }) => (
    <article className="syllabus__subject-card" aria-labelledby={`sub-${subject._id}`}>
      <div className="syllabus__card-main">
        <div className="syllabus__card-icon"><FileText size={24} /></div>
        <div className="syllabus__card-info">
          <h4 id={`sub-${subject._id}`} className="syllabus__subject-name">{subject.name}</h4>
          <span className="syllabus__subject-code">{subject.code}</span>
          <p className="syllabus__subject-description">{subject.description || "No description available."}</p>
        </div>
      </div>
    </article>
  );

  if (isLoading) {
    return <div>Loading syllabus...</div>;
  }

  return (
    <section className="syllabus__root">
      <div className="syllabus__container">
        <header className="syllabus__header">
          <h1 className="syllabus__title">Syllabus</h1>
          <p className="syllabus__subtitle">Find subject syllabi for all curricula.</p>
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
              options={curricula.map((c) => ({ id: c._id, label: c.code }))}
            />
            <StyledSelect
              id="branch-select"
              ariaLabel="Select branch"
              value={selectedBranch}
              onChange={(v) => setSelectedBranch(v)}
              options={availableBranches.map((b) => ({ id: b.department._id, label: b.department.name }))}
              placeholder="Select Branch"
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
                <div key={semester._id} className="syllabus__semester-group">
                  <h3 className="syllabus__semester-title">{semester.name}</h3>
                  <div className="syllabus__grid">
                    {semester.subjects.map((sub) => (
                      <SubjectCard subject={sub} key={sub._id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SyllabusSection;
