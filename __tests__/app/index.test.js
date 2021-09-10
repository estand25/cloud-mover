import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'
import { App } from '../../src/app'
import * as reactFire from 'reactfire'

configure({ adapter: new Adapter() })

const renderApp = () =>  {
    const firebaseConfig = {
        apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        projectId: "cloud",
    }

    return mount(
        <reactFire.FirebaseAppProvider firebaseConfig={ firebaseConfig }>
            <App />
        </reactFire.FirebaseAppProvider>
    );
  }

it('render without crashing', () => {    
    const app = renderApp()

    expect(app).toBeTruthy()
})