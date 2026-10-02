import { InputNode } from './inputNode';
import { LLMNode } from './llmNode';
import { OutputNode } from './outputNode';
import { TextNode } from './textNode';
import { FormatterNode } from './formatterNode';
import { BranchNode } from './branchNode';
import { MathNode } from './mathNode';
import { ParserNode } from './parserNode';
import { JoinNode } from './joinNode';
import { NODE_ORDER } from './nodeCatalog';

export const NODE_TYPES = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  formatter: FormatterNode,
  branch: BranchNode,
  math: MathNode,
  parser: ParserNode,
  join: JoinNode,
};

export const TOOLBAR_NODES = NODE_ORDER.map((type) => ({
  type,
  label: type === 'customInput' ? 'Input' : type === 'customOutput' ? 'Output' : type === 'llm' ? 'LLM' : type.charAt(0).toUpperCase() + type.slice(1),
}));

