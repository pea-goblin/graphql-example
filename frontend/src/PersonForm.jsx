import { useState } from 'react';

import { gql } from '@apollo/client';

import { useMutation } from '@apollo/client/react';
import { ALL_PERSONS, CREATE_PERSON } from './queries';

const PersonForm = ({ setError }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');

    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries: [{ query: ALL_PERSONS }],

    });

    const submit = async (event) => {
        event.preventDefault();

        try {
            await createPerson({ variables: { name, phone, street, city } });
            // reset form...
        } catch (err) {
            // đảm bảo không bỏ sót rejection
            const messages = err.graphQLErrors?.map(e => e.message).join('\n') || err.networkError?.message || err.message;
            setError(messages);
        }
        setName('');
        setPhone('');
        setStreet('');
        setCity('');
    }

    return (
        <div>
            <h2> Create new</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    city
                    <input
                        value={city}
                        onChange={({ target }) => setCity(target.value)}
                    />
                </div>
                <div>
                    street
                    <input
                        value={street}
                        onChange={({ target }) => setStreet(target.value)}
                    />
                </div>
                <div>
                    phone
                    <input
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <button type='submit' > add!</button>
            </form>
        </div>
    )
}

export default PersonForm;