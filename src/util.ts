export const excerpt = (string: string) => {
  const maxLength = 400;

  if (string.length <= maxLength) {
    return string;
  }

  const truncated = string.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const excerptText = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

  return `${excerptText}...`;
};

