import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { hidePopup } from '../redux/PopupSlice'
import { addbook, modifybook } from '../redux/BookSlice'
import Alert from 'react-bootstrap/Alert'
import { Book } from '../types'
import "../popup.css"

interface FormPayload {
    book?: Book
}

export function BookForm({book}: FormPayload) {                             // could use a factory pattern, but not neccessary for such a small project. Class is not neccessary here.
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [name, setName] = useState<string>(book ? book.name : '');
    const [nameCheck, setNameCheck] = useState<boolean>(false);             // true if the name is not empty
    const [price, setPrice] = useState<string>(book ? String(book.price) : '');
    const [priceCheck, setPriceCheck] = useState<boolean>(false);           // true if the price is numeric
    const [priceDigitCheck, setPriceDigitCheck] = useState<boolean>(true);  // true if the price has only 2 digit after the point
    const [category, setCategory] = useState<string>(book ? book.category : '');
    const [categoryCheck, setCategoryCheck] = useState<boolean>(false);     // true if the category is not empty
    const [description, setDescription] = useState<string>(book ? book.description : '');
    const index = useAppSelector(state => state.book.index);
    const popupStatus = useAppSelector(state => state.popup); 
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (popupStatus == 'modify') {
            setName(book ? book.name : '');
            setPrice(book ? String(book.price) : '');
            setCategory(book ? book.category : '');
            setDescription(book ? book.description : '');
        }
        setShowAlert(false);
    }, [popupStatus])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();                                             //prevent refresh
        if (nameCheck && priceCheck && priceDigitCheck && categoryCheck) {
            switch (popupStatus) {
                case 'add':
                    dispatch(addbook({
                        id: index,
                        name: name,
                        price: +price,
                        category: category,
                        description: description
                    }));
                    setName('');
                    setPrice('');
                    setCategory('');
                    setDescription('');
                    break;
                case 'modify':
                    dispatch(modifybook({
                        id: book?.id,
                        name: name,
                        price: +price,
                        category: category,
                        description: description
                    }));
            }
            dispatch(hidePopup());
        } else {
            setShowAlert(true);
        }
    }

    function handleCancel() {
        if (popupStatus == 'modify') {
            setName('');
            setPrice('');
            setCategory('');
            setDescription('');
        }
        dispatch(hidePopup());
    }
    
    return (
        <div>{popupStatus !== 'none' && (
        <div className="popupbackground display-block">
        <div className="popupwindow display-block">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label className="display-block">
                    Name: 
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setNameCheck(name.length > 0)} />
                    {showAlert && !nameCheck && (<Alert variant='danger'>Name should be filled correctly</Alert>)}
                </label>
                <label className="display-block">
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} onBlur={() => {
                        setPriceCheck(price.length > 0 && !isNaN(+price) && +price >= 0);
                        if (price.includes('.')) {
                            setPriceDigitCheck(price.split('.')[1].length <= 2);
                        } else {
                            setPriceDigitCheck(true)
                        }
                    }} />
                    {showAlert && !priceCheck && (<Alert variant='danger'>Price should be filled correctly</Alert>)}
                    {showAlert && priceCheck && !priceDigitCheck && (<Alert key='danger' variant='danger'>Price should limit 2 digits after the point</Alert>)}
                </label>
                <label className="display-block">
                    Category:
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} onBlur={() => setCategoryCheck(category.length > 0)}/>
                    {showAlert && !categoryCheck && (<Alert variant='danger'>Category should be filled correctly</Alert>)}
                </label>
                <label className="display-block">
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <div className="display-block">
                    {popupStatus == 'add' && <button type="submit">Add Book</button>}
                    {popupStatus == 'modify' && <button type="submit">Save Book</button>}
                    <button onClick={() => handleCancel()}>Close</button>
                </div>
            </form>
        </div>
        </div>
        )}</div>
    )
}