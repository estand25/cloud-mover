import React from 'react'
import { render } from '@testing-library/react'
import App from '../../src/app/index.js'
import { useSigninCheck } from 'reactfire'
jest.mock('reactfire')

describe("hook 1", () => {
    it("useSigninCheck", () => {
        useSigninCheck.mockReturnValue({
            status: false,
            data: {
                
            }
        })
    })
})

it('render without crashing', () => {
    const app = render(<App />)

    expect(app).toBeTruthy()
})