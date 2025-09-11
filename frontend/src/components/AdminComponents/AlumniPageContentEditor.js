import React from 'react';
import AlumniSuccessStoriesEditor from './AlumniPageEditors/AlumniSuccessStoriesEditor';
import './AdminEditors.css';

const AlumniPageContentEditor = () => {
  return (
    <div className="editor-container">
      <h2 className="editor-container-title">Alumni Page Content Management</h2>
      <AlumniSuccessStoriesEditor />
    </div>
  );
};

export default AlumniPageContentEditor;
