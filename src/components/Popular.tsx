import { useQuery } from "@tanstack/react-query";
import baseUrl from "../baseUrl";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <PopularStyled>
      <div className="popular-anime">{conditionalRender()}</div>
    </PopularStyled>
  );
};

const PopularStyled = styled.div`
  display: flex;

  .popular-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 5rem;
    padding-right: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    border-top: 5px solid #e5e7eb;
    a {
      height: 500px;
      border-radius: 7px;
      border: 5px solid #e5e7eb;
    }
    a img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;

export default Popular;
