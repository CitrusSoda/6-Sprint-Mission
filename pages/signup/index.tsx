import axios from '@/lib/axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  email: string;
  nickname: string;
  password: number;
  passwordConfirmation: number;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post('/auth/signUp', data);
      if (res.status === 201) {
        localStorage.setItem('accessToken', res.data.accessToken);
        router.push('/');
      } else {
        console.log('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 중 오류가 발생하였습니다', error);
    }
  };

  const password = watch('password');

  return (
    <div className="flex flex-col px-4">
      <Link href="/">
        <Image src="/ic_logo.png" alt="main logo" width={198} height={66} />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          className="h-14 w-full rounded-xl bg-[--cool-gray100]"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <p>닉네임</p>
        <input
          {...register('nickname', { required: true })}
          type="text"
          placeholder="닉네임을 입력해주세요"
          className="h-14 w-full rounded-xl bg-[--cool-gray100]"
        />
        {errors.nickname && (
          <span className="text-red-500">닉네임을 작성해주세요</span>
        )}
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
          className="h-14 w-full rounded-xl bg-[--cool-gray100]"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <p>비밀번호 확인</p>
        <input
          {...register('passwordConfirmation', {
            required: '비밀번호를 다시 작성해주세요',
            validate: (value) =>
              value === password || '비밀번호가 일치하지 않습니다.',
          })}
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          className="h-14 w-full rounded-xl bg-[--cool-gray100]"
        />
        {errors.passwordConfirmation && (
          <span className="text-red-500">
            {errors.passwordConfirmation.message}
          </span>
        )}
        <input
          type="submit"
          className="w-full cursor-pointer rounded-[40px] bg-[--cool-gray400] text-white"
          value="회원가입"
        />
      </form>
      <Link href="/signin">로그인</Link>
    </div>
  );
}
