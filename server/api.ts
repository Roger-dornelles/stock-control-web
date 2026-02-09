const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends RequestInit {
  body?: any;
}

export async function apiFetch<T>(
  endpoint: string,
  method: HttpMethod,
  options: RequestOptions = {},
  token?: string,
): Promise<T> {
  const { body, ...restOptions } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",

      Authorization: token ? `Bearer ${token}` : "",

      ...restOptions.headers,
    },
    ...restOptions,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const result = await response.json();

  if (!response.ok) {
    return { error: result, statusCode: response.status } as T;
  }

  return result as T;
}
