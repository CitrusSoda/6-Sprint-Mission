import axios from '@/lib/axios';
import { BoardList } from '@/types/board';
import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Board() {
  const [board, setBoard] = useState<BoardList[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [boardOrder, setBoardOrder] = useState<string>('recent');

  useEffect(() => {
    const loadBoard = async () => {
      const res = await axios.get(`/articles?orderBy=${boardOrder}`);
      const boards = res.data.list ?? [];
      setBoard(boards);
    };
    loadBoard();
  }, [boardOrder]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="mt-10">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">게시글</h1>
          <button>글쓰기</button>
        </div>
        <div className="flex justify-between mt-4 md:mt-6 gap-x-4">
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            className="bg-[--cool-gray50] w-full"
          />
          <button className="w-40 border relative" onClick={toggleDropdown}>
            {boardOrder === 'recent' ? '최신순' : '좋아요순'}
            {isOpen && (
              <div className="border absolute flex flex-col top-8 w-full z-50 bg-white">
                <button onClick={() => setBoardOrder('recent')}>최신순</button>
                <hr />
                <button onClick={() => setBoardOrder('like')}>좋아요순</button>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="mt-6">
        <ul>
          {board?.map((board) => {
            return (
              <li key={board.id}>
                <div className="flex justify-between">
                  <h1>{board.title}</h1>
                  {board.image && (
                    <div className="border rounded-lg">
                      <Image
                        src={board.image}
                        alt={board.title}
                        width={72}
                        height={72}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <div className="flex">
                    <p>{board.writer.nickname}</p>
                    <p>{formatDate(board.createdAt)}</p>
                  </div>
                  <p>{board.likeCount}</p>
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
