import pytest
from main import check_is_dag

def test_empty_pipeline():
    # Empty nodes and edges should be acyclic (DAG)
    assert check_is_dag([], []) is True

def test_single_node():
    # Single node with no edges should be acyclic
    nodes = [{"id": "A"}]
    assert check_is_dag(nodes, []) is True

def test_simple_dag():
    # A -> B -> C (DAG)
    nodes = [{"id": "A"}, {"id": "B"}, {"id": "C"}]
    edges = [
        {"source": "A", "target": "B"},
        {"source": "B", "target": "C"}
    ]
    assert check_is_dag(nodes, edges) is True

def test_simple_cycle():
    # A -> B -> A (Cycle)
    nodes = [{"id": "A"}, {"id": "B"}]
    edges = [
        {"source": "A", "target": "B"},
        {"source": "B", "target": "A"}
    ]
    assert check_is_dag(nodes, edges) is False

def test_self_loop():
    # A -> A (Cycle)
    nodes = [{"id": "A"}]
    edges = [{"source": "A", "target": "A"}]
    assert check_is_dag(nodes, edges) is False

def test_complex_dag():
    # A -> B -> D
    # A -> C -> D
    nodes = [{"id": "A"}, {"id": "B"}, {"id": "C"}, {"id": "D"}]
    edges = [
        {"source": "A", "target": "B"},
        {"source": "A", "target": "C"},
        {"source": "B", "target": "D"},
        {"source": "C", "target": "D"}
    ]
    assert check_is_dag(nodes, edges) is True

def test_complex_cycle():
    # A -> B -> C -> D -> B (Cycle in B-C-D)
    nodes = [{"id": "A"}, {"id": "B"}, {"id": "C"}, {"id": "D"}]
    edges = [
        {"source": "A", "target": "B"},
        {"source": "B", "target": "C"},
        {"source": "C", "target": "D"},
        {"source": "D", "target": "B"}
    ]
    assert check_is_dag(nodes, edges) is False

def test_disconnected_dag():
    # A -> B and C -> D (Disconnected but acyclic)
    nodes = [{"id": "A"}, {"id": "B"}, {"id": "C"}, {"id": "D"}]
    edges = [
        {"source": "A", "target": "B"},
        {"source": "C", "target": "D"}
    ]
    assert check_is_dag(nodes, edges) is True
