// retrieverNode.js
// WHAT THIS FILE DOES: Queries the vector store with a user question to find relevant chunks.
// WHY BUILT THIS WAY: The final step before the LLM — retriever pulls the most relevant
//   context from the vector store so the LLM can answer with grounded knowledge.
// WHAT TO SAY IN INTERVIEW: "The retriever takes a query and a vector index, performs
//   similarity search, and returns the top-K most relevant chunks. These chunks then
//   feed into the LLM's prompt as context — that's the R in RAG."

import { useState, useCallback, memo } from 'react';
import BaseNode, { fieldStyle, labelStyle } from './BaseNode';

export const RetrieverNode = memo(({ id, data }) => {
  const [topK, setTopK] = useState(data?.topK || 5);
  const handleTopKChange = useCallback((e) => setTopK(parseInt(e.target.value)), []);

  return (
    <BaseNode
      id={id}
      title="Retriever"
      icon="🔍"
      color="#f97316"
      inputs={[
        { id: 'query', label: 'query' },
        { id: 'index', label: 'index' },
      ]}
      outputs={[{ id: 'context', label: 'context' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Top K Results: {topK}</label>
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={topK}
          onChange={handleTopKChange}
          style={{ width: '100%', accentColor: '#f97316' }}
        />
      </div>
      <p style={{ fontSize: '11px', color: '#475569', margin: 0 }}>
        Retrieves the most relevant document chunks from the vector store.
      </p>
    </BaseNode>
  );
});

RetrieverNode.displayName = 'RetrieverNode';

