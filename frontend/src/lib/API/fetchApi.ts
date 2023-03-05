export async function get(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export async function post(url: string, body: object) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body }),
  });
  return response;
}

export async function put(url: string, body: object) {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body }),
  });
  return response;
}

export async function patch(url: string, body: object) {
  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body }),
  });
  return response;
}

export async function remove(url: string) {
  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}
