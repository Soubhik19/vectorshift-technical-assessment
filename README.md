# VectorShift AI Pipeline Builder (Technical Assessment)

A high-performance, modular, no-code AI workflow builder that lets users drag, connect, and validate complex generative AI pipelines (DAGs). 

This repository implements the VectorShift Frontend and Backend assessment with advanced optimizations, automated testing, and a custom UI.

---

## 🚀 Key Features

*   **Modular Architecture (BaseNode Pattern):** Centralized node renderer (`BaseNode.js`) that dynamically spawns input/output handles, avoiding duplicate code across custom node templates.
*   **9 Custom Nodes (RAG Pipeline Narrative):** Includes standard nodes (Input, Output, LLM, Text) along with a complete, logical Retrieval-Augmented Generation stack (File Loader, Chunker, Embedding, Vector Store, Retriever).
*   **Dynamic Variable Parsing:** Auto-resizing `TextNode` that parses double curly brace patterns (`{{variable}}` and official dot-notations like `{{input_1.text}}`) to dynamically spawn target connection handles.
*   **BFS-Based Cycle Detection (Kahn's Algorithm):** Robust linear-time $O(V + E)$ cycle validation on the FastAPI backend to verify Directed Acyclic Graphs (DAGs) and prevent infinite loop executions.
*   **Custom Glassmorphic Modal:** Replaced native browser alerts with a clean, in-app validation dashboard overlay to avoid browser alert blocking.
*   **Dual Test Suites:** Automated unit testing on the Python backend (`pytest`) and React component tests on the frontend (`Jest`).

---

## 🛠️ Getting Started

### 1. Run the Backend (FastAPI)
Navigate to the `backend` directory, install the dependencies, and start the development server:

```bash
cd backend
python3 -m pip install -r requirements.txt
python3 -m uvicorn main:app --reload --port 8000
```
*The backend will run on `http://localhost:8000`.*

### 2. Run the Frontend (React)
Navigate to the `frontend` directory, install dependencies, and start the React dev server:

```bash
cd frontend
npm install
npm start
```
*The frontend will open automatically on `http://localhost:3002`.*

---

## 🧪 Running the Test Suites

We have integrated automated tests for both the frontend component layout and the backend cycle detection algorithm.

### Run Backend Tests (Pytest)
From the project root directory, run:
```bash
python3 -m pytest backend/test_main.py
```
*(Validates Kahn's algorithm across cyclic, acyclic, self-loop, and disconnected graph topologies).*

### Run Frontend Tests (Jest)
From the `frontend` directory, run:
```bash
cd frontend
CI=true npm test
```
*(Validates React component rendering structures and toolbar components).*

---

## 📐 Architecture & Performance Details

### 1. Performance Optimization
To prevent canvas lag on large graphs, all custom nodes are wrapped in `React.memo` and events (sliders, dropdowns, text inputs) are bound with `useCallback` to prevent cascading render cycles when dragging or connecting nodes.

### 2. BaseNode Abstraction
Rather than duplicating styling, selection handlers, and React Flow markup across nine node components, we created a single unified `BaseNode` interface. Specialized nodes only define their custom inputs/outputs schema and unique inner inputs.
