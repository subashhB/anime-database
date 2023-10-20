import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import baseUrl from "../baseUrl";
import axios from "axios";
import styled from "styled-components";

interface Anime {
  title: string;
  images: { jpg: { large_image_url: string } };
  aired: { string: string };
  rating: string;
  rank: number;
  score: number;
  scored_by: number;
  popularity: number;
  status: string;
  source: string;
  season: string;
  duration: string;
  synopsis: string;
  trailer: { youtube_id: string; url: string; embed_url: string };
}

interface Character {
  character: {
    mal_id: number;
    url: string;
    images: { jpg: { image_url: string } };
    name: string;
  };
  role: string;
}

const AnimeItem = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const { id } = useParams();

  const getAnime = async (animeId: string | undefined) => {
    if (animeId) {
      const response = await axios.get(`${baseUrl}/anime/${animeId}`);
      return response.data;
    } else {
      navigate("/");
      return;
    }
  };
  const getCharacter = async (animeId: string | undefined) => {
    if (animeId) {
      const response = await axios.get(
        `${baseUrl}/anime/${animeId}/characters`
      );
      return response.data;
    } else {
      navigate("/");
      return;
    }
  };

  const { data: anime } = useQuery<{ data: Anime }>({
    queryKey: ["anime", id],
    queryFn: () => getAnime(id),
  });

  const { data: characters } = useQuery<{ data: Character[] }>({
    queryKey: ["characters", id],
    queryFn: () => getCharacter(id),
  });

  return (
    <AnimeItemStyled>
      <h1>{anime?.data.title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img
              src={anime?.data.images.jpg.large_image_url}
              alt={anime?.data.title}
            />
          </div>
          <div className="anime-details">
            <p>
              <span>Aired: </span>
              <span>{anime?.data.aired.string}</span>
            </p>
            <p>
              <span>Rating: </span>
              <span>{anime?.data.rating}</span>
            </p>
            <p>
              <span>Rank: </span>
              <span>{anime?.data.rank}</span>
            </p>
            <p>
              <span>Score: </span>
              <span>{anime?.data.score}</span>
            </p>
            <p>
              <span>Scored By: </span>
              <span>{anime?.data.scored_by}</span>
            </p>
            <p>
              <span>Popularity: </span>
              <span>{anime?.data.popularity}</span>
            </p>
            <p>
              <span>Status: </span>
              <span>{anime?.data.status}</span>
            </p>
            <p>
              <span>Season: </span>
              <span>{anime?.data.season}</span>
            </p>
            <p>
              <span>Duration: </span>
              <span>{anime?.data.duration}</span>
            </p>
          </div>
        </div>
        <p className="description">
          {showMore
            ? anime?.data.synopsis
            : anime?.data.synopsis.substring(0, 450) + "...........   "}
          <button
            onClick={() => {
              setShowMore((prev) => !prev);
            }}
            style={{ marginInline: "2rem" }}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </p>
      </div>
      <h3 className="title">Trailer</h3>
      <div className="trailer-con">
        {anime?.data.trailer?.embed_url ? (
          <iframe
            src={anime.data.trailer.embed_url}
            title="Inline Frame Example"
            width={800}
            height={450}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <h3>Trailer not available</h3>
        )}
      </div>
      <h3 className="title">Characters</h3>
      <div className="characters">
        {characters?.data.map((characters) => {
          const { role } = characters;
          const { images, mal_id, name } = characters.character;
          return (
            <Link to={`/character/${mal_id}`} key={mal_id}>
              <div className="character">
                <img src={images?.jpg.image_url} alt={name} />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </AnimeItemStyled>
  );
};

/* eslint-disable */
const AnimeItemStyled = styled.div`
  padding: 3rem 18rem;
  background-color: #ededed;
  h1 {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;
  }
  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7 23%, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 2rem;
    color: #6c7983;
    line-height: 1.7rem;
    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #27ae60;
      font-weight: 600;
    }
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;
    iframe {
      outline: none;
      border: 5px solid #e5e7eb;
      padding: 1.5rem;
      border-radius: 10px;
      background-color: #ffffff;
    }
  }

  .details {
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #e5e7eb;
    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      img {
        border-radius: 7px;
      }
    }
    .anime-details {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      p {
        display: flex;
        gap: 1rem;
      }
      p span:first-child {
        font-weight: 600;
        color: #454e56;
      }
    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid #e5e7eb;
    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      background-color: #ededed;
      transition: all 0.4s ease-in-out;
      img {
        width: 100%;
      }
      h4 {
        padding: 0.5rem 0;
        color: #454e56;
      }
      p {
        color: #27ae60;
      }
      &:hover {
        transform: translateY(-5px);
      }
    }
  }
`;

export default AnimeItem;
