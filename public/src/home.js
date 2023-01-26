function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let booksBorrowed = 0
  books.forEach(book => {
    book.borrows.forEach(borrow => {
      if (!borrow.returned) booksBorrowed++
    })
  })
  return booksBorrowed
}

function getMostCommonGenres(books) {
  //create an object that store genre count
  const genreCount = {}
  //Iterate over books array
  books.forEach(book => {
    //keep track of the current genre
    const genre = book.genre
    //If the current genre exists in the genreCount object, increment count
    if (!genreCount[genre]) {
      genreCount[genre] = 1
    } else {
      genreCount[genre]++
    }
  })

  //Convert the genreCount in to an array of objects
  return Object.keys(genreCount)
    .map(key => {
      return {name: key, count: genreCount[key]}
    })
    .sort((a,b) => b.count - a.count)
    .slice(0, 5)
}

function getMostPopularBooks(books) {
  return books.sort((a,b) => {
    return b.borrows.length - a.borrows.length
  })
  .map(({title, borrows}) => {
    return {name: title, count: borrows.length}
  })
  .slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  const result = []

  authors.forEach(author => {
    const theAuthor = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0
    }

    books.forEach(({authorId, borrows}) => {
      if (authorId === author.id) {
        theAuthor.count += borrows.length
      }
    })
    result.push(theAuthor)
  })
  return result
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
