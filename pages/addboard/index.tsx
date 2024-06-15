import Navbar from '@/components/Navbar';
import axios from '@/lib/axios';
import addFileIcon from '@/public/ic_plus.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { uploadArticle, uploadImage } from '../api/article';

interface Inputs {
  title: string;
  content: string;
  image?: File;
}

export default function AddBoard() {
  // react-hook-form을 이용한 유효성 검사 및 사용자를 위한 에러 출력
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  // 제목 및 내용이 채워졌는지 확인하는 변수
  const title = watch('title');
  const content = watch('content');

  // 게시글 post
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { title, content, image } = data;

      // 이미지 변수
      let storageImg = null;

      // 이미지가 있으면 storageImg에 보관
      if (image) {
        const imgRes = await uploadImage(image, config);
        storageImg = imgRes.url;
      }

      // 이미지가 없을 수도 있으니 있다면 포함하여 전송
      const articleData = {
        title,
        content,
        ...(storageImg && { image: storageImg }),
      };
      await uploadArticle(articleData, config);

      router.push('/boards');
    } catch (error) {
      console.error('게시글 등록 중 오류가 발생하였습니다', error);
    }
  };

  // 이미지 선택 시 보여주기 위한 State 및 로직
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  }, [selectedImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      setSelectedImage(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-4 px-4 lg:mx-auto lg:w-[1200px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex h-[42px] items-center justify-between">
            <h1 className="text-xl font-bold">상품 등록하기</h1>
            <input
              className={`h-full w-[74px] cursor-pointer rounded-lg text-white ${title && content ? 'bg-blue-500' : 'bg-[--cool-gray400]'}`}
              type="submit"
              value="등록"
            />
          </div>
          <div className="mt-6">
            <h1 className="text-sm font-bold lg:text-lg">*제목</h1>
            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="제목을 입력해주세요"
              className="mt-3 w-full rounded-xl bg-[--cool-gray100] px-6 py-4"
            />
            {errors.title && (
              <span className="text-red-500">타이틀을 작성해주세요</span>
            )}
          </div>
          <div className="mt-6">
            <h1 className="text-sm font-bold lg:text-lg">*내용</h1>
            <textarea
              {...register('content', { required: true })}
              placeholder="내용을 입력해주세요"
              className="mt-3 h-[200px] w-full resize-none overflow-hidden rounded-xl bg-[--cool-gray100] px-6 py-4 lg:h-[282px]"
            />
            {errors.content && (
              <span className="text-red-500">내용을 작성해주세요</span>
            )}
          </div>
          <div className="mt-6">
            <h1 className="text-sm font-bold lg:text-lg">이미지</h1>
            <div className="mt-3 flex gap-x-4">
              <label htmlFor="file-input" className="inline-block">
                <div className="flex size-[169px] cursor-pointer flex-col items-center justify-center gap-y-3 rounded-xl bg-[--cool-gray100] lg:size-[282px]">
                  <Image
                    src={addFileIcon}
                    alt="add file icon"
                    width={48}
                    height={48}
                  />
                  <h1 className="text-[--cool-gray400]">이미지 등록</h1>
                </div>
                {/* file은 onChangeHandler에서 이미지를 가져옵니다. */}
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  alt="input image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Preview"
                  width={0}
                  height={0}
                  className="size-[169px] rounded-xl lg:size-[282px]"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
