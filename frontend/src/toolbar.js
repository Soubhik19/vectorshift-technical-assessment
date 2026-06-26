// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{
          padding: '12px 20px',
          background: '#0f172a',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          fontFamily: '"Inter", sans-serif',
        }}>
            {/* Logo / Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '12px' }}>
              <span style={{ fontSize: '20px' }}>⚡</span>
              <span style={{ 
                color: '#e2e8f0', 
                fontWeight: 700, 
                fontSize: '16px',
                letterSpacing: '-0.02em',
              }}>
                VectorShift
              </span>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '32px', background: '#334155' }} />

            {/* Core Nodes */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', marginRight: '4px' }}>Core</span>
              <DraggableNode type='customInput' label='Input' icon='📥' color='#10b981' />
              <DraggableNode type='llm' label='LLM' icon='🤖' color='#8b5cf6' />
              <DraggableNode type='customOutput' label='Output' icon='📤' color='#3b82f6' />
              <DraggableNode type='text' label='Text' icon='📝' color='#f59e0b' />
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '32px', background: '#334155' }} />

            {/* RAG Pipeline Nodes */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', marginRight: '4px' }}>RAG Pipeline</span>
              <DraggableNode type='fileLoader' label='File Loader' icon='📄' color='#06b6d4' />
              <DraggableNode type='chunker' label='Chunker' icon='✂️' color='#ec4899' />
              <DraggableNode type='embedding' label='Embedding' icon='🧬' color='#14b8a6' />
              <DraggableNode type='vectorStore' label='Vector Store' icon='🗄️' color='#a855f7' />
              <DraggableNode type='retriever' label='Retriever' icon='🔍' color='#f97316' />
            </div>
        </div>
    );
};

