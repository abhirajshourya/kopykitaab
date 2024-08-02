/**
 * {
    "title": "The art of money getting, or, Golden rules for money getting",
    "author": "P. T. Barnum",
    "year": 1880,
    "summary": [
      "In the United States, where we have more land than people, it is not at all difficult for persons in good health to make money.",
      "IN THE UNITED STATES, where we have more land than people, it is not at all difficult for persons in good health to make money."
    ],
    "format": "Paperback, mp3 cd, hardcover, E-book, Microform, Audio CD, Hardcover, paperback",
    "language": "ger, eng",
    "type": "work",
    "photo": "http://covers.openlibrary.org/b/id/756095-L.jpg",
    "genres": "Success, Finance, Nonfiction, Self-Improvement, Success in business, Finance, personal, Income, Commerce",
    "rating": 4.8
  },
 */

export interface BookModel {
  title: string;
  author: string;
  year: number;
  summary: string[] | string;
  format: string;
  language: string;
  type: string;
  photo: string;
  genres: string;
  rating: number | string;
}
