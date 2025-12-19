import request from '@/api/request';

interface authType {
  account: string;
  password: string;
  role: 0 | 1 | 2;
}

export const register = async (data: authType) => {
  return await request({
    url: '/auth/register',
    method: 'POST',
    data,
  });
};

export const login = async (data: authType) => {
  return await request({
    url: '/auth/login',
    method: 'POST',
    data,
  });
};

export const logout = async (data: authType) => {
  return await request({
    url: '/auth/login',
    method: 'POST',
    data,
  });
};