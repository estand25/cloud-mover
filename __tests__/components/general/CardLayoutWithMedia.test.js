import React from 'react'
import { render } from '@testing-library/react'
import { CardLayoutWithMedia } from '../../../src/components/general'


describe('Testing CardLayout with postive param', () => {
    it('render without crashing', () => {
        const card = render(
            <CardLayoutWithMedia
                header={"Testing"}
                image={null}
            >
                <div>{'test'}</div>
            </CardLayoutWithMedia>
        )

        expect(card).toBeTruthy();
    })

    it('render without crashing with only Image no header', () => {
        const card = render(
            <CardLayoutWithMedia
                header={"Testing"}
                image={"https://jooinn.com/images/colorful-paint-2.jpg"}
            >
                <div>{'test'}</div>
            </CardLayoutWithMedia>
        )

        expect(card).toBeTruthy();
    })

    it('render without crashing with only Image and header', () => {
        const card = render(
            <CardLayoutWithMedia
                header={"Testing"}
                image={"https://jooinn.com/images/colorful-paint-2.jpg"}
                title={"Random Image"}
            >
                <div>{'test'}</div>
            </CardLayoutWithMedia>
        )

        expect(card).toBeTruthy();
    })
})