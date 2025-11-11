import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client/react';

import { EDIT_NUMBER } from './queries';

const PhoneForm = ({ setError }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [changeNumber, result] = useMutation(EDIT_NUMBER);

    const submit = async (e) => {
        e.preventDefault();
        try {
            await changeNumber({ variables: { name, phone } });
            setName('');
            setPhone('');
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            setError('Person not found');
        }
    }, [result.data]);
    return (
        <div>
            <h2>change number</h2>

            <form onSubmit={submit}>
                <div>
                    name <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    phone <input
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <button type='submit'>Change</button>
            </form>
        </div>
    )
}

export default PhoneForm;