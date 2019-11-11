import { createFilter } from 'rollup-pluginutils';
import { transform } from 'babel-core';

export default function tinyTransfrom(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const replaceString = options.replaceString || '';

  const codeVistor = {
    ImportDeclaration(path) {
      const importValue = path.node.source.value;
      const reg = /\@tarojs\/taro/;
      const newCode = importValue.replace(reg, '@tarojs/taro-h5');
      path.node.source.value = newCode;
    }
  };

  return {
    name: 'tiny-transform',
    transform (code, id) {
      if (!filter(id)) return;

      const transformRes = transform(code, {
        plugins: {
          visitor: codeVistor
        }
      });

      console.log(transformRes.code);

      return transformRes.code
    }
  }
}