import {  useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { removebook } from '../redux/bookSlice'
import { showAddPopup, showModifyPopup } from '../redux/PopupSlice'
import { Book } from '../types';
import { BookForm } from './Forms'

export default function BookList() {
    const [bookDetails, setBookDetails] = useState<Array<Book>>([]);
    const books = useAppSelector(state => state.book.books);
    const dispatch = useAppDispatch();

    function handleDelete(id: number) {
        dispatch(removebook(id));
    }

    function handlePopup(book: Book) {
        setBookDetails([book]);
        dispatch(showModifyPopup()); 
    }

    return (
        <div>
        <button onClick={() => dispatch(showAddPopup())}>Add a Book</button>
        <h2>Book List</h2>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {books.map(book => (
                <tr key={book.id}>
                <td onClick={() => handlePopup(book)}>{book.name}</td>
                <td onClick={() => handlePopup(book)}>{book.price}</td>
                <td onClick={() => handlePopup(book)}>{book.category}</td>
                <td><button onClick={() => handleDelete(book.id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        <BookForm book={bookDetails[0]}/>
        </div>
    )
}