import useAsync from '../9-useAsync/useAsync';

const DEFAULT_OPTIONS = {
  headers: {'Content-Type': 'application/json'},
};

export default function useFetch(url: string, options = {}, dependencies: Array<unknown> = []) {
  return useAsync(async () => {
    const res = await fetch(url, {...DEFAULT_OPTIONS, ...options});

    if (res.ok) return res.json();

    const json = await res.json();

    return await Promise.reject(json);
  }, dependencies);
}

