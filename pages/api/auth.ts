import axios from '@/lib/axios';

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post('/auth/signIn', { email, password });
    return response.data;
  } catch (error) {
    console.error('로그인 중 오류가 발생하였습니다', error);
    throw error;
  }
};

export const signUp = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string,
) => {
  try {
    const response = await axios.post('/auth/signUp', {
      email,
      nickname,
      password,
      passwordConfirmation,
    });
    return response.data;
  } catch (error) {
    console.error('회원가입 중 오류가 발생하였습니다', error);
    throw error;
  }
};
