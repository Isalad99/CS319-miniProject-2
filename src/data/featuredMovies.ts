// src/data/featuredMovies.ts

export interface FeaturedMovie {
  imdbId: string
  category: 'classic' | 'action' | 'scifi' | 'animation' | 'drama'
}

export const FEATURED_MOVIES: FeaturedMovie[] = [
  // 🏆 Classics
  { imdbId: 'tt0111161', category: 'classic' },   // The Shawshank Redemption
  { imdbId: 'tt0068646', category: 'classic' },   // The Godfather
  { imdbId: 'tt0071562', category: 'classic' },   // The Godfather Part II
  { imdbId: 'tt0050083', category: 'classic' },   // 12 Angry Men
  { imdbId: 'tt0108052', category: 'classic' },   // Schindler's List

  // 💥 Action / Thriller
  { imdbId: 'tt0468569', category: 'action' },    // The Dark Knight
  { imdbId: 'tt0110912', category: 'action' },    // Pulp Fiction
  { imdbId: 'tt0137523', category: 'action' },    // Fight Club
  { imdbId: 'tt0114369', category: 'action' },    // Se7en
  { imdbId: 'tt0099685', category: 'action' },    // Goodfellas

  // 🚀 Sci-Fi
  { imdbId: 'tt0133093', category: 'scifi' },     // The Matrix
  { imdbId: 'tt1375666', category: 'scifi' },     // Inception
  { imdbId: 'tt0816692', category: 'scifi' },     // Interstellar
  { imdbId: 'tt0076759', category: 'scifi' },     // Star Wars: A New Hope
  { imdbId: 'tt0080684', category: 'scifi' },     // Star Wars: Empire Strikes Back

  // 🎭 Drama
  { imdbId: 'tt0109830', category: 'drama' },     // Forrest Gump
  { imdbId: 'tt0120689', category: 'drama' },     // The Green Mile
  { imdbId: 'tt0102926', category: 'drama' },     // The Silence of the Lambs
  { imdbId: 'tt0120815', category: 'drama' },     // Saving Private Ryan
  { imdbId: 'tt0073486', category: 'drama' },     // One Flew Over the Cuckoo's Nest

  // 🌟 LOTR + Animation
  { imdbId: 'tt0167260', category: 'action' },    // LOTR: Return of the King
  { imdbId: 'tt0120737', category: 'action' },    // LOTR: Fellowship
  { imdbId: 'tt0167261', category: 'action' },    // LOTR: Two Towers
  { imdbId: 'tt0245429', category: 'animation' }, // Spirited Away
  { imdbId: 'tt0038650', category: 'drama' },     // It's a Wonderful Life
]
