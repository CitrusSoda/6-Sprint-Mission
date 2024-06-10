import axios from '@/lib/axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  email: string;
  password: number;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post('/auth/signIn', data);
      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.accessToken);
        router.push('/');
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생하였습니다', error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center px-4 lg:mx-auto lg:w-[640px]">
      <Link href="/" className="lg:mt-[60px]">
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
        <input
          type="submit"
          className="my-4 h-14 w-full cursor-pointer rounded-[40px] bg-[--cool-gray400] text-white"
          value="로그인"
        />
      </form>
      <p>
        판다 마켓이 처음이신가요?{' '}
        <Link href="/signup" className="text-[#3182F6] underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
