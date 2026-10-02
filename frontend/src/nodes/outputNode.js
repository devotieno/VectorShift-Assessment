import { createNodeComponent } from './nodeFactory';
import { getNodeConfig } from './nodeCatalog';

export const OutputNode = createNodeComponent(getNodeConfig('customOutput'));
