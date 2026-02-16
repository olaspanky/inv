
export const setAuthTokens = (token: string, refreshToken: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }
};

export const getAuthTokens = (): { token: string | null; refreshToken: string | null } => {
  if (typeof window !== 'undefined') {
    return {
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken')
    };
  }
  return { token: null, refreshToken: null };
};

export const clearAuthTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
localStorage.removeItem('user');
  }
};

export const isLoggedIn = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false;
};