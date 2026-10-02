import { Position } from 'reactflow';

const asList = (values) => values.map((value) => ({ label: value, value }));

export const NODE_CATALOG = {
  customInput: {
    type: 'customInput',
    label: 'Input',
    title: 'Source Input',
    description: 'Capture data before it enters the pipeline.',
    accent: '#44d4ff',
    width: 290,
    minHeight: 220,
    defaultState: ({ id, data }) => ({
      inputName: data?.inputName || id.replace('customInput-', 'input_'),
      inputType: data?.inputType || 'Text',
    }),
    fields: [
      { name: 'inputName', label: 'Name', type: 'text', placeholder: 'input_name' },
      { name: 'inputType', label: 'Type', type: 'select', options: asList(['Text', 'File', 'JSON']) },
    ],
    handles: [
      { type: 'source', position: Position.Right, idSuffix: 'value', style: { top: '55%' } },
    ],
  },
  llm: {
    type: 'llm',
    label: 'LLM',
    title: 'Language Model',
    description: 'Blend prompts, system instructions, and responses.',
    accent: '#ffbf69',
    width: 310,
    minHeight: 250,
    defaultState: () => ({
      model: 'gpt-4.1-mini',
      temperature: '0.2',
    }),
    fields: [
      { name: 'model', label: 'Model', type: 'select', options: asList(['gpt-4.1-mini', 'gpt-4.1', 'gpt-4o']) },
      { name: 'temperature', label: 'Temperature', type: 'text', placeholder: '0.2' },
    ],
    handles: [
      { type: 'target', position: Position.Left, idSuffix: 'system', style: { top: '28%' } },
      { type: 'target', position: Position.Left, idSuffix: 'prompt', style: { top: '58%' } },
      { type: 'source', position: Position.Right, idSuffix: 'response', style: { top: '50%' } },
    ],
  },
  customOutput: {
    type: 'customOutput',
    label: 'Output',
    title: 'Destination Output',
    description: 'Choose how results leave the pipeline.',
    accent: '#ff8fb1',
    width: 290,
    minHeight: 220,
    defaultState: ({ id, data }) => ({
      outputName: data?.outputName || id.replace('customOutput-', 'output_'),
      outputType: data?.outputType || 'Text',
    }),
    fields: [
      { name: 'outputName', label: 'Name', type: 'text', placeholder: 'output_name' },
      { name: 'outputType', label: 'Type', type: 'select', options: asList(['Text', 'File', 'Image']) },
    ],
    handles: [
      { type: 'target', position: Position.Left, idSuffix: 'value', style: { top: '55%' } },
    ],
  },
  text: {
    type: 'text',
    label: 'Text',
    title: 'Text Composer',
    description: 'Expand variables like {{input}} into live handles.',
    accent: '#a78bfa',
    width: 360,
    minHeight: 220,
    defaultState: ({ data }) => ({
      text: data?.text || 'Compose with {{input}} and {{context}}',
    }),
  },
  formatter: {
    type: 'formatter',
    label: 'Formatter',
    title: 'Formatter',
    description: 'Shape values into a consistent payload.',
    accent: '#4ade80',
    width: 290,
    minHeight: 230,
    defaultState: () => ({ pattern: '• {{value}}' }),
    fields: [
      { name: 'pattern', label: 'Pattern', type: 'textarea', rows: 3, placeholder: '• {{value}}' },
    ],
    handles: [
      { type: 'target', position: Position.Left, idSuffix: 'input' },
      { type: 'source', position: Position.Right, idSuffix: 'formatted' },
    ],
  },
  branch: {
    type: 'branch',
    label: 'Branch',
    title: 'Conditional Branch',
    description: 'Split a pipeline into true and false paths.',
    accent: '#bef264',
    width: 300,
    minHeight: 230,
    defaultState: () => ({ condition: '{{score}} > 0.5' }),
    fields: [
      { name: 'condition', label: 'Condition', type: 'text', placeholder: '{{score}} > 0.5' },
    ],
    handles: [
      { type: 'target', position: Position.Left, idSuffix: 'input' },
      { type: 'source', position: Position.Right, idSuffix: 'true', style: { top: '32%' } },
      { type: 'source', position: Position.Right, idSuffix: 'false', style: { top: '68%' } },
    ],
  },
  math: {
    type: 'math',
    label: 'Math',
    title: 'Math Engine',
    description: 'Evaluate a formula against upstream values.',
    accent: '#60a5fa',
    width: 290,
    minHeight: 230,
    defaultState: () => ({ expression: '(a + b) / 2' }),
    fields: [
      { name: 'expression', label: 'Expression', type: 'textarea', rows: 3, placeholder: '(a + b) / 2' },
    ],
    handles: [
      { type: 'target', position: Position.Left, idSuffix: 'a', style: { top: '32%' } },
      { type: 'target', position: Position.Left, idSuffix: 'b', style: { top: '68%' } },
      { type: 'source', position: Position.Right, idSuffix: 'result', style: { top: '50%' } },
    ],
  },
  parser: {
    type: 'parser',
    label: 'Parser',
    title: 'Structured Parser',
    description: 'Convert raw text into structured fields.',
    accent: '#fb923c',
    width: 290,
    minHeight: 220,
    defaultState: () => ({ delimiter: ',' }),
    fields: [
      { name: 'delimiter', label: 'Delimiter', type: 'text', placeholder: ',' },
    ],
    handles: [
      { type: 'target', position: Position.Left, idSuffix: 'raw' },
      { type: 'source', position: Position.Right, idSuffix: 'parsed', style: { top: '50%' } },
    ],
  },
  join: {
    type: 'join',
    label: 'Join',
    title: 'Join Stream',
    description: 'Combine two upstream paths into one output.',
    accent: '#38bdf8',
    width: 300,
    minHeight: 220,
    defaultState: () => ({ strategy: 'concatenate' }),
    fields: [
      { name: 'strategy', label: 'Strategy', type: 'select', options: asList(['concatenate', 'zip', 'merge']) },
    ],
    handles: [
      { type: 'target', position: Position.Left, idSuffix: 'left', style: { top: '32%' } },
      { type: 'target', position: Position.Left, idSuffix: 'right', style: { top: '68%' } },
      { type: 'source', position: Position.Right, idSuffix: 'joined', style: { top: '50%' } },
    ],
  },
};

export const NODE_ORDER = [
  'customInput',
  'llm',
  'customOutput',
  'text',
  'formatter',
  'branch',
  'math',
  'parser',
  'join',
];

export const getNodeConfig = (type) => NODE_CATALOG[type];
