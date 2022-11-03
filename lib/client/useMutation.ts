import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data: any) {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((json) => setData(json))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }
  return [mutation, { loading, data, error }];
}

// export default function useMutation(
//   url: string
// ): [
//   (data: any) => void,
//   { loading: boolean; data: undefined | any; error: undefined | any }
// ] {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<undefined | any>(undefined);
//   const [error, seterror] = useState<undefined | any>(undefined);
//   function mutation(data: any) {}
//   return [mutation, { loading, data, error }];
// }
