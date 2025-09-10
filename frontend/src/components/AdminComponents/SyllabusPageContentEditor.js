import React, { useState, useEffect, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import syllabusService from '../../services/syllabusService';
import departmentService from '../../services/departmentService';
import './SyllabusEditor.css';

// Plain-JSX syllabus editor + separated CSS file (SyllabusEditor.css below)
// Improvements made:
// - Immutable updates (deep-clone before mutating)
// - Clearer layout: sidebar + main editor + contextual controls
// - Accessible buttons/labels
// - Compact/expand controls for branches/semesters
// - Prevent accidental deletions with confirm

function deepClone(obj) {
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

export default function SyllabusPageContentEditor() {
  const [curricula, setCurricula] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currentCurriculum, setCurrentCurriculum] = useState(null);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(null);
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchSyllabusData = useCallback(async () => {
    try {
      const response = await syllabusService.getSyllabus();
      setCurricula(response?.data || []);
    } catch (error) {
      console.error('Error fetching curricula:', error);
      alert('Failed to fetch curricula.');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [sRes, dRes] = await Promise.all([
          syllabusService.getSyllabus(),
          departmentService.getDepartments(),
        ]);
        if (!cancelled) {
          setCurricula(sRes?.data || []);
          setDepartments(dRes?.data || []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) alert('Failed to load data.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    loadData();
    return () => (cancelled = true);
  }, [fetchSyllabusData]);

  const handleSelectCurriculum = (id) => {
    const curriculum = curricula.find((c) => c._id === id);
    setCurrentCurriculum(curriculum ? deepClone(curriculum) : null);
    setSelectedBranchIndex(null);
    setSelectedSemesterIndex(null);
  };

  const handleAddNewCurriculum = () => {
    setCurrentCurriculum({ code: '', start_year: '', end_year: '', branches: [] });
    setSelectedBranchIndex(null);
    setSelectedSemesterIndex(null);
  };

  const handleCurriculumChange = (field, value) => {
    setCurrentCurriculum((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!currentCurriculum || !currentCurriculum.code?.trim()) {
      alert('Curriculum code is required.');
      return;
    }
    try {
      let savedCurriculum;
      if (currentCurriculum._id) {
        const res = await syllabusService.updateCurriculum(currentCurriculum._id, currentCurriculum, token);
        savedCurriculum = res.data;
        alert('Syllabus updated successfully!');
      } else {
        const res = await syllabusService.createCurriculum(currentCurriculum, token);
        savedCurriculum = res.data;
        alert('Syllabus created successfully!');
      }
      await fetchSyllabusData();
      handleSelectCurriculum(savedCurriculum._id);
    } catch (error) {
      console.error('Error saving syllabus:', error);
      alert('Failed to save syllabus.');
    }
  };

  const handleDeleteCurriculum = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Permanently delete this curriculum?')) return;
    try {
      await syllabusService.deleteCurriculum(id, token);
      setCurricula((prev) => prev.filter((c) => c._id !== id));
      if (currentCurriculum?._id === id) setCurrentCurriculum(null);
      alert('Deleted.');
    } catch (error) {
      console.error(error);
      alert('Failed to delete.');
    }
  };

  // Nested state helpers (immutable)
  const updateNestedState = (branchIndex, semesterIndex, subjectIndex, field, value) => {
    setCurrentCurriculum((prev) => {
      const next = deepClone(prev);
      if (!next) return prev;
      if (subjectIndex !== null && subjectIndex !== undefined) {
        next.branches[branchIndex].semesters[semesterIndex].subjects[subjectIndex][field] = value;
      } else if (semesterIndex !== null && semesterIndex !== undefined) {
        next.branches[branchIndex].semesters[semesterIndex][field] = value;
      } else {
        next.branches[branchIndex][field] = value;
      }
      return next;
    });
  };

  const addListItem = (type, branchIndex, semesterIndex) => {
    setCurrentCurriculum((prev) => {
      const next = deepClone(prev);
      if (!next) return prev;
      if (type === 'branch') {
        next.branches.push({ department: '', semesters: [] });
      } else if (type === 'semester') {
        next.branches[branchIndex].semesters.push({ name: '', code: '', subjects: [] });
      } else if (type === 'subject') {
        next.branches[branchIndex].semesters[semesterIndex].subjects.push({ name: '', code: '', description: '' });
      }
      return next;
    });
  };

  const removeListItem = (type, branchIndex, semesterIndex, subjectIndex) => {
    setCurrentCurriculum((prev) => {
      const next = deepClone(prev);
      if (!next) return prev;
      if (type === 'branch') {
        next.branches = next.branches.filter((_, i) => i !== branchIndex);
        setSelectedBranchIndex(null);
        setSelectedSemesterIndex(null);
      } else if (type === 'semester') {
        next.branches[branchIndex].semesters = next.branches[branchIndex].semesters.filter((_, i) => i !== semesterIndex);
        setSelectedSemesterIndex(null);
      } else if (type === 'subject') {
        next.branches[branchIndex].semesters[semesterIndex].subjects = next.branches[branchIndex].semesters[semesterIndex].subjects.filter((_, i) => i !== subjectIndex);
      }
      return next;
    });
  };

  const filteredCurricula = curricula.filter((c) => c.code?.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) return <div className="se-loading">Loading syllabus editor...</div>;

  return (
    <div className="se-root">
      <header className="se-header">
        <h1>Syllabus Content Management</h1>
      </header>

      <div className="se-layout">
        <aside className="se-sidebar" aria-label="Curricula list">
          <div className="se-sidebar-top">
            <input
              className="se-search"
              placeholder="Search curricula e.g. C-23"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search curricula"
            />
            <button className="se-btn se-btn-primary" onClick={handleAddNewCurriculum}>New</button>
          </div>

          <ul className="se-list">
            {filteredCurricula.length === 0 && <li className="se-list-empty">No curricula found.</li>}
            {filteredCurricula.map((c) => (
              <li
                key={c._id}
                className={`se-list-item ${currentCurriculum?._id === c._id ? 'active' : ''}`}
                onClick={() => handleSelectCurriculum(c._id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSelectCurriculum(c._id); }}
              >
                <div className="se-list-item-left">
                  <strong>{c.code}</strong>
                  <small className="muted">{c.start_year} – {c.end_year}</small>
                </div>
                <div className="se-list-item-actions">
                  <button
                    className="se-icon-btn"
                    title="Delete curriculum"
                    onClick={(e) => { e.stopPropagation(); handleDeleteCurriculum(c._id); }}
                    aria-label={`Delete ${c.code}`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <main className="se-main">
          {!currentCurriculum ? (
            <div className="se-empty">
              <p>Select a curriculum from the left to edit, or create a new one.</p>
              <button className="se-btn" onClick={handleAddNewCurriculum}>Create a curriculum</button>
            </div>
          ) : (
            <div className="se-editor">
              <section className="se-card se-card-inline">
                <div className="se-card-header">
                  <h2>{currentCurriculum._id ? `Editing: ${currentCurriculum.code}` : 'New Curriculum'}</h2>
                  <div className="se-card-actions">
                    <button className="se-btn" onClick={() => { setCurrentCurriculum(null); setSelectedBranchIndex(null); setSelectedSemesterIndex(null); }}>Close</button>
                    <button className="se-btn se-btn-primary" onClick={handleSave}><span className="icon">💾</span> Save</button>
                  </div>
                </div>

                <div className="se-form-grid">
                  <label className="se-field">
                    <span className="se-label">Code</span>
                    <input
                      className="se-input-code"
                      value={currentCurriculum.code || ''}
                      onChange={(e) => handleCurriculumChange('code', e.target.value)}
                      placeholder="C-23"
                      required
                    />
                  </label>

                  <label className="se-field">
                    <span className="se-label">Start Year</span>
                    <input
                      type="number"
                      min="1900"
                      max="2100"
                      value={currentCurriculum.start_year || ''}
                      onChange={(e) => handleCurriculumChange('start_year', e.target.value)}
                    />
                  </label>

                  <label className="se-field">
                    <span className="se-label">End Year</span>
                    <input
                      type="number"
                      min="1900"
                      max="2100"
                      value={currentCurriculum.end_year || ''}
                      onChange={(e) => handleCurriculumChange('end_year', e.target.value)}
                    />
                  </label>
                </div>

              </section>

              <section className="se-grid-two">
                <div className="se-card">
                  <div className="se-card-header">
                    <h3>Branches</h3>
                    <button className="se-btn" onClick={() => addListItem('branch')}>+ Add Branch</button>
                  </div>

                  <div className="se-branch-list">
                    {currentCurriculum.branches?.length === 0 && <div className="muted">No branches yet.</div>}

                    {currentCurriculum.branches?.map((branch, bIdx) => (
                      <div
                        key={bIdx}
                        className={`se-branch-item ${selectedBranchIndex === bIdx ? 'selected' : ''}`}
                        onClick={() => { setSelectedBranchIndex(bIdx); setSelectedSemesterIndex(null); }}
                      >
                        <div className="se-branch-main">
                          <select
                            value={branch.department?._id || branch.department || ''}
                            onChange={(e) => updateNestedState(bIdx, null, null, 'department', e.target.value)}
                          >
                            <option value="">-- Select Department --</option>
                            {departments.map((d) => (
                              <option key={d._id} value={d._id}>{d.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="se-branch-actions">
                          <button className="se-icon-btn" onClick={(e) => { e.stopPropagation(); removeListItem('branch', bIdx); }} title="Remove branch" aria-label={`Remove ${departments.find(d => d._id === (branch.department?._id || branch.department))?.name || 'branch'}`}>
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="se-semesters-preview">
                          {branch.semesters?.slice(0, 3).map((s) => <span key={s.name || Math.random()} className="pill">{s.name || 'Sem'}</span>)}
                        </div>
                      </div>
                    ))}

                  </div>
                </div>

                <div className="se-card">
                  <div className="se-card-header">
                    <h3>Semesters</h3>
                    <div>
                      <button
                        className="se-btn"
                        onClick={() => selectedBranchIndex !== null ? addListItem('semester', selectedBranchIndex) : alert('Select a branch first')}
                      >+ Add Semester</button>
                    </div>
                  </div>

                  <div className="se-semester-list">
                    {selectedBranchIndex === null && <div className="muted">Select a branch to manage semesters.</div>}
                    {selectedBranchIndex !== null && (currentCurriculum.branches[selectedBranchIndex].semesters?.length === 0) && <div className="muted">No semesters yet.</div>}

                    {selectedBranchIndex !== null && currentCurriculum.branches[selectedBranchIndex].semesters.map((sem, sIdx) => (
                      <div
                        key={sIdx}
                        className={`se-semester-item ${selectedSemesterIndex === sIdx ? 'selected' : ''}`}
                        onClick={() => setSelectedSemesterIndex(sIdx)}
                      >
                        <div className="se-semester-main">
                          <input
                            className="se-input-semester-name"
                            placeholder="Semester name"
                            value={sem.name}
                            onChange={(e) => updateNestedState(selectedBranchIndex, sIdx, null, 'name', e.target.value)}
                          />
                          <input
                            className="se-input-semester-code short"
                            placeholder="Code"
                            value={sem.code}
                            onChange={(e) => updateNestedState(selectedBranchIndex, sIdx, null, 'code', e.target.value)}
                          />
                        </div>
                        <div className="se-semester-actions">
                          <button className="se-icon-btn" onClick={(e) => { e.stopPropagation(); removeListItem('semester', selectedBranchIndex, sIdx); }} title="Remove semester">✕</button>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </section>

              {selectedSemesterIndex !== null && (
                <section className="se-card">
                  <div className="se-card-header">
                    <h3>Subjects — {currentCurriculum.branches[selectedBranchIndex].semesters[selectedSemesterIndex].name || `Semester ${selectedSemesterIndex + 1}`}</h3>
                    <div>
                      <button
                        className="se-btn"
                        onClick={() => addListItem('subject', selectedBranchIndex, selectedSemesterIndex)}
                      >+ Add Subject</button>
                    </div>
                  </div>

                  <div className="se-subjects">
                    {currentCurriculum.branches[selectedBranchIndex].semesters[selectedSemesterIndex].subjects?.length === 0 && <div className="muted">No subjects yet.</div>}

                    {currentCurriculum.branches[selectedBranchIndex].semesters[selectedSemesterIndex].subjects.map((sub, subIdx) => (
                      <div className="se-subject-item" key={subIdx}>
                        <div className="se-subject-fields">
                          <input className="se-input-subject-name" placeholder="Subject Name" value={sub.name} onChange={(e) => updateNestedState(selectedBranchIndex, selectedSemesterIndex, subIdx, 'name', e.target.value)} />
                          <input className="se-input-subject-code short" placeholder="Code" value={sub.code} onChange={(e) => updateNestedState(selectedBranchIndex, selectedSemesterIndex, subIdx, 'code', e.target.value)} />
                          <textarea placeholder="Short description" value={sub.description} onChange={(e) => updateNestedState(selectedBranchIndex, selectedSemesterIndex, subIdx, 'description', e.target.value)} />
                        </div>
                        <div className="se-subject-actions">
                          <button className="se-btn se-btn-ghost" onClick={() => removeListItem('subject', selectedBranchIndex, selectedSemesterIndex, subIdx)}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          )}
        </main>
      </div>

    </div>
  );
}