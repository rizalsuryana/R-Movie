jika hanya ingin menggunakan 1 halaman saja
fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}
---
useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await api.getMovies(type || "popular");
        setMovieList(data.results);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchMovies();
  }, [type]);
---
   <nav>
        <Link to="/movies/popular">Popular</Link>
        <Link to="/movies/upcoming">Upcoming</Link>
        <Link to="/movies/top_rated">Top Rated</Link>
      </nav>