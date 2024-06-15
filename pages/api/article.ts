import axios from '@/lib/axios';

interface ArticleData {
  title: string;
  content: string;
  image?: string;
}

export const uploadImage = async (
  image: File,
  config: {
    headers: {
      Authorization: string;
    };
  },
) => {
  try {
    const response = await axios.post('/images', image, config);
    return response.data;
  } catch (error) {
    console.error('이미지 업로드 중 오류가 발생하였습니다', error);
    throw error;
  }
};

export const uploadArticle = async (
  articleData: ArticleData,
  config: {
    headers: {
      Authorization: string;
    };
  },
) => {
  const response = await axios.post('/articles', articleData, config);
  return response.data;
};
