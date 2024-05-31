import axios from '@/lib/axios';
import arrowDownIcon from '@/public/ic_arrow_down.png';
import heartIcon from '@/public/ic_heart.png';
import profileIcon from '@/public/ic_profile.png';
import searchIcon from '@/public/ic_search.png';
import sortIcon from '@/public/ic_sort.png';
import { BoardList } from '@/types/board';
import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
    board.title.toLowerCase().includes(search),
  );

  return (
    <div>
      <div className="mt-10">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">게시글</h1>
          <button className="rounded-lg bg-[--btn-blue1] px-6 py-3 text-white">
            글쓰기
          </button>
        </div>
        <div className="mt-4 flex h-[42px] justify-between gap-x-4 md:mt-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="h-full w-full rounded-xl bg-[--cool-gray50] py-2 pl-11"
              value={search}
              onChange={handleChange}
            />
            <Image
              src={searchIcon}
              alt="search icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 transform"
            />
          </div>
          <div
            className="relative flex w-40 cursor-pointer items-center justify-center rounded-xl border"
            onClick={toggleDropdown}
          >
            <Image src={sortIcon} alt="sort icon" className="sm:hidden" />
            <div className="flex w-full items-center justify-between px-5">
              <p>{boardOrder === 'recent' ? '최신순' : '좋아요순'}</p>
              <Image src={arrowDownIcon} alt="down arrow icon" />
            </div>
            {/* 드롭다운 */}
            {isOpen && (
              <div
                ref={dropDownRef}
                className="absolute top-12 z-50 flex w-full flex-col rounded-xl border bg-white"
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
                <div className="flex h-40 flex-col justify-between py-6">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold">{board.title}</h1>
                    {board.image && (
                      <div className="rounded-lg border">
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
                  <div className="flex items-center justify-between">
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
