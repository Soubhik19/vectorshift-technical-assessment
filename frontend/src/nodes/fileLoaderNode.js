// fileLoaderNode.js
// WHAT THIS FILE DOES: Loads files (PDF, CSV, TXT) into the pipeline.
// WHY BUILT THIS WAY: First step in any RAG pipeline — you need to ingest documents.
// WHAT TO SAY IN INTERVIEW: "This mirrors VectorShift's actual file loader node.
//   It's the entry point for RAG — users select a file type and it outputs raw text."

import { useState, useCallback, memo } from 'react';
import BaseNode, { fieldStyle, labelStyle, inputStyle } from './BaseNode';

export const FileLoaderNode = memo(({ id, data }) => {
  const [fileType, setFileType] = useState(data?.fileType || 'PDF');

  return (
    <BaseNode
      id={id}
      title="File Loader"
      icon="📄"
      color="#06b6d4"
      outputs={[{ id: 'document', label: 'document' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>File Type</label>
        <select
          style={{ ...inputStyle, cursor: 'pointer' }}
          value={fileType}
          onChange={useCallback((e) => setFileType(e.target.value), [])}
        >
          <option value="PDF">PDF</option>
          <option value="CSV">CSV</option>
          <option value="TXT">Plain Text</option>
          <option value="DOCX">Word Doc</option>
        </select>
      </div>
      <p style={{ fontSize: '11px', color: '#475569', margin: 0 }}>
        Loads and extracts text from uploaded files.
      </p>
    </BaseNode>
  );
});

FileLoaderNode.displayName = 'FileLoaderNode';

