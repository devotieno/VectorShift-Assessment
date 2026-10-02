// toolbar.js

import { DraggableNode } from './draggableNode';
import { TOOLBAR_NODES } from './nodes/nodeRegistry';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar-shell">
            <div className="toolbar-shell__title">Node Library</div>
            <div className="toolbar-shell__grid">
                {TOOLBAR_NODES.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </div>
        </div>
    );
};
