import Navbar from '@/components/Navbar';
import BestBoard from '@/components/boards/BestBoard';

export default function Boards() {
  return (
    <>
      <Navbar />
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-xl font-bold mt-4 sm:mt-6">베스트 게시글</h1>
        <BestBoard />
      </div>
    </>
  );
}
