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
            className="bg-[--cool-gray50] w-full py-2 pl-11"
          />
          <div
            className="w-40 border relative cursor-pointer flex justify-center items-center"
            onClick={toggleDropdown}
          >
            {boardOrder === 'recent' ? '최신순' : '좋아요순'}
            {isOpen && (
              <div className="border absolute flex flex-col top-10 w-full z-50 bg-white">
                <button onClick={() => setBoardOrder('recent')}>최신순</button>
                <hr />
                <button onClick={() => setBoardOrder('like')}>좋아요순</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <ul>
          {board?.map((board) => {
            return (
              <li key={board.id}>
                <div className="h-40 flex justify-between flex-col py-6">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold">{board.title}</h1>
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
                    <div className="flex gap-x-2">
                      <p>{board.writer.nickname}</p>
                      <p className="text-[--cool-gray400]">
                        {formatDate(board.createdAt)}
                      </p>
                    </div>
                    <p>{board.likeCount}</p>
                  </div>
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
