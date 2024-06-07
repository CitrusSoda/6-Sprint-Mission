import axios from '@/lib/axios';
import heartIcon from '@/public/ic_heart.png';
import profileIcon from '@/public/ic_profile.png';
import searchIcon from '@/public/ic_search.png';
import { BoardList } from '@/types/board';
import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from './Dropdown';

export default function Board() {
  // 게시글 저장을 위한 state
  const [board, setBoard] = useState<BoardList[] | null>(null);
  // dropdown을 다루기 위한 state
  const [boardOrder, setBoardOrder] = useState<string>('recent');
  // 검색을 위한 state
  const [search, setSearch] = useState<string>('');

  // dropdown 순서를 다루기 위한 ueseffect
  useEffect(() => {
    const loadBoard = async () => {
      // TODO 무한스크롤 or 페이지네이션 적용할 것
      const res = await axios.get(
        `/articles?orderBy=${boardOrder}&pageSize=10000`,
      );
      const boards = res.data.list ?? [];
      setBoard(boards);
    };
    loadBoard();
  }, [boardOrder]);

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
          <Link
            href="/addboard"
            className="rounded-lg bg-[--btn-blue1] px-6 py-3 text-white"
          >
            글쓰기
          </Link>
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
          <Dropdown>
            <DropdownToggle>
              <p>{boardOrder === 'recent' ? '최신순' : '좋아요순'}</p>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setBoardOrder('recent')}>
                최신순
              </DropdownItem>
              <DropdownItem onClick={() => setBoardOrder('like')}>
                좋아요순
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="mt-6">
        <ul>
          {searchedBoard?.map((board) => {
            return (
              <li key={board.id}>
                <Link href={`/boards/${board.id}`}>
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
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
