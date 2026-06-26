// llmNode.js
// WHAT THIS FILE DOES: Configures the LLM (model, system prompt, temperature).
// WHY BUILT THIS WAY: Multiple input handles (system, prompt) and one output handle
//   (response) — all driven by the inputs/outputs arrays in BaseNode.
// WHAT TO SAY IN INTERVIEW: "The LLM node has two inputs and one output. In the
//   original that was 6 lines of Handle JSX repeated. Now it's two array entries."

import { useState, useCallback, memo } from 'react';
import BaseNode, { fieldStyle, labelStyle, inputStyle } from './BaseNode';

export const LLMNode = memo(({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);

  const handleModelChange = useCallback((e) => setModel(e.target.value), []);
  const handleTempChange = useCallback((e) => setTemperature(parseFloat(e.target.value)), []);

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      color="#8b5cf6"
      minWidth={240}
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Model</label>
        <select
          style={{ ...inputStyle, cursor: 'pointer' }}
          value={model}
          onChange={handleModelChange}
        >
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4o-mini">GPT-4o Mini</option>
          <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
          <option value="claude-sonnet-4-6">Claude Sonnet</option>
        </select>
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>Temperature: {temperature}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={handleTempChange}
          style={{ width: '100%', accentColor: '#8b5cf6' }}
        />
      </div>
      <p style={{ fontSize: '11px', color: '#475569', margin: 0 }}>
        Connect a system prompt and user prompt to generate a response.
      </p>
    </BaseNode>
  );
});

LLMNode.displayName = 'LLMNode';

