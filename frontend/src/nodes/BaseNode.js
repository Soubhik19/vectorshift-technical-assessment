// BaseNode.js
// WHAT THIS FILE DOES: One reusable React component that every node uses.
// WHY BUILT THIS WAY: inputNode, outputNode, llmNode, textNode all had the same
//   border, header, and Handle setup copy-pasted. BaseNode centralises that.
//   Pass title + inputs array + outputs array → it renders handles automatically.
// WHAT TO SAY IN INTERVIEW: "All four original nodes repeated ~30 lines of border,
//   header, and Handle code. BaseNode takes those as props and renders them once.
//   Adding a new node now takes 15 lines instead of 50 — and style changes to all
//   nodes happen in one place."

import { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const labelStyle = {
  fontSize: '11px',
  fontWeight: 600,
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '3px',
  display: 'block',
};

export const inputStyle = {
  width: '100%',
  background: '#0f172a',
  border: '1px solid #334155',
  borderRadius: '6px',
  padding: '5px 8px',
  color: '#e2e8f0',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
};

export const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  marginBottom: '10px',
};

export { labelStyle };

const BaseNode = memo(({
  id,
  title,
  icon = '⚙️',
  color = '#6c63ff',
  inputs = [],   // [{ id: 'input-1', label: 'Text' }, ...]
  outputs = [],  // [{ id: 'output-1', label: 'Result' }, ...]
  children,
  minWidth = 220,
}) => {
  const handleSpacing = useCallback(
    (i, total) => `${((i + 1) / (total + 1)) * 100}%`,
    []
  );

  return (
    <div
      style={{
        background: '#1e293b',
        border: `1.5px solid ${color}`,
        borderRadius: '12px',
        minWidth: `${minWidth}px`,
        boxShadow: `0 0 0 1px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.4)`,
        fontFamily: '"Inter", sans-serif',
        position: 'relative',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${color}cc, ${color}88)`,
          padding: '8px 12px',
          borderRadius: '10px 10px 0 0',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
        }}
      >
        <span style={{ fontSize: '14px' }}>{icon}</span>
        <span style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>
          {title}
        </span>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '12px 14px' }}>{children}</div>

      {/* ── Input Handles (left side) ── */}
      {inputs.map((inp, i) => (
        <div key={`${id}-in-wrap-${i}`}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${inp.id}`}
            style={{
              top: handleSpacing(i, inputs.length),
              background: color,
              width: '10px',
              height: '10px',
              border: '2px solid #1e293b',
              borderRadius: '50%',
            }}
          />
          {inp.label && (
            <span
              style={{
                position: 'absolute',
                left: '14px',
                top: handleSpacing(i, inputs.length),
                transform: 'translateY(-50%)',
                fontSize: '10px',
                color: '#64748b',
                pointerEvents: 'none',
              }}
            >
              {inp.label}
            </span>
          )}
        </div>
      ))}

      {/* ── Output Handles (right side) ── */}
      {outputs.map((out, i) => (
        <div key={`${id}-out-wrap-${i}`}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${out.id}`}
            style={{
              top: handleSpacing(i, outputs.length),
              background: color,
              width: '10px',
              height: '10px',
              border: '2px solid #1e293b',
              borderRadius: '50%',
            }}
          />
          {out.label && (
            <span
              style={{
                position: 'absolute',
                right: '14px',
                top: handleSpacing(i, outputs.length),
                transform: 'translateY(-50%)',
                fontSize: '10px',
                color: '#64748b',
                pointerEvents: 'none',
                textAlign: 'right',
              }}
            >
              {out.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
});

BaseNode.displayName = 'BaseNode';

export default BaseNode;
