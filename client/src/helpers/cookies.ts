export const setCookie = (name: string, value: string, seconds: number): void => {
  let expires = '';
  const date = new Date();
  date.setTime(date.getTime() + seconds * 1000);
  expires = '; expires=' + date.toUTCString();
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};
