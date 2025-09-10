import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import syllabusService from '../../services/syllabusService';
import departmentService from '../../services/departmentService';
import DepartmentSelectionModal from './DepartmentSelectionModal';
import SemesterEditorModal from './SemesterEditorModal';
import SubjectEditorModal from './SubjectEditorModal';
import './SyllabusEditor.css';

function deepClone(obj) {
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

export default function SyllabusPageContentEditor() {
  const [curricula, setCurricula] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currentCurriculum, setCurrentCurriculum] = useState(null);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal states
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isSemesterModalOpen, setIsSemesterModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  // State for editing items
  const [editingBranchIndex, setEditingBranchIndex] = useState(null);
  const [editingSemester, setEditingSemester] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);

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
  };

  const handleAddNewCurriculum = () => {
    setCurrentCurriculum({ code: '', start_year: '', end_year: '', semesters: [], branches: [] });
    setSelectedBranchIndex(null);
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

  const handleDepartmentSelect = (deptId) => {
    const isDuplicate = currentCurriculum.branches.some((branch, index) => branch.department === deptId && index !== editingBranchIndex);
    if (isDuplicate) {
        alert('This department has already been added to the curriculum.');
        return;
    }
    const next = deepClone(currentCurriculum);
    next.branches[editingBranchIndex].department = deptId;
    setCurrentCurriculum(next);
    setIsDeptModalOpen(false);
    setEditingBranchIndex(null);
  }

  const handleSemesterSave = (semesterData) => {
    const next = deepClone(currentCurriculum);
    if (editingSemester._id) {
        const index = next.semesters.findIndex(s => s._id === semesterData._id);
        next.semesters[index] = semesterData;
    } else {
        next.semesters.push(semesterData);
    }
    setCurrentCurriculum(next);
  }

  const handleSubjectSave = (subjectData) => {
    const next = deepClone(currentCurriculum);
    const branch = next.branches[selectedBranchIndex];
    if (editingSubject._id) {
        const index = branch.subjects.findIndex(s => s._id === subjectData._id);
        branch.subjects[index] = subjectData;
    } else {
        branch.subjects.unshift(subjectData);
    }
    setCurrentCurriculum(next);
  }

  const filteredCurricula = curricula.filter((c) => c.code?.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) return <div className="se-loading">Loading syllabus editor...</div>;

  return (
    <div className="se-root">
        <DepartmentSelectionModal 
            isOpen={isDeptModalOpen}
            onClose={() => setIsDeptModalOpen(false)}
            departments={departments}
            currentDepartmentId={editingBranchIndex !== null ? currentCurriculum.branches[editingBranchIndex]?.department : null}
            onSelect={handleDepartmentSelect}
        />
        <SemesterEditorModal 
            isOpen={isSemesterModalOpen}
            onClose={() => setIsSemesterModalOpen(false)}
            semester={editingSemester}
            onSave={handleSemesterSave}
        />
        <SubjectEditorModal
            isOpen={isSubjectModalOpen}
            onClose={() => setIsSubjectModalOpen(false)}
            subject={editingSubject}
            semesters={currentCurriculum?.semesters || []}
            onSave={handleSubjectSave}
        />

      <header className="se-header"><h1>Syllabus Content Management</h1></header>
      <div className="se-layout">
        <aside className="se-sidebar" aria-label="Curricula list">
          <div className="se-sidebar-top">
            <input className="se-search" placeholder="Search curricula..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="se-btn se-btn-primary" onClick={handleAddNewCurriculum}>New</button>
          </div>
          <ul className="se-list">
            {filteredCurricula.map((c) => (
              <li key={c._id} className={`se-list-item ${currentCurriculum?._id === c._id ? 'active' : ''}`} onClick={() => handleSelectCurriculum(c._id)}>
                <div className="se-list-item-left"><strong>{c.code}</strong><small className="muted">{c.start_year}–{c.end_year}</small></div>
                <button className="se-icon-btn" title="Delete" onClick={(e) => { e.stopPropagation(); handleDeleteCurriculum(c._id); }}><Trash2 size={16} /></button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="se-main">
          {!currentCurriculum ? (
            <div className="se-empty"><p>Select a curriculum to edit, or create a new one.</p></div>
          ) : (
            <div className="se-editor">
              <section className="se-card">
                <div className="se-card-header">
                  <h2>{currentCurriculum._id ? `Editing: ${currentCurriculum.code}` : 'New Curriculum'}</h2>
                  <button className="se-btn se-btn-primary" onClick={handleSave}>Save Changes</button>
                </div>
                <div className="se-form-grid">
                  <label className="se-field"><span className="se-label">Code</span><input value={currentCurriculum.code || ''} onChange={(e) => handleCurriculumChange('code', e.target.value)} placeholder="C-23" required /></label>
                  <label className="se-field"><span className="se-label">Start Year</span><input type="number" value={currentCurriculum.start_year || ''} onChange={(e) => handleCurriculumChange('start_year', e.target.value)} /></label>
                  <label className="se-field"><span className="se-label">End Year</span><input type="number" value={currentCurriculum.end_year || ''} onChange={(e) => handleCurriculumChange('end_year', e.target.value)} /></label>
                </div>
              </section>

              <section className="se-card">
                <div className="se-card-header"><h3>Semesters</h3><button className="se-btn" onClick={() => {setEditingSemester({}); setIsSemesterModalOpen(true);}}>+ Add Semester</button></div>
                <div className="se-semester-list">
                  {currentCurriculum.semesters?.map((sem, sIdx) => (
                    <div key={sIdx} className="se-semester-item">
                        <span>{sem.name} ({sem.code})</span>
                        <div className="se-branch-actions">
                            <button className="se-icon-btn" onClick={() => {setEditingSemester(sem); setIsSemesterModalOpen(true);}}><Edit2 size={16} /></button>
                            <button className="se-icon-btn" onClick={() => setCurrentCurriculum(prev => ({...prev, semesters: prev.semesters.filter((_, i) => i !== sIdx)}))}><Trash2 size={16} /></button>
                        </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="se-grid-two">
                <div className="se-card">
                  <div className="se-card-header"><h3>Branches</h3><button className="se-btn" onClick={() => {setCurrentCurriculum(prev => ({...prev, branches: [...prev.branches, {department: '', subjects: []}]})); setEditingBranchIndex(currentCurriculum.branches.length); setIsDeptModalOpen(true);}}>+ Add Branch</button></div>
                  <div className="se-branch-list">
                    {currentCurriculum.branches?.map((branch, bIdx) => (
                      <div key={bIdx} className={`se-branch-item ${selectedBranchIndex === bIdx ? 'selected' : ''}`} onClick={() => setSelectedBranchIndex(bIdx)}>
                        <span>{departments.find(d => d._id === (branch.department?._id || branch.department))?.name || 'Select Department'}</span>
                        <div className="se-branch-actions">
                            <button className="se-icon-btn" onClick={(e) => { e.stopPropagation(); setEditingBranchIndex(bIdx); setIsDeptModalOpen(true); }} title="Edit department"><Edit2 size={16} /></button>
                            <button className="se-icon-btn" onClick={(e) => { e.stopPropagation(); setCurrentCurriculum(prev => ({...prev, branches: prev.branches.filter((_, i) => i !== bIdx)})); setSelectedBranchIndex(null);}}><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="se-card">
                  <div className="se-card-header"><h3>Subjects</h3></div>
                  {selectedBranchIndex !== null && currentCurriculum.branches[selectedBranchIndex] && currentCurriculum.branches[selectedBranchIndex].department ? (
                    <div className="se-subjects">
                      <button className="se-btn" onClick={() => {setEditingSubject({}); setIsSubjectModalOpen(true);}}>+ Add Subject</button>
                      {currentCurriculum.branches[selectedBranchIndex].subjects.map((sub, subIdx) => (
                        <div className={`se-subject-item`} key={subIdx}>
                            <span>{sub.name} ({sub.code}) - {sub.semesterCode}</span>
                            <div className="se-branch-actions">
                                <button className="se-icon-btn" onClick={() => {setEditingSubject(sub); setIsSubjectModalOpen(true);}}><Edit2 size={16} /></button>
                                <button className="se-icon-btn" onClick={() => setCurrentCurriculum(prev => { const next = deepClone(prev); next.branches[selectedBranchIndex].subjects = next.branches[selectedBranchIndex].subjects.filter((_, i) => i !== subIdx); return next;})}><Trash2 size={16} /></button>
                            </div>
                        </div>
                      ))}
                    </div>
                  ) : <div className="muted">{selectedBranchIndex !== null ? "Please select a department for this branch to add subjects." : "Select a branch to manage subjects."}</div>}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}