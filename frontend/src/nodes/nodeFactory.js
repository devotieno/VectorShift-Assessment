import { useState } from 'react';
import { Handle } from 'reactflow';

const renderSelectOptions = (options) => options.map((option) => {
  if (typeof option === 'string') {
    return <option key={option} value={option}>{option}</option>;
  }

  return <option key={option.value} value={option.value}>{option.label}</option>;
});

const renderField = (field, value, onChange) => {
  if (field.type === 'select') {
    return (
      <label className="vs-node__field" key={field.name}>
        <span>{field.label}</span>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {renderSelectOptions(field.options || [])}
        </select>
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label className="vs-node__field" key={field.name}>
        <span>{field.label}</span>
        <textarea
          rows={field.rows || 3}
          value={value}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <label className="vs-node__field vs-node__field--checkbox" key={field.name}>
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>{field.label}</span>
      </label>
    );
  }

  return (
    <label className="vs-node__field" key={field.name}>
      <span>{field.label}</span>
      <input
        type="text"
        value={value}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
};

export const createNodeComponent = (config) => {
  const NodeComponent = ({ id, data }) => {
    const [values, setValues] = useState(() => (config.defaultState ? config.defaultState({ id, data }) : {}));

    const handles = config.handles || [];

    return (
      <div
        className="vs-node"
        style={{
          width: config.width || 280,
          minHeight: config.minHeight || 200,
          '--node-accent': config.accent || '#44d4ff',
        }}
      >
        <div className="vs-node__accent" />
        {handles.map((handle) => (
          <Handle
            key={`${id}-${handle.idSuffix}`}
            type={handle.type}
            position={handle.position}
            id={`${id}-${handle.idSuffix}`}
            style={handle.style}
          />
        ))}
        <div className="vs-node__header">
          <span className="vs-node__badge">{config.label}</span>
          <h3>{config.title}</h3>
          <p>{config.description}</p>
        </div>
        <div className="vs-node__body">
          {(config.fields || []).map((field) => renderField(field, values[field.name] ?? '', (nextValue) => {
            setValues((currentValues) => ({
              ...currentValues,
              [field.name]: nextValue,
            }));
          }))}
        </div>
      </div>
    );
  };

  return NodeComponent;
};
