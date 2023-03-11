const checkStatus = response => {
  if (response.ok) {
    return response;
  }
  throw new Error('404 or 500');
}

const json = response => response.json();

export { checkStatus, json }