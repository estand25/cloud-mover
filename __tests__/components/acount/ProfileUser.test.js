import React from 'react'
import { render } from '@testing-library/react'
import { ProfileUser } from '../../../src/components/account'


describe('Testing with Positive param', () => {
    const classes = {
        marginPhoto: {},
        textFieldPhoto: {}
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

    it('render without crashing with false SignCheckResult', () => {
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

    it('render without crashing with true SignCheckResult', () => {
        const profileUser = render(
            <ProfileUser
                classes={classes}
                signInCheckResult={true}
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

    it('render without crashing with  blank SignCheckResult', () => {
        const profileUser = render(
            <ProfileUser
                classes={classes}
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
