import { createNodeComponent } from './nodeFactory';
import { getNodeConfig } from './nodeCatalog';

export const MathNode = createNodeComponent(getNodeConfig('math'));
