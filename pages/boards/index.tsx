import Navbar from '@/components/Navbar';
import BestBoard from '@/components/boards/BestBoard';
import Board from '@/components/boards/Board';

export default function Boards() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <BestBoard />
        <Board />
      </div>
    </>
  );
}
