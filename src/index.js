import { createFilter } from 'rollup-pluginutils';

export default function tinyTransfrom(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'tiny-transform',
    transform (code, id) {
      if (!filter(id)) return;

      const reg = /\@tarojs\/taro/;
      const newCode = code.replace(reg, '@tarojs/taro-h5');

      return newCode
    }
  }
}