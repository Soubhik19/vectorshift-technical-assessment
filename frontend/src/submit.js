// submit.js
// WHAT THIS FILE DOES: Sends pipeline topology to the backend for DAG validation
//   and displays the result in a custom glassmorphism modal instead of browser alert.
// WHY BUILT THIS WAY: Prevents browser alert blocking (when Chrome suppresses popups)
//   and provides a modern, premium UX consistent with VectorShift's dark theme.

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
    const [modalData, setModalData] = useState(null);

    const isEmpty = nodes.length === 0;

    const handleSubmit = useCallback(async () => {
      if (isEmpty) return;
      setLoading(true);

      try {
        const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';

        const response = await fetch(`${backendBaseUrl.replace(/\/$/, '')}/pipelines/parse`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nodes, edges }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        setModalData({
          success: true,
          num_nodes: data.num_nodes,
          num_edges: data.num_edges,
          is_dag: data.is_dag,
        });
      } catch (error) {
        setModalData({
          success: false,
          error: error.message,
        });
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

            {/* Custom Modal Popup */}
            {modalData && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(8px)',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}>
                <div style={{
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '16px',
                  padding: '28px',
                  width: '100%',
                  maxWidth: '420px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  fontFamily: '"Inter", sans-serif',
                  color: '#f1f5f9',
                  animation: 'fadeIn 0.2s ease-out',
                }}>
                  {modalData.success ? (
                    <>
                      <h3 style={{
                        margin: '0 0 16px 0',
                        fontSize: '20px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: modalData.is_dag ? '#10b981' : '#f43f5e',
                      }}>
                        {modalData.is_dag ? '✅ DAG Validation Passed' : '❌ Cycle Detected'}
                      </h3>
                      
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        marginBottom: '24px',
                        background: '#0f172a',
                        padding: '16px',
                        borderRadius: '10px',
                        border: '1px solid #1e293b',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#94a3b8' }}>Total Nodes:</span>
                          <span style={{ fontWeight: 600 }}>{modalData.num_nodes}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#94a3b8' }}>Total Edges:</span>
                          <span style={{ fontWeight: 600 }}>{modalData.num_edges}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94a3b8' }}>Pipeline Status:</span>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: modalData.is_dag ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                            color: modalData.is_dag ? '#10b981' : '#f43f5e',
                          }}>
                            {modalData.is_dag ? 'Valid DAG' : 'Invalid Pipeline'}
                          </span>
                        </div>
                      </div>

                      {!modalData.is_dag && (
                        <p style={{
                          margin: '0 0 20px 0',
                          fontSize: '13px',
                          color: '#94a3b8',
                          lineHeight: '1.5',
                        }}>
                          Your pipeline contains a closed loop (cycle). Please resolve the loop so the graph forms a Directed Acyclic Graph (DAG) for processing.
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <h3 style={{
                        margin: '0 0 16px 0',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#f43f5e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        ⚠️ Connection Error
                      </h3>
                      <p style={{
                        margin: '0 0 20px 0',
                        fontSize: '14px',
                        color: '#94a3b8',
                        lineHeight: '1.5',
                      }}>
                        {modalData.error}
                      </p>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b',
                        background: '#0f172a',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '24px',
                      }}>
                        Verify that your backend FastAPI server is running:<br/>
                        <code style={{ color: '#e2e8f0', display: 'block', marginTop: '6px' }}>uvicorn main:app --reload --port 8000</code>
                      </div>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => setModalData(null)}
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      background: '#334155',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#475569'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#334155'}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
        </div>
    );
};
