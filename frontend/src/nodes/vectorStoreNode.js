// vectorStoreNode.js
// WHAT THIS FILE DOES: Stores and indexes vector embeddings for retrieval.
// WHY BUILT THIS WAY: After embedding, you need a database to store and search vectors.
//   This node configures the vector DB provider and collection.
// WHAT TO SAY IN INTERVIEW: "This is the storage layer of RAG. It takes embeddings
//   and stores them in a vector database like Pinecone or ChromaDB. The collection
//   name lets users organize different knowledge bases."

import { useState, useCallback, memo } from 'react';
import BaseNode, { fieldStyle, labelStyle, inputStyle } from './BaseNode';

export const VectorStoreNode = memo(({ id, data }) => {
  const [provider, setProvider] = useState(data?.provider || 'Pinecone');
  const [collection, setCollection] = useState(data?.collection || 'default');

  const handleProviderChange = useCallback((e) => setProvider(e.target.value), []);
  const handleCollectionChange = useCallback((e) => setCollection(e.target.value), []);

  return (
    <BaseNode
      id={id}
      title="Vector Store"
      icon="🗄️"
      color="#a855f7"
      inputs={[{ id: 'vectors', label: 'vectors' }]}
      outputs={[{ id: 'index', label: 'index' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Provider</label>
        <select
          style={{ ...inputStyle, cursor: 'pointer' }}
          value={provider}
          onChange={handleProviderChange}
        >
          <option value="Pinecone">Pinecone</option>
          <option value="ChromaDB">ChromaDB</option>
          <option value="Weaviate">Weaviate</option>
          <option value="FAISS">FAISS (Local)</option>
        </select>
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>Collection</label>
        <input
          style={inputStyle}
          value={collection}
          onChange={handleCollectionChange}
        />
      </div>
    </BaseNode>
  );
});

VectorStoreNode.displayName = 'VectorStoreNode';

