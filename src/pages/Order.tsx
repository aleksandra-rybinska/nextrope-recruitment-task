import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../AppContext';
import ValidationMessage from '../components/ValidationMessage';
import { FormType, ValidateConditionsType } from '../types';

const Order: React.FC = () => {
    const initState: FormType = {
        firstName: '',
        lastName: '',
        city: '',
        zipCode: '',
    };

    const initErrors = {
        firstName: false,
        lastName: false,
        city: false,
        zipCode: false,
    };

    const { cart } = useBooks();

    const [formFields, setFormFields] = useState(initState);
    const [errors, setErrors] = useState(initErrors);

    const validateConditions: Record<
        ValidateConditionsType,
        (value: string) => boolean
    > = {
        firstName: (value: string): boolean => value.length > 2,
        lastName: (value: string): boolean => value.length > 2,
        city: (value: string): boolean => value.length > 2,
        zipCode: (value: string): boolean => value.length === 5,
    };

    const updateField = ({ target }: { target: HTMLInputElement }): void => {
        const { name, value } = target;

        if (!validateConditions[name as ValidateConditionsType](value)) {
            setErrors((prev) => ({
                ...prev,
                [name]: true,
            }));

            target.style.border = '1px solid red';
        } else {
            setErrors((prev) => ({
                ...prev,
                [name]: false,
            }));

            target.style.border = '1px solid grey';
        }

        setFormFields({
            ...formFields,
            [name]: value,
        });
    };

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        if (Object.values(errors).some((v) => v === true)) {
            console.log('error!');
            return;
        }

        fetch('http://localhost:3001/api/order', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                ...formFields,
                // @ts-ignore
                order: cart.map(({ id, quantity }) => ({ id, quantity })),
            }),
        });

        alert('zam??wienie przyj??te do realizacji');
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
                        Strona g????wna
                    </Link>
                </div>
            </div>
            <div className='col-10 col-md-8 offset-1 offset-md-2 mt-4'>
                <h4>Formularz zam??wenia</h4>

                <form onSubmit={handleSubmit}>
                    <div className='d-flex flex-column mb-2'>
                        <label>Imi??</label>
                        <input
                            name='firstName'
                            type='text'
                            required
                            onChange={updateField}
                        />
                        {errors.firstName && (
                            <ValidationMessage
                                message={'Imi?? jest za kr??tkie'}
                            />
                        )}
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <label>Nazwisko</label>
                        <input
                            name='lastName'
                            type='text'
                            required
                            onChange={updateField}
                        />
                        {errors.lastName && (
                            <ValidationMessage
                                message={'Nazwisko jest za kr??tkie'}
                            />
                        )}
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <label>Miejscowo????</label>
                        <input
                            name='city'
                            type='text'
                            required
                            onChange={updateField}
                        />
                        {errors.city && (
                            <ValidationMessage
                                message={'Miejscowo???? jest za kr??tka'}
                            />
                        )}
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <label>Kod pocztowy</label>
                        <input
                            name='zipCode'
                            type='number'
                            required
                            onChange={updateField}
                        />
                        {errors.zipCode && (
                            <ValidationMessage
                                message={'Wpisz 5 cyfr kodu pocztowego'}
                            />
                        )}
                    </div>
                    <button type='submit' className='btn btn-success'>
                        ZAMAWIAM I P??AC??
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Order;
