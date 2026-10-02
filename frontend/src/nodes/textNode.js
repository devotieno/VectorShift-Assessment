import { useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { getNodeConfig } from './nodeCatalog';

const VARIABLE_PATTERN = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;

const extractVariables = (text) => {
  const matches = [...text.matchAll(VARIABLE_PATTERN)].map((match) => match[1]);
  return [...new Set(matches)];
};

const getNodeSize = (text) => {
  const lines = text.split('\n');
  const longestLine = lines.reduce((longest, line) => Math.max(longest, line.length), 0);

  return {
    width: Math.min(460, Math.max(300, longestLine * 9 + 108)),
    height: Math.min(420, Math.max(190, lines.length * 28 + 120)),
  };
};

export const TextNode = ({ id, data }) => {
  const config = getNodeConfig('text');
  const [currText, setCurrText] = useState(data?.text || 'Compose with {{input}} and {{context}}');
  const variables = useMemo(() => extractVariables(currText), [currText]);
  const size = useMemo(() => getNodeSize(currText), [currText]);

  return (
    <div
      className="vs-node vs-node--text"
      style={{
        width: size.width,
        minHeight: size.height,
        '--node-accent': config.accent,
      }}
    >
      <div className="vs-node__accent" />
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${72 + index * 28}px` }}
        />
      ))}
      <div className="vs-node__header">
        <span className="vs-node__badge">{config.label}</span>
        <h3>{config.title}</h3>
        <p>{config.description}</p>
      </div>
      <div className="vs-node__body">
        <label className="vs-node__field">
          <span>Text</span>
          <textarea value={currText} onChange={(event) => setCurrText(event.target.value)} rows={4} />
        </label>
        <div className="vs-node__hint">
          {variables.length > 0 ? `Variables detected: ${variables.join(', ')}` : 'Add {{variable}} tokens to create handles.'}
        </div>
      </div>
    </div>
  );
};

