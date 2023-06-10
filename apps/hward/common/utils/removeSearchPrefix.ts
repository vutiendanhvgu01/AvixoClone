const removeSearchPrefix = (string: string, prefix = 'C-'): string => {
  if (!string.length) return string;

  return string.toUpperCase().startsWith(prefix) ? string.slice(prefix?.length) : string;
};

export default removeSearchPrefix;
