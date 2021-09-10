import React from 'react'
import { render } from '@testing-library/react'

import { FrontPage } from '../../src/pages'

describe('Testing with positive param', () => {
    it('render without crashing', () => {
        const frontPage = render(
            <FrontPage/>
        )

        expect(frontPage).toBeTruthy();
    })
})