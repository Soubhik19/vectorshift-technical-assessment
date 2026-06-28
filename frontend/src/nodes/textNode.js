// textNode.js
// WHAT THIS FILE DOES: A text input node that auto-resizes and detects {{variables}}.
// WHY BUILT THIS WAY: useEffect watches text changes, a regex extracts valid JS
//   variable names inside {{ }}, and each unique variable becomes a Handle on the left.
// WHAT TO SAY IN INTERVIEW: "I used a useEffect that runs every time the text changes.
//   Inside it, a regex finds all patterns matching double curly brackets with a valid
//   variable name. Each unique variable becomes a Handle on the left side. So typing
//   {{name}} creates a handle called 'name' instantly."

import { useState, useEffect, useRef, memo } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode, { fieldStyle, labelStyle, inputStyle } from './BaseNode';

export const TextNode = memo(({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 240, height: 'auto' });
  const textareaRef = useRef(null);

  // Detect {{variables}} and auto-resize
  useEffect(() => {
    // Extract variables: match {{ validJSVariableName }} or {{ nodeName.output }}
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$.]*)\s*\}\}/g;
    const found = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (!found.includes(match[1])) {
        found.push(match[1]);
      }
    }
    setVariables(found);

    // Auto-resize based on text content
    const longestLine = Math.max(...text.split('\n').map(l => l.length));
    const newWidth = Math.max(240, Math.min(400, longestLine * 8 + 60));
    setDimensions({ width: newWidth, height: 'auto' });
  }, [text]);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  const handleSpacing = (i, total) => `${((i + 1) / (total + 1)) * 100}%`;

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      color="#f59e0b"
      minWidth={dimensions.width}
      outputs={[{ id: 'output', label: 'output' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Text</label>
        <textarea
          ref={textareaRef}
          style={{
            ...inputStyle,
            resize: 'none',
            overflow: 'hidden',
            minHeight: '36px',
            lineHeight: '1.4',
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
        />
      </div>

      {/* Show detected variables as tags */}
      {variables.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
          {variables.map((v) => (
            <span
              key={v}
              style={{
                fontSize: '10px',
                background: '#f59e0b22',
                color: '#f59e0b',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid #f59e0b44',
              }}
            >
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      )}

      {/* Dynamic variable handles on the left */}
      {variables.map((v, i) => (
        <Handle
          key={`${id}-var-${v}`}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{
            top: handleSpacing(i, variables.length),
            background: '#f59e0b',
            width: '10px',
            height: '10px',
            border: '2px solid #1e293b',
            borderRadius: '50%',
          }}
        />
      ))}
    </BaseNode>
  );
});

TextNode.displayName = 'TextNode';

