import Navbar from '@/components/Navbar';
import addFileIcon from '@/public/ic_plus.png';
import Image from 'next/image';

export default function AddBoard() {
  return (
    <>
      <Navbar />
      <div className="mt-4 px-4 lg:mx-auto lg:w-[1200px]">
        <div className="flex h-[42px] items-center justify-between">
          <h1 className="text-xl font-bold">상품 등록하기</h1>
          <button className="h-full w-[74px] rounded-lg bg-[--cool-gray400] text-white">
            등록
          </button>
        </div>
        <form action="">
          <div className="mt-6">
            <h1 className="text-sm font-bold lg:text-lg">*제목</h1>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              className="mt-3 w-full rounded-xl bg-[--cool-gray100] px-6 py-4"
            />
          </div>
          <div className="mt-6">
            <h1 className="text-sm font-bold lg:text-lg">*내용</h1>
            <textarea
              placeholder="내용을 입력해주세요"
              className="mt-3 h-[200px] w-full resize-none overflow-hidden rounded-xl bg-[--cool-gray100] px-6 py-4 lg:h-[282px]"
            />
          </div>
          <div className="mt-6">
            <h1 className="text-sm font-bold lg:text-lg">이미지</h1>
            <label htmlFor="file-input" className="inline-block">
              <div className="mt-3 flex size-[169px] cursor-pointer flex-col items-center justify-center gap-y-3 rounded-xl bg-[--cool-gray100] lg:size-[282px]">
                <Image
                  src={addFileIcon}
                  alt="add file icon"
                  width={48}
                  height={48}
                />
                <h1 className="text-[--cool-gray400]">이미지 등록</h1>
              </div>
              <input
                id="file-input"
                type="file"
                className="hidden"
                alt="input image"
                accept="image/png, image/jpeg, image/jpg"
              />
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
