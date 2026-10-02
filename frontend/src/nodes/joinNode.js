import { createNodeComponent } from './nodeFactory';
import { getNodeConfig } from './nodeCatalog';

export const JoinNode = createNodeComponent(getNodeConfig('join'));
