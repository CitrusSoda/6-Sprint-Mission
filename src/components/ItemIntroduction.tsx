import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../api/apiClient';
import { favoriteIcon } from '../images';
import formatNumber from '../utils/formatNumber';

export default function ItemIntroduction({
  postedItems,
}: {
  postedItems: any;
}) {
  // userId state
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      const response = await axiosInstance.get('/users/me');
      setUserId(response.data.id);
    };
    fetchUserId();
  }, []);

  const deleteProduct = useMutation({
    mutationFn: (productId: number) =>
      axiosInstance.delete(`/products/${productId}`),
  });

  const handleDelete = (id: number) => {
    deleteProduct.mutate(id);
    navigate('/items');
  };

  return (
    <div className="flex flex-col justify-center sm:flex-row">
      <img
        src={postedItems.images[0]}
        alt={postedItems.name}
        className="h-[340px] w-[340px] rounded-2xl object-fill lg:h-[486px] lg:w-[486px]"
      />
      <div className="ml-6 mt-4 flex flex-grow flex-col sm:mt-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold lg:text-2xl">
            {postedItems.name} 팔아요
          </h1>
          {postedItems.ownerId === userId && (
            <div className="flex gap-x-2">
              <button>수정</button>
              <button onClick={() => handleDelete(postedItems.id)}>삭제</button>
            </div>
          )}
        </div>
        <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
          {formatNumber(postedItems.price)} 원
        </h1>
        <hr className="my-4" />
        <p className="text-sm font-semibold">상품 소개</p>
        <p className="mt-2">{postedItems.description}</p>
        <p className="mt-6">상품 태그</p>
        <div className="mt-3 flex flex-wrap gap-x-3">
          {postedItems.tags.map((tag: any, idx: number) => {
            return (
              <p key={idx}>
                <span className="flex gap-x-2 rounded-3xl bg-[var(--cool-gray50)] px-4 py-3">
                  #{tag}
                </span>
              </p>
            );
          })}
        </div>
        <div className="mt-6 flex w-fit cursor-default items-center justify-center gap-x-1 rounded-[35px] border px-3 py-1 lg:mt-auto">
          <img src={favoriteIcon} alt="favoriteicon" className="h-6 w-6" />
          <p>{postedItems.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}
