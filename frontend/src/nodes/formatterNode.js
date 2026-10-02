import { createNodeComponent } from './nodeFactory';
import { getNodeConfig } from './nodeCatalog';

export const FormatterNode = createNodeComponent(getNodeConfig('formatter'));
