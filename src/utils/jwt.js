function base64UrlDecode(base64Url) {

  let base64 = base64Url
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const padding = base64.length % 4;
  if (padding) {
    base64 += '='.repeat(4 - padding); 
  }

  return atob(base64);
}

export function decodeJwt(token) {
  const parts = token.split('.');
  console.log("parts", parts);
  if (parts.length !== 3) {
    console.log("Invalid JWT token", token);
    throw new Error('Invalid JWT token');
  }

  const payload = parts[1];

  const decodedPayload = base64UrlDecode(payload);
  return JSON.parse(decodedPayload);
}
