import React from 'react';
import './index.css'


const EditorSide = (props) => {
  return (
    <div className="editor-side">
      <button className="js-trigger-2" onClick={(e)=>{e.preventDefault();props.onDraft(e)}}>
        Save draft
      </button>
      <button className="js-trigger-3" onClick={(e)=>{e.preventDefault();props.onCancel(e)}}>
        Cancel
      </button>
    </div>
  );
}

export default EditorSide;
