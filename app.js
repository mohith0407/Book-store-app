document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        searchBooks(query);
    }
});

function searchBooks(query) {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error fetching data:', error));
    
    
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
    // console.log(resultsDiv);
    
    const books = data.docs;
    if (books.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        // console.log(bookDiv);
        
        const img = document.createElement('img');
        const coverId = book.cover_i;
        if (coverId) {
            img.src = `https://covers.openlibrary.org/b/id/${coverId}-S.jpg`;
        } else {
            img.src = 'https://via.placeholder.com/50x75?text=No+Image';
        }

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'book-details';
        const title = document.createElement('h3');
        title.innerText = book.title;
        const author = document.createElement('p');
        author.innerText = book.author_name ? book.author_name.join(', ') : 'Unknown Author';

        detailsDiv.appendChild(title);
        detailsDiv.appendChild(author);
        bookDiv.appendChild(img);
        bookDiv.appendChild(detailsDiv);

        resultsDiv.appendChild(bookDiv);
    });
}
