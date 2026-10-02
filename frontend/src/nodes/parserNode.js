import { createNodeComponent } from './nodeFactory';
import { getNodeConfig } from './nodeCatalog';

export const ParserNode = createNodeComponent(getNodeConfig('parser'));
