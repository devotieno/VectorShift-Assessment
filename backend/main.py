from collections import defaultdict, deque

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*'],
)


class PipelineNode(BaseModel):
    id: str
    type: str | None = None
    data: dict = Field(default_factory=dict)


class PipelineEdge(BaseModel):
    id: str | None = None
    source: str
    target: str


class PipelinePayload(BaseModel):
    nodes: list[PipelineNode] = Field(default_factory=list)
    edges: list[PipelineEdge] = Field(default_factory=list)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: list[PipelineNode], edges: list[PipelineEdge]) -> bool:
    node_ids = {node.id for node in nodes}
    adjacency = defaultdict(list)
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        if edge.source not in node_ids or edge.target not in node_ids:
            return False

        adjacency[edge.source].append(edge.target)
        indegree[edge.target] += 1

    queue = deque([node_id for node_id, degree in indegree.items() if degree == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1

        for neighbor in adjacency[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelinePayload):
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_dag(pipeline.nodes, pipeline.edges),
    }
