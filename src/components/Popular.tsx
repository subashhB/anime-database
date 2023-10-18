import { useQuery } from "@tanstack/react-query";
import baseUrl from "../baseUrl";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";

interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { large_image_url: string } };
}

const Popular = () => {
  const isSearch = useAppSelector((state) => state.anime.isSearch);
  const fetchPopularAnime = async () => {
    const response = await axios.get(
      `${baseUrl}/top/anime?filter=bypopularity`
    );
    return response.data;
  };

  const { data: popularAnime } = useQuery<{
    pagination: string;
    data: Anime[];
  }>({
    queryKey: ["popularAnime"],
    queryFn: fetchPopularAnime,
  });
  console.log(popularAnime);
  const conditionalRender = () => {
    if (!isSearch) {
      return popularAnime?.data.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
          </Link>
        );
      });
    }
  };
  return <div>{conditionalRender()}</div>;
};

export default Popular;
