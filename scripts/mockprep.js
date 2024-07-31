const axios = require('axios');
const fs = require('fs');

// URL of the Open Library API search endpoint
const url = 'https://openlibrary.org/search.json?q=money&limit=20';

// Function to fetch book data
async function fetchBooks() {
  try {
    const response = await axios.get(url);
    const data = response.data;

    // Extracting the required details from the API response
    const books = data.docs.map((doc) => ({
      title: doc.title || 'N/A',
      author: doc.author_name ? doc.author_name.join(', ') : 'N/A',
      year: doc.first_publish_year || 'N/A',
      summary: doc.first_sentence?.value || 'N/A',
      photo: doc.cover_i ? `http://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : 'N/A',
      genres: doc.subject ? doc.subject.join(', ') : 'N/A',
      rating: doc.average_rating || 'N/A', // This field might not be available in the response
    }));

    // Printing the JSON formatted output
    console.log(JSON.stringify(books, null, 2));

    // Optionally, save to a file
    fs.writeFileSync('assets/mockdata.json', JSON.stringify(books, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error fetching book data:', error);
  }
}

// Call the function to fetch and output book data
fetchBooks();
