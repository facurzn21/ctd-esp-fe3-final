import { GetServerSideProps } from 'next';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import ComicDetail from 'dh-marvel/components/detail/ComicDetail';
import { ParsedUrlQuery } from 'querystring';

interface ComicDetailType {
  id: number;
  title: string;
  description: string;
  thumbnail: { path: string; extension: string };
  price: number;
  oldPrice: number;
  stock: number;
  characters: { id: number; name: string }[];
}

interface ComicPageProps {
  comic: ComicDetailType;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const ComicPage: React.FC<ComicPageProps> = ({ comic }) => {
  return (
    <LayoutGeneral>
      <ComicDetail comic={comic} />
    </LayoutGeneral>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;

  try {
    const response = await fetch(`http://localhost:3000/api/comics/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch comic data');
    }

    const comic: ComicDetailType = await response.json();

    return {
      props: {
        comic,
      },
    };
  } catch (error) {
    console.error('Error fetching comic data:', error);
    return {
      notFound: true,
    };
  }
};

export default ComicPage;
