import React, {useState as useStateMock} from 'react'
import { render } from '@testing-library/react'
import { NavBarAvatar } from '../../../src/components/navigation'

import { shallow, configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as reactFire from 'reactfire'    

configure({ adapter: new Adapter() });
import IconButton from '@material-ui/core/IconButton';

jest.mock("reactfire", () => {
    return {
        useUser:  jest.fn().mockResolvedValue({
            user: {
                data: "fakeUid",
             },
           }),
    }
})

// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn(),
//   }))

describe('Testing  without use data', () => {          
    it('render without crashing', () => {
        const navBarAvatar = render(
            <NavBarAvatar />
        )
        expect(navBarAvatar).toBeTruthy();
    })

})

// describe('Testing with UseState', () => {
//     let wrapper;
//     const setState = jest.fn();
//     const useStateSpy = jest.spyOn(React, 'useState');
//     useStateSpy.mockImplementation((init) => [init, setState]);

//     beforeEach(() => {
//         wrapper = shallow(<NavBarAvatar/>);    
//     })

//     afterEach(() => {
//         jest.clearAllMocks();
//     })

//     it('render without crashing when clicking IconButton', () => {
//         wrapper.find('#iconBtn').props().onClick()
//         expect(setState).toHaveBeenCalled();
//     })
// })