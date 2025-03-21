import createCache from "@emotion/cache";

/**
 * Creates an Emotion cache for MUI styling
 * @returns Emotion cache instance
 */
export const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};
