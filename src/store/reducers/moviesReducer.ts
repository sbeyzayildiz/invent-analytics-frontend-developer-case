import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// OMDb API URL
const API_URL = "https://www.omdbapi.com/";

const API_KEY = import.meta.env.VITE_API_KEY || prompt("Enter your api key");

interface MovieSearchResult {
  Search: Movie[];
  totalResults: string;
}
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

interface MoviesState {
  movies: Movie[];
  movieByImdbID: MovieDetail | null;
  loading: boolean;
  error: string | null;
  count: number;
}

interface Query {
  s: string;
  type?: string;
  page: number;
}

const initialState: MoviesState = {
  movies: [],
  movieByImdbID: null,
  loading: false,
  error: null,
  count: 10,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query: Query, thunkAPI) => {
    try {
      const response = await fetch(
        `${API_URL}?s=${query.s}&type=${
          query.type === "all" ? "" : query.type
        }&page=${query.page}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        return data;
      } else {
        throw new Error(data.Error);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetailByImdbID = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === "True") {
        return data;
      } else {
        throw new Error(data.Error);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // actionFilterMovieTypes: (state, action: PayloadAction<string>) => {
    //   const type = action.payload.toLocaleLowerCase();
    //   const filteredMovies = state.movies.filter(movie => movie.Type === type);
    //   state.filteredMovies = filteredMovies;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<MovieSearchResult>) => {
          state.loading = false;
          state.movies = action.payload.Search;
          state.count = +action.payload.totalResults;
        }
      )
      .addCase(fetchMovies.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieDetailByImdbID.pending, (state) => {
        state.movieByImdbID = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMovieDetailByImdbID.fulfilled,
        (state, action: PayloadAction<MovieDetail>) => {
          state.loading = false;
          state.movieByImdbID = action.payload;
        }
      )
      .addCase(
        fetchMovieDetailByImdbID.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default moviesSlice.reducer;

// export const { actionFilterMovieTypes } = moviesSlice.actions;
