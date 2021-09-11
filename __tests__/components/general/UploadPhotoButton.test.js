import React from 'react'
import { render } from '@testing-library/react'
import { UploadPhotoButton } from '../../../src/components/general'

describe('Testing for postive param', () => {
    const classes = {
        marginPhoto:{},
        textFieldPhoto:{}
    }

    const onChange = (event) => {}

    it('render without crashing', () => {
        const upload = render(
            <UploadPhotoButton
                classes={classes}
                onChange={onChange}
            />
        )

        expect(upload).toBeTruthy();
    })
})