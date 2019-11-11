import { createFilter } from 'rollup-pluginutils';
import { transform } from 'babel-core';
import * as t from 'babel-types';

export default function tinyTransfrom(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const replaceString = options.replaceString || '';

  const codeVistor = {
    ImportDeclaration(path) {
      const importValue = path.node.source.value;
      const reg = /\@tarojs\/taro/;
      if (reg.test(importValue)) {
        const newCode = importValue.replace(reg, '@tarojs/taro-h5');
        path.node.source.value = newCode;

        const nervImport = t.importDeclaration([t.importDefaultSpecifier(t.identifier('Nerv'))], t.stringLiteral('nervjs'));
        path.insertBefore(nervImport)
      }
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

      return transformRes.code
    }
  }
}