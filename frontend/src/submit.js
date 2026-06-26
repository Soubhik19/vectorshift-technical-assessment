// submit.js
// WHAT THIS FILE DOES: Sends pipeline topology to the backend for DAG validation.
// WHY BUILT THIS WAY: Reads nodes/edges directly from the zustand store, sends them
//   as JSON to the /pipelines/parse endpoint, and displays the result as an alert.
// WHAT TO SAY IN INTERVIEW: "The submit button reads the current pipeline state from
//   the store, sends nodes and edges to a FastAPI backend that runs a DFS cycle check,
//   and shows the user whether their pipeline is a valid DAG."

import { useState, useCallback } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);

    const isEmpty = nodes.length === 0;

    const handleSubmit = useCallback(async () => {
      if (isEmpty) return;
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8000/pipelines/parse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nodes, edges }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        const dagStatus = data.is_dag ? '✅ Yes' : '❌ No — pipeline has a cycle';

        alert(
          `Pipeline Analysis\n` +
          `━━━━━━━━━━━━━━━━━━━━━\n` +
          `Nodes: ${data.num_nodes}\n` +
          `Edges: ${data.num_edges}\n` +
          `Valid Pipeline (DAG): ${dagStatus}`
        );
      } catch (error) {
        alert(`Error: ${error.message}\n\nMake sure the backend is running:\nuvicorn main:app --reload`);
      } finally {
        setLoading(false);
      }
    }, [nodes, edges, isEmpty]);

    return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '16px',
          background: '#0f172a',
          borderTop: '1px solid #1e293b',
        }}>
            {/* Node/edge count indicator */}
            <span style={{
              fontSize: '12px',
              color: '#64748b',
              fontFamily: '"Inter", sans-serif',
            }}>
              {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} edge{edges.length !== 1 ? 's' : ''}
            </span>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isEmpty || loading}
              style={{
                padding: '10px 32px',
                background: isEmpty
                  ? '#334155'
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: isEmpty ? '#64748b' : '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: isEmpty ? 'not-allowed' : 'pointer',
                fontFamily: '"Inter", sans-serif',
                transition: 'all 0.2s ease',
                boxShadow: isEmpty ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isEmpty && !loading) {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isEmpty && !loading) {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? '⏳ Validating...' : '⚡ Submit Pipeline'}
            </button>
        </div>
    );
};
