interface Movie {
  id: string;
  title: string;
  year: number;
  type: string;
  rating: number;
  primaryImage: {
    url: string;
    caption: {
      plainText: string;
    };
  };
}

interface MovieListProps {
  movieItems: Movie[];
  length: number;
  loadMoreMovie: () => void;
}
export { MovieListProps, Movie };
