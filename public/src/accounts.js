function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    return accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  })
}

function getTotalNumberOfBorrows(account, books) {
  let numberOfBorrows = 0
  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id) numberOfBorrows++
    })
  })
  return numberOfBorrows
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksBorrowed = []

  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if(borrow.id === account.id && !borrow.returned) {
        booksBorrowed.push(book)
      }
    })
  })
  const result = booksBorrowed.map((book => {
    return {...book, author: getAuthor(authors, book) }
  }))
  return result
}


const getAuthor = (authors, book) => {
  return authors.find((author) => author.id === book.authorId)
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
