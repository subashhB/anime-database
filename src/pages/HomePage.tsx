import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import baseUrl from "../baseUrl";
import AnimeList from "../components/AnimeList";
import { setFalse, setSearch, setTrue } from "../store/animeSlice";

export enum Render {
  popular = "bypopularity",
  airing = "airing",
  upcoming = "upcoming",
}

const HomePage = () => {
  const search = useAppSelector((state) => state.anime.search);
  const dispatch = useAppDispatch();
  const [rendered, setRendered] = useState<Render>(Render.popular);

  const switchComponent = () => {
    switch (rendered) {
      case Render.popular:
        return <AnimeList rendered={rendered} />;
      case Render.airing:
        return <AnimeList rendered={rendered} />;
      case Render.upcoming:
        return <AnimeList rendered={rendered} />;
      default:
        return <AnimeList rendered={Render.popular} />;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!!search) {
      dispatch(setTrue());
    } else {
      dispatch(setFalse());
      alert("Please set a search keyword");
    }
  };
  const searchAnime = async (searchKeyword: string) => {
    const response = await axios.get(
      `${baseUrl}/anime?q=${searchKeyword}&order_by=popularity&sort=asc&sfw`
    );
    return response.data;
  };

  const { data: searchAnimeResult } = useQuery({
    queryKey: ["searchAnime", search],
    enabled: !!search,
    queryFn: () => searchAnime(search),
  });

  return (
    <HomepageStyled>
      <header>
        <div className="logo">
          <h1>
            {rendered === Render.popular
              ? "Popular Anime"
              : rendered === Render.airing
              ? "Airing Anime"
              : "Upcoming Anime"}
          </h1>
        </div>
        <div className="search-container">
          <div className="filter-btn-popular-filter">
            <button onClick={() => setRendered(Render.popular)}>Popular</button>
          </div>
          <form action="" className="search-form" onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChange}
              />
              <button type="submit">Search</button>
            </div>
          </form>
          <div className="filter-btn airing-filter">
            <button
              onClick={() => {
                setRendered(Render.airing);
              }}
            >
              Airing
            </button>
          </div>
          <div className="filter-btn upcoming-filter">
            <button
              onClick={() => {
                setRendered(Render.upcoming);
              }}
            >
              Upcoming
            </button>
          </div>
        </div>
      </header>
      {switchComponent()}
    </HomepageStyled>
  );
};

const HomepageStyled = styled.div`
  background-color: #ededed;
  header {
    padding: 2rem 5rem;
    width: 60%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    @media screen and (max-width: 1530px) {
      width: 95%;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1.2rem;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: 5px solid #e5e7eb;
      }
      form {
        position: relative;
        width: 100%;
        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }
        .input-control input {
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 5px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
        }
        .input-control button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`;

export default HomePage;
