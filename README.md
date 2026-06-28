# ⚡ VectorShift AI Pipeline Builder (DAG)

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React Flow](https://img.shields.io/badge/React_Flow-11.8-orange)](https://reactflow.dev/)
[![Testing](https://img.shields.io/badge/Tests-Passed-brightgreen?logo=pytest)](https://pytest.org/)

A highly performant, modular, no-code AI workflow builder that lets users drag, connect, and validate complex generative AI pipelines (DAGs). Inspired by VectorShift's core product design, this application is optimized for responsiveness, clean code architecture, and bulletproof cycle detection.

---

## 🌟 Key Highlights & Enhancements

### 📐 1. Clean Architecture (BaseNode Pattern)
We decoupled card layout logic from node-specific logic. All custom nodes extend a single centralized **`BaseNode`** template. This handles:
*   Dynamic Handle mapping for inputs and outputs.
*   Hover/selection shadows, visual indicators, and drag states.
*   Consistent branding across all 9 node configurations.
*   *Result:* Code replication reduced by over 80%. Spawning a new node takes under 15 lines of code.

### ⚡ 2. High-Performance Canvas
In node canvas applications, rendering is a major performance bottleneck. We implemented React Flow best practices:
*   All custom node components are wrapped in **`React.memo`**.
*   All state setters and parameter changes are bound with **`useCallback`**.
*   *Result:* Zero render lag. Moving, resizing, and connection events remain butter-smooth even on larger pipelines.

### 📝 3. Dynamic Variable Binding (Dot-Notation)
The **Text Node** is equipped with a real-time regex parser that detects variables enclosed in `{{curly_braces}}`.
*   Supports the official VectorShift dot-notation syntax (e.g., `{{input_1.text}}` or `{{llm_2.response}}`).
*   Dynamically spawns target connection handles on the left.
*   Keeps track of handle references in React state so user-drawn connection lines do not break while typing.

### 🧬 4. Linear-Time Cycle Detection (Kahn's BFS)
Instead of recursion-heavy Depth-First Search (which risk call-stack limit crashes), the FastAPI backend implements **Kahn's Algorithm (BFS topological sort)**.
*   Computes node in-degrees and processes connections in linear $O(V + E)$ time.
*   Safely catches loops and infinite-execution traps.
*   Validated against a suite of 8 automated unit tests in `pytest`.

### 🎨 5. Premium Glassmorphic Modal UI
Replaced default browser alerts with a custom, in-app validation modal overlay. Matches VectorShift's dark dashboard style and avoids Chrome alert blocking.

---

## 📦 9 Modular Nodes Implemented

### Core Nodes:
1.  📥 **Input Node:** Custom variables (Text, File, or Image formats).
2.  📤 **Output Node:** Pipeline results.
3.  📝 **Text Node:** Template builder with auto-resizing text area and dynamic handle generation.
4.  🤖 **LLM Node:** Generative reasoning with adjustable model settings and temperature sliders.

### RAG Pipeline Nodes:
5.  📄 **File Loader:** Import files (PDF, TXT, CSV) into the workflow.
6.  ✂️ **Chunker:** Set sliding window sizes and chunk overlaps.
7.  🔢 **Embedding:** Transform chunks into vector representations (OAI / Cohere / HuggingFace).
8.  🗄️ **Vector Store:** Index and store vectors (Pinecone, ChromaDB).
9.  🔍 **Retriever:** Search and retrieve relevant document contexts.

---

## 🚀 Getting Started

### 1. Start the Backend (FastAPI)
```bash
cd backend
python3 -m pip install -r requirements.txt
python3 -m uvicorn main:app --reload --port 8000
```
*Backend runs on `http://localhost:8000`.*

### 2. Start the Frontend (React)
```bash
cd frontend
npm install
npm start
```
*Frontend runs on `http://localhost:3002`.*

---

## 🧪 Automated Testing

### Backend Unit Tests (Pytest)
```bash
python3 -m pytest backend/test_main.py
```
*(Tests cyclic, acyclic, self-loops, and disconnected graph topologies).*

### Frontend Component Tests (Jest)
```bash
cd frontend
CI=true npm test
```
*(Tests React Flow rendering structures).*
