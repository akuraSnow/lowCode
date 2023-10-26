import { RegisterFormBuilder, iocContainer } from 'dynamic-builder';
import skeleton from './skeleton/index';
import extension from './extension/index';
import RenderProvider from './render/index';

import { extension as lowCodeExtension } from 'dynamic-provider';
import components from './components';

export default function initBuilder() {
  RegisterFormBuilder.use({
    components,
    extension: [...lowCodeExtension, ...extension],
    skeleton: skeleton,
  }).render(RenderProvider);
}
