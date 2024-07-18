import useFetchComments from '../api/useFetchComments';
import { emptyCommentImage } from '../images';
import formatDateDiff from '../utils/formatDateDiff';

export default function CommentList({ productId }: { productId: number }) {
  // 데이터를 가져오기 위한 옵션입니다.
  const fetchOptions = {
    productId,
    limit: 3,
  };

  // useFetchComments로 데이터를 가져옵니다.
  const { data, isLoading, isError, error } = useFetchComments(fetchOptions);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error : {error.message}</div>;
  }

  return data.list.length > 0 ? (
    data?.list?.map((comment: any) => {
      return (
        <div key={comment.id}>
          <div className="my-6">
            {comment.content}
            <div className="mt-6 flex gap-x-2">
              <img
                src={comment.writer.image}
                alt="writerimage"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-sm">{comment.writer.nickname}</p>
                <p className="text-xs">
                  {formatDateDiff(comment.createdAt)}일 전
                </p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      );
    })
  ) : (
    <div className="flex flex-col items-center">
      <img src={emptyCommentImage} alt="emptyCommentImage" />
      <p className="text-[var(--cool-gray400)]">아직 문의가 없습니다</p>
    </div>
  );
}
