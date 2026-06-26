// draggableNode.js
import { useStore } from './store';
import { useCallback } from 'react';

export const DraggableNode = ({ type, label, icon = '⚙️', color = '#6c63ff' }) => {
    const addNode = useStore((state) => state.addNode);
    const getNodeID = useStore((state) => state.getNodeID);

    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const handleDoubleClick = useCallback(() => {
      const nodeID = getNodeID(type);
      // Random offset near center of canvas to prevent stacking
      const x = 200 + Math.random() * 150;
      const y = 150 + Math.random() * 150;
      const newNode = {
        id: nodeID,
        type,
        position: { x, y },
        data: { id: nodeID, nodeType: type },
      };
      addNode(newNode);
    }, [type, addNode, getNodeID]);
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        onDoubleClick={handleDoubleClick}
        title="Drag to canvas or double-click to add"
        style={{ 
          cursor: 'grab', 
          padding: '6px 12px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: `${color}15`,
          border: `1px solid ${color}40`,
          justifyContent: 'center', 
          gap: '6px',
          transition: 'all 0.2s ease',
          userSelect: 'none',
        }} 
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `${color}30`;
          e.currentTarget.style.borderColor = `${color}80`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = `${color}15`;
          e.currentTarget.style.borderColor = `${color}40`;
        }}
        draggable
      >
          <span style={{ fontSize: '13px' }}>{icon}</span>
          <span style={{ 
            color: '#e2e8f0', 
            fontSize: '12px', 
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}>{label}</span>
      </div>
    );
  };