import compose from 'compose-function';
import { withQueryClient } from './withQueryClient';
import { withStrictMode } from './withStrictMode';

export const withProviders = compose(withStrictMode, withQueryClient);
