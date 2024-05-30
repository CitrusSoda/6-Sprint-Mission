import Navbar from '@/components/Navbar';
import BestBoard from '@/components/boards/BestBoard';
import Board from '@/components/boards/Board';

export default function Boards() {
  return (
    <>
      <Navbar />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <h1 className="text-xl font-bold mt-4 sm:mt-6">베스트 게시글</h1>
        <BestBoard />
        <Board />
      </div>
    </>
  );
}
