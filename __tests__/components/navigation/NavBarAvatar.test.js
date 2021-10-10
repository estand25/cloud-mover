import React, {useState as useStateMock} from 'react'
import { render } from '@testing-library/react'
import { NavBarAvatar } from '../../../src/components/navigation'

import { shallow, configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as reactFire from 'reactfire'    

configure({ adapter: new Adapter() });
import IconButton from '@material-ui/core/IconButton';

// const userData = jest.fn()

jest.mock("reactfire", () => {
    return {
        useUser: jest.fn().mockResolvedValue({ 
            user: {
                data: 'fakeId'
            }
        }),
    }
})

describe('Testing  without use data', () => {  
    it('render without crashing', () => {
        const navBarAvatar = render(
            <NavBarAvatar />
        )
        expect(navBarAvatar).toBeTruthy();
    })
})

describe('Testing interactions NavBarAvatar', () => {
    it('IconBtn is present', () => {   
        const { container } = render(<NavBarAvatar />);
        const iconBtn = container.querySelector("#iconBtn");
        expect(iconBtn).toBeTruthy();
    })

    // it('AccountIcon2 is present', () => {    
    //     const { container } = render(<NavBarAvatar/>);

    //     const accountIcon = container.querySelector("#avatarId");
    //     expect(accountIcon).toBeTruthy();
    // })
    // it('AccountIcon1 is present', () => {   
    //     const { container } = render(<NavBarAvatar/>);
    //     const accountIcon = container.querySelector("#accountCircleId");
    //     expect(accountIcon).toBeTruthy();
    // })
})