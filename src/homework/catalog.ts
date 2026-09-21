const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const isSupabaseUuid = (value: string) => UUID_PATTERN.test(value);

const expandRange = (start: number, end: number) => {
  const low = Math.min(start, end);
  const high = Math.max(start, end);
  return Array.from({ length: high - low + 1 }, (_, index) => low + index);
};

export const parseQuestionNumbers = (value: string) => {
  const values = value
    .split(/[\s,，、;；]+/)
    .flatMap((token) => {
      const range = token.match(/^(\d+)\s*[-–—]\s*(\d+)$/);
      if (range) return expandRange(Number(range[1]), Number(range[2]));
      return /^\d+$/.test(token) ? [Number(token)] : [];
    });

  return Array.from(new Set(values.filter((number) => number > 0)));
};
