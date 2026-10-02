import { createNodeComponent } from './nodeFactory';
import { getNodeConfig } from './nodeCatalog';

export const InputNode = createNodeComponent(getNodeConfig('customInput'));
