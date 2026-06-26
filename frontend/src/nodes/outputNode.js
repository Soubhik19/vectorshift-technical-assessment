// outputNode.js
// WHAT THIS FILE DOES: Represents the final output of the pipeline.
// WHY BUILT THIS WAY: Same reason as inputNode — only unique content here.
// WHAT TO SAY IN INTERVIEW: "One target handle on the left, no source handles.
//   The inputs array drives that automatically through BaseNode."

import { useState, useCallback, memo } from 'react';
import BaseNode, { fieldStyle, labelStyle, inputStyle } from './BaseNode';

export const OutputNode = memo(({ id, data }) => {
  const [name, setName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [type, setType] = useState(data?.outputType || 'Text');

  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleTypeChange = useCallback((e) => setType(e.target.value), []);

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      color="#3b82f6"
      inputs={[{ id: 'value', label: 'value' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Name</label>
        <input
          style={inputStyle}
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>Type</label>
        <select
          style={{ ...inputStyle, cursor: 'pointer' }}
          value={type}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
});

OutputNode.displayName = 'OutputNode';

