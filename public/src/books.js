function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {

  const borrowedBooks = books.filter(book => {
    return book.borrows.some(borrow => borrow.returned === false)
  })

  const availableBooks = books.filter(book => {
    return book.borrows.every(borrow => borrow.returned === true )
  })

  const finalArray = [[...borrowedBooks], [...availableBooks]]
  return finalArray
}

function getBorrowersForBook(book, accounts) {
  return book.borrows
    .map(borrow => {
      const account = accounts.find(account => account.id === borrow.id)
      return {...account, ...borrow}
    })
    .slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
