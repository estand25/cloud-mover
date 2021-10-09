import React from 'react'
import { render } from '@testing-library/react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { NavBarLogo } from '../../../src/components/navigation'

import IconButton from '@material-ui/core/IconButton';

configure({ adapter: new Adapter() });

describe('Testing with positive param', () => {
    it('render without crashing', () => {
        const navBarLogo = render(
            <NavBarLogo/>
        )

        expect(navBarLogo).toBeTruthy();
    })

    it('render without crashing when clicking stuff', () => {
        const onHome = jest.fn();
        const wrapper = shallow(
            <NavBarLogo 
                onHome={onHome}
            />
        );
        wrapper.find(IconButton).simulate('click')
        expect(onHome).toHaveBeenCalled();
    })
})