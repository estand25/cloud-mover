import React, {useState} from 'react'

const useField = () => {
    const [value, setValue] = useState('');
    return {
        value, onchange: x => setValue('string' === typeof x ? x: x.target.value)
    }
}

export default useField;