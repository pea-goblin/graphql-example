import { useState } from 'react'

import {
  gql,
} from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import { ALL_PERSONS } from './queries'
import Notify from './Notify'
import PhoneForm from './PhoneForm'

function App() {
  const result = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    console.log(message);

    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Notify error={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App
