export const API_BASE = import.meta.env.VITE_API_BASE ?? '';

async function parseError(res: Response): Promise<string> {
  const text = await res.text().catch(() => '');
  return text || res.statusText;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${await parseError(res)}`);
  }

  return res.json() as Promise<T>;
}

export async function apiPostJson<T>(path: string, body: any, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${await parseError(res)}`);
  }

  return res.json() as Promise<T>;
}

export async function apiPostRaw<T>(path: string, body: ArrayBuffer | Uint8Array | Blob, contentType: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    ...init,
    headers: {
      'Content-Type': contentType,
      ...(init?.headers ?? {}),
    },
    body: body as any,
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${await parseError(res)}`);
  }

  return res.json() as Promise<T>;
}
