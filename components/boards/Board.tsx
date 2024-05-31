import axios from '@/lib/axios';
import { BoardList } from '@/types/board';
import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import searchIcon from '@/public/ic_search.png';
import heartIcon from '@/public/ic_heart.png';
import profileIcon from '@/public/ic_profile.png';
import arrowDownIcon from '@/public/ic_arrow_down.png';
import sortIcon from '@/public/ic_sort.png';

export default function Board() {
  // 화면 클릭 시 드롭다운 닫기를 위한 ref
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  // 게시글 저장을 위한 state
  const [board, setBoard] = useState<BoardList[] | null>(null);
  // 인풋 옆 dropdown을 위한 state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // dropdown을 다루기 위한 state
  const [boardOrder, setBoardOrder] = useState<string>('recent');
  // 검색을 위한 state
  const [search, setSearch] = useState<string>('');

  // dropdown 순서를 다루기 위한 ueseffect
  useEffect(() => {
    const loadBoard = async () => {
      const res = await axios.get(`/articles?orderBy=${boardOrder}`);
      const boards = res.data.list ?? [];
      setBoard(boards);
    };
    loadBoard();
  }, [boardOrder]);

  // dropdown 밖 영역 클릭 시 닫기
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current !== null &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('mousedown', clickOutside);
    }
    return () => {
      window.removeEventListener('mousedown', clickOutside);
    };
  }, [isOpen]);

  // dropdown 토글
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 검색
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색으로 필터링된 게시글
  const searchedBoard = board?.filter((board) =>
    board.title.toLowerCase().includes(search)
  );

  return (
    <div>
      <div className="mt-10">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">게시글</h1>
          <button className="py-3 px-6 bg-[--btn-blue1] text-white rounded-lg">
            글쓰기
          </button>
        </div>
        <div className="flex justify-between mt-4 md:mt-6 gap-x-4 h-[42px]">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="bg-[--cool-gray50] py-2 pl-11 h-full w-full rounded-xl"
              value={search}
              onChange={handleChange}
            />
            <Image
              src={searchIcon}
              alt="search icon"
              className="absolute top-1/2 transform -translate-y-1/2 left-4"
            />
          </div>
          <div
            className="w-40 border relative cursor-pointer flex justify-center items-center rounded-xl"
            onClick={toggleDropdown}
          >
            <Image src={sortIcon} alt="sort icon" className="sm:hidden" />
            <div className="justify-between items-center w-full px-5 flex">
              <p>{boardOrder === 'recent' ? '최신순' : '좋아요순'}</p>
              <Image src={arrowDownIcon} alt="down arrow icon" />
            </div>
            {/* 드롭다운 */}
            {isOpen && (
              <div
                ref={dropDownRef}
                className="border absolute flex flex-col top-12 w-full z-50 bg-white rounded-xl"
              >
                <button
                  onClick={() => setBoardOrder('recent')}
                  className="h-[42px]"
                >
                  최신순
                </button>
                <hr />
                <button
                  onClick={() => setBoardOrder('like')}
                  className="h-[42px]"
                >
                  좋아요순
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <ul>
          {searchedBoard?.map((board) => {
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
                          className="size-[72px]"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-x-2">
                      <Image src={profileIcon} alt="profile icon" />
                      <p>{board.writer.nickname}</p>
                      <p className="text-[--cool-gray400]">
                        {formatDate(board.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-x-2">
                      <Image src={heartIcon} alt="heart icon" />
                      <p>{board.likeCount}</p>
                    </div>
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
