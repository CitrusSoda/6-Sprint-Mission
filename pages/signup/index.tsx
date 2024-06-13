import axios from '@/lib/axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { signUp } from '../api/auth';

interface Inputs {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.push('/');
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const resData = await signUp(
        data.email,
        data.nickname,
        data.password,
        data.passwordConfirmation,
      );
      localStorage.setItem('accessToken', resData.accessToken);
      router.push('/');
    } catch (error) {
      console.error('회원가입 중 오류가 발생하였습니다', error);
    }
  };

  const password = watch('password');

  return (
    <div className="flex w-full flex-col items-center px-4 lg:mx-auto lg:w-[640px]">
      <Link href="/">
        <Image src="/ic_logo.png" alt="main logo" width={198} height={66} />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:mt-10">
        <div className="my-6">
          <p>이메일</p>
          <input
            {...register('email', {
              required: '이메일을 작성해주세요',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '유효한 이메일 주소를 입력해주세요.',
              },
            })}
            type="text"
            placeholder="이메일을 입력해주세요"
            className="mt-4 h-14 w-full rounded-xl bg-[--cool-gray100] px-6 py-4"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="my-6">
          <p>닉네임</p>
          <input
            {...register('nickname', { required: true })}
            type="text"
            placeholder="닉네임을 입력해주세요"
            className="mt-4 h-14 w-full rounded-xl bg-[--cool-gray100] px-6 py-4"
          />
          {errors.nickname && (
            <span className="text-red-500">닉네임을 작성해주세요</span>
          )}
        </div>
        <div className="my-6">
          <p>비밀번호</p>
          <input
            {...register('password', {
              required: '비밀번호를 작성해주세요',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8글자 이상이어야 합니다.',
              },
            })}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="mt-4 h-14 w-full rounded-xl bg-[--cool-gray100] px-6 py-4"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="my-6">
          <p>비밀번호 확인</p>
          <input
            {...register('passwordConfirmation', {
              required: '비밀번호를 다시 작성해주세요',
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            className="mt-4 h-14 w-full rounded-xl bg-[--cool-gray100] px-6 py-4"
          />
          {errors.passwordConfirmation && (
            <span className="text-red-500">
              {errors.passwordConfirmation.message}
            </span>
          )}
        </div>
        <input
          type="submit"
          className="my-4 h-14 w-full cursor-pointer rounded-[40px] bg-[--cool-gray400] text-white"
          value="회원가입"
        />
      </form>
      <p>
        이미 회원이세요?{' '}
        <Link href="/signin" className="text-[#3182F6] underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
