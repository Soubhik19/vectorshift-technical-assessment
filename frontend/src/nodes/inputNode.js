// inputNode.js
// WHAT THIS FILE DOES: The node where users define pipeline inputs (name + type).
// WHY BUILT THIS WAY: All the handle/border/header code is gone — BaseNode handles
//   that. This file only contains what is unique to an Input node.
// WHAT TO SAY IN INTERVIEW: "Compare this to the original — it went from ~45 lines
//   to ~30. Everything node-specific is here; everything shared lives in BaseNode."

import { useState, useCallback, memo } from 'react';
import BaseNode, { fieldStyle, labelStyle, inputStyle } from './BaseNode';

export const InputNode = memo(({ id, data }) => {
  const [name, setName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [type, setType] = useState(data?.inputType || 'Text');

  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleTypeChange = useCallback((e) => setType(e.target.value), []);

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      color="#10b981"
      outputs={[{ id: 'value', label: 'value' }]}
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

InputNode.displayName = 'InputNode';

