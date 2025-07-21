

type CACHE_TAG = "users";

export const getGlobalTag = (tag: CACHE_TAG) => {
  return `global:${tag}` as const;
};

export const getIdTag = (tag: CACHE_TAG, id: string) => {
  return `id:${id}-${tag}` as const;
};