import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock React Flow since it relies on browser layout dimensions that aren't available in JSDom environment
jest.mock('reactflow', () => {
  const ReactFlow = ({ children }) => <div data-testid="react-flow">{children}</div>;
  const MiniMap = () => <div data-testid="minimap" />;
  const Controls = () => <div data-testid="controls" />;
  const Background = () => <div data-testid="background" />;
  const Handle = () => <div data-testid="handle" />;

  return {
    __esModule: true,
    default: ReactFlow,
    MiniMap,
    Controls,
    Background,
    Handle,
    Position: {
      Left: 'left',
      Right: 'right',
      Top: 'top',
      Bottom: 'bottom',
    },
  };
});

test('renders pipeline toolbar and canvas layout', () => {
  render(<App />);
  
  // Verify that the title/branding in the toolbar renders
  const brandingElement = screen.getByText(/VectorShift/i);
  expect(brandingElement).toBeInTheDocument();
  
  // Verify that core node categories render
  const coreCategory = screen.getByText(/CORE/i);
  expect(coreCategory).toBeInTheDocument();
  
  const ragCategory = screen.getByText(/RAG PIPELINE/i);
  expect(ragCategory).toBeInTheDocument();
  
  // Verify submit button renders
  const submitButton = screen.getByText(/Submit Pipeline/i);
  expect(submitButton).toBeInTheDocument();
});
