// embeddingNode.js
// WHAT THIS FILE DOES: Converts text chunks into vector embeddings.
// WHY BUILT THIS WAY: You can't search text directly in a vector store — you need
//   to convert it to numbers (embeddings) first. This node picks the model.
// WHAT TO SAY IN INTERVIEW: "Embeddings convert text into numerical vectors that
//   capture semantic meaning. This node lets you pick the embedding model and
//   dimension size — which affects accuracy vs. speed tradeoffs."

import { useState, useCallback, memo } from 'react';
import BaseNode, { fieldStyle, labelStyle, inputStyle } from './BaseNode';

export const EmbeddingNode = memo(({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'text-embedding-3-small');
  const handleModelChange = useCallback((e) => setModel(e.target.value), []);

  return (
    <BaseNode
      id={id}
      title="Embedding"
      icon="🧬"
      color="#14b8a6"
      inputs={[{ id: 'chunks', label: 'chunks' }]}
      outputs={[{ id: 'vectors', label: 'vectors' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Model</label>
        <select
          style={{ ...inputStyle, cursor: 'pointer' }}
          value={model}
          onChange={handleModelChange}
        >
          <option value="text-embedding-3-small">text-embedding-3-small</option>
          <option value="text-embedding-3-large">text-embedding-3-large</option>
          <option value="text-embedding-ada-002">text-embedding-ada-002</option>
        </select>
      </div>
      <p style={{ fontSize: '11px', color: '#475569', margin: 0 }}>
        Converts text chunks into vector embeddings for semantic search.
      </p>
    </BaseNode>
  );
});

EmbeddingNode.displayName = 'EmbeddingNode';

