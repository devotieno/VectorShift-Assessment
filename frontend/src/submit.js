import { useStore } from './store';

const selectPipeline = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selectPipeline);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('The backend rejected the pipeline.');
            }

            const result = await response.json();
            window.alert(`Pipeline parsed successfully.\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nDAG: ${result.is_dag ? 'Yes' : 'No'}`);
        } catch (error) {
            window.alert(error.message || 'Unable to submit the pipeline.');
        }
    };

    return (
        <div className="submit-bar">
            <button type="button" className="submit-button" onClick={handleSubmit}>
                Parse Pipeline
            </button>
        </div>
    );
};
