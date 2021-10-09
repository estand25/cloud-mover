import React from 'react'
import { render } from '@testing-library/react'
import { LogIn } from '../../src/pages'
import * as reactFire from 'reactfire'

import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

jest.mock("reactfire", () => {
    return {
        useAuth: jest.fn(),
        useFirestore: jest.fn()
    }
})

describe('Testing with positive param', () => {
    
    it('Render without crashing', () => {
        const logIn = render(
            <LogIn />
        )

        expect(logIn).toBeTruthy();
    })
})



