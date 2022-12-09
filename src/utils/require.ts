
/**
 * vue3使用的vueCli并不支持vue2中的require静态资源导入，故可邓庄一个
 * @see https://vitejs.cn/guide/assets.html#the-public-directory
 * @path 资源地址
 */
export const require = (path: string) => {
    try {
      const handlePath = path.replace('@', '..');
      return new URL(handlePath, import.meta.url).href;
    } catch (error) {
      console.warn(error);
    }
  };
