import { createFilter } from 'rollup-pluginutils';

export default function tinyTransfrom(options) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'tiny-transform',
    transform (code, id) {
      if (!filter(id)) return;
      console.log(111, code);
      return {
        code: code,
        
      }
    }
  }
}