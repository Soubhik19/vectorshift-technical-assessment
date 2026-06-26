from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import deque, defaultdict

app = FastAPI()

# Add CORS Middleware to allow requests from the React frontend (running on port 3000/3001/3002)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for the assessment/local testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def check_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    # Build graph and in-degrees
    node_ids = {node["id"] for node in nodes}
    
    # In case there are nodes in edges that are not explicitly defined in nodes list,
    # we collect them to avoid KeyErrors.
    for edge in edges:
        node_ids.add(edge["source"])
        node_ids.add(edge["target"])
        
    in_degree = {node_id: 0 for node_id in node_ids}
    graph = defaultdict(list)
    
    for edge in edges:
        src = edge["source"]
        tgt = edge["target"]
        graph[src].append(tgt)
        in_degree[tgt] += 1
        
    # Topological sort using Kahn's algorithm
    queue = deque([n for n, deg in in_degree.items() if deg == 0])
    visited = 0
    
    while queue:
        n = queue.popleft()
        visited += 1
        for nbr in graph[n]:
            in_degree[nbr] -= 1
            if in_degree[nbr] == 0:
                queue.append(nbr)
                
    # If the number of visited nodes equals the total number of nodes, it is a DAG
    return visited == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
