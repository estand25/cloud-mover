import React from 'react'
import { render } from '@testing-library/react'
import { ProfileUser } from '../../../src/components/account'


describe('Testing with Positive param', () => {
    const classes = {
        marginPhoto: {
            margin: '1px',
            alignItems: 'center'
        },
        textFieldPhoto: {
            width: '25ch',
            alignItems: 'center'
        }
    }

    const profile = {
        displayName: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
        uid: ''
    }

    const fileName = {
        name: ''
    }

    const preview = () => {}
    const updateState = (value, targetField) => {}
    const uploadImage = (event) => {}
    const updateProfileInfo = () => {}

    it('render without crashing', () => {
        const profileUser = render(
            <ProfileUser
                classes={classes}
                signInCheckResult={false}
                value={profile}
                onChangeState={updateState}
                onChangeImage={uploadImage}
                file={fileName}
                previewImageUrl={preview}
                onSubmit={updateProfileInfo}
            />
        )

        expect(profileUser).toBeTruthy();
    })
})
