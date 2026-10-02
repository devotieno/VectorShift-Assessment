import { createNodeComponent } from './nodeFactory';
import { getNodeConfig } from './nodeCatalog';

export const BranchNode = createNodeComponent(getNodeConfig('branch'));
