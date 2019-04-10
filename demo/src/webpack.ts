import SassPlugin from '@pawjs/sass/webpack';
import LessPlugin from '@pawjs/less/webpack';
import ImageOptimizerPlugin from '@pawjs/image-optimizer/webpack';
import SrcsetPlugin from '@pawjs/srcset/webpack';

export default class ClientWebpack {
  constructor({ addPlugin }) {
    addPlugin(new SassPlugin());
    addPlugin(new LessPlugin());
    addPlugin(new ImageOptimizerPlugin({ supportedEnv: ['production', 'development'] }));
    addPlugin(new SrcsetPlugin());
  }
}