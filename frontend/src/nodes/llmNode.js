import { createNodeComponent } from './nodeFactory';
import { getNodeConfig } from './nodeCatalog';

export const LLMNode = createNodeComponent(getNodeConfig('llm'));
