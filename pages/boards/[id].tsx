import Navbar from '@/components/Navbar';
import axios from '@/lib/axios';
import { BoardList, Comment } from '@/types/board';
import { formatDate } from '@/utils/formatDate';
import formatTimeDifference from '@/utils/formatTimeDifference';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface CommentFormInput {
  content: string;
}

// ISR 적용
export async function getStaticProps({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  // 게시글 데이터
  const BoardRes = await axios.get(`/articles/${id}`);
  const board = BoardRes.data;

  return {
    props: {
      board,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const res = await axios.get('/articles');
  const boards = res.data.list;

  const paths = boards.map((board: BoardList) => ({
    params: { id: board.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}

export default function BoardDetail({ board }: { board: BoardList }) {
  const { register, handleSubmit, watch } = useForm<CommentFormInput>();

  const router = useRouter();

  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 댓글 데이터
    // TODO : 추후 limit 수정할 것, 댓글이 ISR이 아닌 CSR로 무한 스크롤로 구현? or 페이지네이션?
    const commentRes = await axios.get(
      `/articles/${router.query.id}/comments?limit=10000`,
    );
    const comments = commentRes.data.list;
    setComments(comments);
  };

  // 댓글 유무 확인 변수
  const commentContent = watch('content');

  // 댓글 등록
  const onSubmit: SubmitHandler<CommentFormInput> = async (data) => {
    try {
      const token = localStorage.getItem('accessToken');
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await axios.post(
        `/articles/${router.query.id}/comments`,
        data,
        config,
      );

      if (res.status === 201) {
        fetchData();
      } else {
        console.log('댓글 등록 실패');
      }
    } catch (error) {
      console.error('댓글 등록 중 오류가 발생하였습니다', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-4 lg:mx-auto lg:w-[1200px]">
        <div className="mt-6 flex justify-between">
          <h1 className="text-xl font-bold">{board.title}</h1>
          <Image
            src="/ic_kebab.png"
            width={24}
            height={24}
            alt="title kebab icon"
          />
        </div>
        <div className="mt-4 flex items-center gap-x-2">
          <Image
            src="/ic_profile.png"
            width={24}
            height={24}
            alt="profile avatar"
          />
          <p className="text-sm text-[--cool-gray600]">
            {board.writer.nickname}
          </p>
          <p className="text-xs text-[--cool-gray400]">
            {formatDate(board.createdAt)}
          </p>
          <div className="h-4 border-l border-[--cool-gray100]" />
          <Image src="/ic_heart.png" width={24} height={24} alt="heart icon" />
          <p className="text-[--cool-gray500]">{board.likeCount}</p>
        </div>
        <hr className="my-4" />
        <div>
          <p>{board.content}</p>
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <h1 className="font-semibold">댓글 달기</h1>
            <textarea
              {...register('content')}
              placeholder="댓글을 입력해주세요."
              className="my-4 h-[104px] resize-none overflow-hidden rounded-xl bg-[--cool-gray100] px-6 py-4"
            />
            <input
              type="submit"
              value="등록"
              className={`ml-auto rounded-lg px-6 py-3 text-white ${commentContent ? 'cursor-pointer bg-blue-500' : 'bg-[--cool-gray400]'}`}
              disabled={!commentContent}
            />
          </form>
        </div>
        {comments?.map((comment) => {
          return (
            <div className="mt-4" key={comment.id}>
              <div className="flex justify-between">
                <p>{comment.content}</p>
                <Image
                  src="/ic_kebab.png"
                  width={24}
                  height={24}
                  alt="title kebab icon"
                />
              </div>
              <div className="mt-4 flex items-center gap-x-2">
                {comment.writer.image ? (
                  <Image
                    src={comment.writer.image}
                    width={32}
                    height={32}
                    alt={`${comment.writer.nickname} image`}
                  />
                ) : (
                  <Image
                    src="/ic_profile.png"
                    width={32}
                    height={32}
                    alt={`${comment.writer.nickname} image`}
                  />
                )}
                <div className="flex flex-col">
                  <p className="text-xs">{comment.writer.nickname}</p>
                  <p className="text-sm text-[--cool-gray400]">
                    {formatTimeDifference(comment.createdAt)}
                  </p>
                </div>
              </div>
              <hr className="my-4" />
            </div>
          );
        })}
        <div className="my-10 flex w-full items-center justify-center">
          <Link
            href="/boards"
            className="flex h-12 w-[240px] items-center justify-center rounded-[40px] bg-[--btn-blue1] text-white"
          >
            목록으로 돌아가기
            <Image
              src="/ic_back.png"
              alt="back icon"
              width={24}
              height={24}
              className="ml-[10px]"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
