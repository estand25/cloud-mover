import React from 'react'
import { render } from '@testing-library/react'
import { NoProfilePresent } from '../../../src/components/account'

describe('Testing with Positive param', () => {
   it('render without crashing No text', () => {
       const noProfile = render(
           <NoProfilePresent/>
       );

       expect(noProfile).toBeTruthy();
   }) 
   
   it('render without crashing with text', () => {
       const noProfile = render(
           <NoProfilePresent
                inputText={"No Signer In User"}
           />
       );

       expect(noProfile).toBeTruthy();
   }) 
})