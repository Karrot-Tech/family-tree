import { parents } from './parents';
import { middle } from './middle';
import { children } from './children';
import type { Connector, Family } from '../types';

type ConnectorBuilder = (families: readonly Family[]) => readonly Connector[];
const toConnectors = (families: readonly Family[]) => (fn: ConnectorBuilder) => fn(families);

export const connectors = (families: readonly Family[]): readonly Connector[] => (
  [parents, middle, children].map(toConnectors(families)).flat()
);
