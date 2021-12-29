import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../AppContext';
import { FormType, SubmitType } from '../types';

const Order: React.FC = () => {
    const initState: FormType = {
        firstName: '',
        lastName: '',
        city: '',
        zipCode: '',
    };

    const { cart } = useBooks();

    const [formFields, setFormFields] = useState(initState);

    const updateField = (event: React.SyntheticEvent): void => {
        const { name, value } = event.target as HTMLInputElement;

        setFormFields({
            ...formFields,
            [name]: value,
        });
    };

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        fetch('http://localhost:3001/api/order', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                ...formFields,
                // @ts-ignore
                order: cart.map(({ id, quantity }) => ({ id, quantity })),
            }),
        });

        alert('zamówienie przyjęte do realizacji');

        // console.log('submited', {
        //     ...formFields,
        //     // @ts-ignore
        //     order: cart.map(({ id, quantity }) => ({ id, quantity })),
        // } as SubmitType);
    };

    return (
        <div>
            <div className='d-flex flex-column flex-md-row mt-2 align-items-center justify-content-between'>
                <h1 className='mx-4'>Podsumowanie</h1>
                <div className='mx-4 d-flex justify-content-evenly gap-2'>
                    <Link to='/cart' className='btn btn-primary mx-sm-2'>
                        Koszyk
                    </Link>
                    <Link to='/' className='btn btn-primary mx-sm-2'>
                        Strona główna
                    </Link>
                </div>
            </div>
            <div className='col-10 col-md-8 offset-1 offset-md-2 mt-4'>
                <h4>Formularz zamówenia</h4>

                <form onSubmit={handleSubmit}>
                    <div className='d-flex flex-column mb-2'>
                        <label>Imię</label>
                        <input
                            name='firstName'
                            type='text'
                            onChange={updateField}
                        />
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <label>Nazwisko</label>
                        <input
                            name='lastName'
                            type='text'
                            onChange={updateField}
                        />
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <label>Miejscowość</label>
                        <input name='city' type='text' onChange={updateField} />
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <label>Kod pocztowy</label>
                        <input
                            name='zipCode'
                            type='text'
                            onChange={updateField}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>
                        ZAMAWIAM I PŁACĘ
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Order;
