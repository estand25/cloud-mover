import React from 'react'
import { render } from '@testing-library/react'
import { CardLayout } from '../../../src/components/general'

describe('Testing CardLayout with postive param', () => {
    it('render without crashing', () => {
        const card = render(
            <CardLayout>
                <div>{'test'}</div>
            </CardLayout>
        )

        expect(card).toBeTruthy();
    })

    it('render without crashing with header', () => {
        const card = render(
            <CardLayout
                header={"Testing"}
            >
                <div>{'test'}</div>
            </CardLayout>
        )

        expect(card).toBeTruthy();
    })   

})