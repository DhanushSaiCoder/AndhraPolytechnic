import React, { useState, useMemo, useEffect } from "react";
import syllabusData from "../../data/syllabusData.json";
import '../../styles/AcademicsStyles/Syllabus.css';

function formatDate(iso){ if(!iso) return ''; return new Date(iso).toLocaleDateString(); }

export default function SyllabusSection() {
  const curricula = syllabusData.curricula || [];
  const defaultCurriculum = useMemo(()=> curricula.slice().sort((a,b)=>b.start_year-a.start_year)[0] || null, [curricula]);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState(defaultCurriculum?.id || null);

  useEffect(()=> { if(defaultCurriculum?.id) setSelectedCurriculumId(defaultCurriculum.id); }, [defaultCurriculum]);

  const selectedCurriculum = useMemo(()=> curricula.find(c=>c.id===selectedCurriculumId) || defaultCurriculum, [curricula, selectedCurriculumId, defaultCurriculum]);
  const branches = selectedCurriculum?.branches || [];
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id || null);
  useEffect(()=> setSelectedBranchId(selectedCurriculum?.branches?.[0]?.id || null), [selectedCurriculum]);

  const selectedBranch = useMemo(()=> branches.find(b=>b.id===selectedBranchId) || branches[0], [branches, selectedBranchId]);
  const semesters = selectedBranch?.semesters || [];
  const [selectedSemesterId, setSelectedSemesterId] = useState(semesters[0]?.id || null);
  useEffect(()=> setSelectedSemesterId(selectedBranch?.semesters?.[0]?.id || null), [selectedBranch]);

  const selectedSemester = useMemo(()=> semesters.find(s=>s.id===selectedSemesterId) || semesters[0], [semesters, selectedSemesterId]);

  // Search across subjects in selected curriculum/branch/semester or all curricula if requested
  const [query, setQuery] = useState("");
  const [searchAllCurricula, setSearchAllCurricula] = useState(false);

  const [previewPdf, setPreviewPdf] = useState(null); // {url, title}

  const subjectList = useMemo(() => {
    if(searchAllCurricula){
      // flatten all subjects in all curricula
      return curricula.flatMap(c => c.branches.flatMap(b => b.semesters.flatMap(s => s.subjects.map(sub => ({...sub, curriculum: c.code, branch: b.name, semester: s.name})))));
    }
    if(!selectedSemester) return [];
    return (selectedSemester.subjects || []).map(sub => ({...sub, curriculum: selectedCurriculum?.code}));
  }, [searchAllCurricula, curricula, selectedSemester, selectedCurriculum]);

  const filtered = useMemo(()=> {
    if(!query) return subjectList;
    const q = query.trim().toLowerCase();
    return subjectList.filter(s => (s.name + ' ' + (s.code||'') + ' ' + (s.description||'')).toLowerCase().includes(q));
  }, [subjectList, query]);

  function openPreview(sub){
    if(sub.syllabus_pdf) setPreviewPdf({ url: sub.syllabus_pdf, title: sub.name });
    else alert("Syllabus file missing — contact admin.");
  }

  return (
    <section className="syllabus-section">
      <h2>Syllabus</h2>

      <div className="syllabus-topbar">
        <div className="syllabus-search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by subject or code" aria-label="Search subjects"/>
        </div>

        <div className="curriculum-pills" role="tablist" aria-label="Curricula">
          {curricula.map(c => (
            <button
              key={c.id}
              className={`curriculum-pill ${c.id === selectedCurriculumId ? 'active' : ''}`}
              aria-pressed={c.id === selectedCurriculumId}
              onClick={()=>{ setSelectedCurriculumId(c.id); setSearchAllCurricula(false); }}
            >
              {c.code} <span className="badge" style={{marginLeft:8}}> {c.start_year}-{c.end_year} </span>
            </button>
          ))}
          <button className={`curriculum-pill ${searchAllCurricula ? 'active' : ''}`} onClick={()=> setSearchAllCurricula(s=>!s)}>
            Search all curricula
          </button>
        </div>
      </div>

      {/* Branch select for narrow screens or additional meta */}
      <div className="syllabus-controls" style={{justifyContent:'flex-start', gap:12}}>
        <select id="branchSelect" value={selectedBranchId || ''} onChange={e=>setSelectedBranchId(e.target.value)} aria-label="Branch">
          {branches.map(b=> <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      {/* Semesters */}
      <div className="semester-tabs" role="tablist">
        {semesters.map(s => (
          <button key={s.id} role="tab" aria-selected={s.id === selectedSemesterId} className={`semester-tab ${s.id===selectedSemesterId ? 'active' : ''}`} onClick={()=> setSelectedSemesterId(s.id)}>{s.name}</button>
        ))}
      </div>

      {/* Subjects */}
      <div className="subject-list" role="region" aria-live="polite">
        {filtered.length === 0 && <p>No subjects found.</p>}
        {filtered.map(sub => (
          <article key={sub.id} className="subject-card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3>{sub.name}</h3>
              <div className="meta-row">
                <span className="badge">{sub.code}</span>
                <span className="badge">{sub.curriculum}</span>
              </div>
            </div>

            {sub.description && <p className="subject-description">{sub.description}</p>}

            <div className="meta-row">
              <small>Version: {sub.version || '—'}</small>
              <small>Last updated: {formatDate(sub.last_updated)}</small>
            </div>

            <div className="subject-actions">
              <button className="btn btn-primary" onClick={()=> openPreview(sub)} disabled={!sub.syllabus_pdf}>
                Preview
              </button>
              <a className={`btn ${sub.syllabus_pdf ? 'btn-success' : 'btn-disabled'}`} href={sub.syllabus_pdf || '#'} target="_blank" rel="noopener noreferrer" aria-disabled={!sub.syllabus_pdf}>
                {sub.syllabus_pdf ? 'Download' : 'Not available'}
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* PDF Modal */}
      {previewPdf && (
        <div className="pdf-modal" role="dialog" aria-modal="true" aria-label={`Preview: ${previewPdf.title}`}>
          <div className="modal-card">
            <div className="modal-toolbar">
              <div>{previewPdf.title}</div>
              <div>
                <button onClick={()=> setPreviewPdf(null)} className="btn">Close</button>
              </div>
            </div>
            <iframe className="modal-iframe" src={previewPdf.url} title={previewPdf.title} loading="lazy" />
          </div>
        </div>
      )}
    </section>
  );
}