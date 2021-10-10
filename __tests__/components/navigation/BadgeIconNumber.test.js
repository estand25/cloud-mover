import { render } from '@testing-library/react'
import React from 'react'
import { BadgeIconNumber } from '../../../src/components/navigation'

describe('Testing BadgeIconNumber interaction', () => {
    it('BadgeIconNumber render without crashing', () =>{
        const bIconNumber = render(<BadgeIconNumber/>)

        expect(bIconNumber).toBeTruthy();
    })
})
