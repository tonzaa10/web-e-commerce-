type CACHE_TAG = 'users';

export const getGlobalTag = async(tag: CACHE_TAG) => {
  return `global:${tag}` as const // Returns a global cache tag
}

export const getIdTag = async (tag: CACHE_TAG, id: string) => {
    return `id:${id}-${tag}` as const // Returns a cache tag for a specific id  
}