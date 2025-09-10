import React, { useState, useEffect, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import syllabusService from '../../services/syllabusService';
import departmentService from '../../services/departmentService';
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
  const [newlyAddedSubjectIndex, setNewlyAddedSubjectIndex] = useState(null);

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

  const updateNestedState = (path, value) => {
    setCurrentCurriculum(prev => {
        const next = deepClone(prev);
        let current = next;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        return next;
    });
  };
  
  const addListItem = (path) => {
    setCurrentCurriculum(prev => {
        const next = deepClone(prev);
        let current = next;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        const key = path[path.length - 1];
        const newItem = key === 'branches' ? { department: '', subjects: [] } : 
                        key === 'semesters' ? { name: '', code: '' } : 
                        { name: '', code: '', description: '', semesterCode: '' };
        
        if (key === 'subjects') {
            current[key].unshift(newItem);
            setNewlyAddedSubjectIndex(0);
            setTimeout(() => setNewlyAddedSubjectIndex(null), 2000);
        } else {
            current[key].push(newItem);
        }
        return next;
    });
  };
  
  const removeListItem = (path) => {
    setCurrentCurriculum(prev => {
        const next = deepClone(prev);
        let parent = next;
        for (let i = 0; i < path.length - 2; i++) {
            parent = parent[path[i]];
        }
        const listKey = path[path.length - 2];
        const index = path[path.length - 1];
        parent[listKey] = parent[listKey].filter((_, i) => i !== index);
        if(listKey === 'branches') setSelectedBranchIndex(null);
        return next;
    });
  };

  const filteredCurricula = curricula.filter((c) => c.code?.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) return <div className="se-loading">Loading syllabus editor...</div>;

  return (
    <div className="se-root">
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
                <div className="se-card-header"><h3>Semesters</h3><button className="se-btn" onClick={() => addListItem(['semesters'])}>+ Add Semester</button></div>
                <div className="se-semester-list">
                  {currentCurriculum.semesters?.map((sem, sIdx) => (
                    <div key={sIdx} className="se-semester-item">
                      <input className="se-input-semester-name" placeholder="Semester Name" value={sem.name} onChange={(e) => updateNestedState(['semesters', sIdx, 'name'], e.target.value)} />
                      <input className="se-input-semester-code short" placeholder="Code" value={sem.code} onChange={(e) => updateNestedState(['semesters', sIdx, 'code'], e.target.value)} />
                      <button className="se-icon-btn" onClick={() => removeListItem(['semesters', sIdx])}><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="se-grid-two">
                <div className="se-card">
                  <div className="se-card-header"><h3>Branches</h3><button className="se-btn" onClick={() => addListItem(['branches'])}>+ Add Branch</button></div>
                  <div className="se-branch-list">
                    {currentCurriculum.branches?.map((branch, bIdx) => (
                      <div key={bIdx} className={`se-branch-item ${selectedBranchIndex === bIdx ? 'selected' : ''}`} onClick={() => setSelectedBranchIndex(bIdx)}>
                        <select 
                          value={branch.department?._id || branch.department || ''} 
                          onChange={(e) => {
                              updateNestedState(['branches', bIdx, 'department'], e.target.value);
                          }}
                        >
                          <option value="">-- Select Department --</option>
                          {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                        </select>
                        <button className="se-icon-btn" onClick={(e) => { e.stopPropagation(); removeListItem(['branches', bIdx]); }}><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="se-card">
                  <div className="se-card-header"><h3>Subjects</h3></div>
                  {selectedBranchIndex !== null && currentCurriculum.branches[selectedBranchIndex] && currentCurriculum.branches[selectedBranchIndex].department ? (
                    <div className="se-subjects">
                      <button className="se-btn" onClick={() => addListItem(['branches', selectedBranchIndex, 'subjects'])}>+ Add Subject</button>
                      {currentCurriculum.branches[selectedBranchIndex].subjects.map((sub, subIdx) => (
                        <div className={`se-subject-item ${subIdx === newlyAddedSubjectIndex ? 'newly-added' : ''}`} key={subIdx}>
                          <div className="se-subject-fields">
                            <input placeholder="Subject Name" value={sub.name} onChange={(e) => updateNestedState(['branches', selectedBranchIndex, 'subjects', subIdx, 'name'], e.target.value)} />
                            <input placeholder="Code" value={sub.code} onChange={(e) => updateNestedState(['branches', selectedBranchIndex, 'subjects', subIdx, 'code'], e.target.value)} className="short" />
                            <select value={sub.semesterCode} onChange={(e) => updateNestedState(['branches', selectedBranchIndex, 'subjects', subIdx, 'semesterCode'], e.target.value)}>
                              <option value="">-- Select Semester --</option>
                              {currentCurriculum.semesters.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                            </select>
                            <textarea placeholder="Description" value={sub.description} onChange={(e) => updateNestedState(['branches', selectedBranchIndex, 'subjects', subIdx, 'description'], e.target.value)} />
                          </div>
                          <button className="se-icon-btn" onClick={() => removeListItem(['branches', selectedBranchIndex, 'subjects', subIdx])}><Trash2 size={16} /></button>
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