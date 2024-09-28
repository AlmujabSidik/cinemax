interface HomeState {
  isLoading: boolean;
  filterType: string;
  filterYear: string;
  movieList: any[];
  page: number;
}

export { HomeState };
