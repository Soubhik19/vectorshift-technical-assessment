// chunkerNode.js
// WHAT THIS FILE DOES: Splits documents into smaller chunks for processing.
// WHY BUILT THIS WAY: LLMs have context limits — you can't feed a 100-page PDF in one shot.
//   Chunking splits it into manageable pieces with configurable size and overlap.
// WHAT TO SAY IN INTERVIEW: "After loading a file, you need to chunk it. This node
//   lets you configure chunk size and overlap — standard RAG preprocessing."

import { useState, useCallback, memo } from 'react';
import BaseNode, { fieldStyle, labelStyle } from './BaseNode';

export const ChunkerNode = memo(({ id, data }) => {
  const [chunkSize, setChunkSize] = useState(data?.chunkSize || 512);
  const [overlap, setOverlap] = useState(data?.overlap || 50);

  const handleChunkChange = useCallback((e) => setChunkSize(parseInt(e.target.value)), []);
  const handleOverlapChange = useCallback((e) => setOverlap(parseInt(e.target.value)), []);

  return (
    <BaseNode
      id={id}
      title="Chunker"
      icon="✂️"
      color="#ec4899"
      inputs={[{ id: 'document', label: 'document' }]}
      outputs={[{ id: 'chunks', label: 'chunks' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Chunk Size: {chunkSize}</label>
        <input
          type="range"
          min="128"
          max="2048"
          step="128"
          value={chunkSize}
          onChange={handleChunkChange}
          style={{ width: '100%', accentColor: '#ec4899' }}
        />
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>Overlap: {overlap}</label>
        <input
          type="range"
          min="0"
          max="200"
          step="10"
          value={overlap}
          onChange={handleOverlapChange}
          style={{ width: '100%', accentColor: '#ec4899' }}
        />
      </div>
    </BaseNode>
  );
});

ChunkerNode.displayName = 'ChunkerNode';

