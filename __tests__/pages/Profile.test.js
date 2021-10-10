import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent, screen } from '@testing-library/react'
import { Profile } from '../../src/pages'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

import * as reactFire from 'reactfire'

import { 
    updateState, 
    updateAlert, 
    uploadImage,
    updateProfileInfo,
    profileUseEffect,
    postsUseEffect
} from '../../src/utilies'

import * as hooks from '../../src/hooks/useProfile'
import { defaultAlert, defaultProfile } from '../../src/constant'

jest.mock("../../src/utilies", () => {
    return {
        updateState: jest.fn(), 
        updateAlert: jest.fn(),  
        uploadImage: jest.fn(), 
        updateProfileInfo: jest.fn(), 
        profileUseEffect: jest.fn(),
        postsUseEffect: jest.fn()
    }
})

let mockIsLoading = false;
let mockList = [{}];
let mockSignInCheckResult = false;
let mockProfile = defaultProfile;
let mockSetPreview = jest.fn();
let mockSetProfile = jest.fn();
let mockFirestore = null;
let mockStorage = null;
let mockSetReset = jest.fn();
let mockReset = false;
let mockFilename = '';
let mockSetFileName = jest.fn();
let mockAlert = defaultAlert;
let mockSetAlert = jest.fn();

jest.mock("../../src/hooks/useProfile", () => ({
    __esModule: true,
    default: () => ({
        isLoading: mockIsLoading, 
        list: mockList, 
        signInCheckResult: mockSignInCheckResult,
        user: jest.fn().mockResolvedValue({
            data: "fakeid"
        }), 
        profile: mockProfile, 
        setProfile: mockSetProfile,
        preview: 'https://images.freeimages.com/images/large-previews/a35/wire-1230667.jpg', 
        setPreview: mockSetPreview,
        firestore: mockStorage,
        storage: mockFirestore,
        reset: mockReset,
        setReset: mockSetReset,
        fileName: mockFilename,
        setFileName: mockSetFileName,
        alert:mockAlert,
        setAlert: mockSetAlert
    })
}))

// Clear mock data before each test
beforeEach(() => {
    updateState.mockClear(), 
    updateAlert.mockClear(),  
    uploadImage.mockClear(),   
    updateProfileInfo.mockClear(), 
    profileUseEffect.mockClear(),
    postsUseEffect.mockClear()
  });

jest.mock("reactfire", () => {
    return {
        useFirestore: jest.fn(),
        useStorage: jest.fn(),
        useSigninCheck: jest.fn(),
        useUser: jest.fn().mockResolvedValue({
            user: {
                data: "fakeUid",
             },
           }),
    }
})

describe('Testing with positive param', () => {    
    it('Render without crashing', () => {
        mockIsLoading = true;
        mockList = [{},{}];
        mockSignInCheckResult = false;
        mockProfile = defaultProfile;
        mockReset = false;
        mockStorage = reactFire.useStorage();;
        mockFirestore = reactFire.useFirestore();
        mockSetPreview = jest.fn();
        mockSetReset = jest.fn();   

        const profile = render(
            <Profile />
        )

        expect(profile).toBeTruthy();
    })
})

describe('Testing interactions Profile', () => {
    it('Display is present', () => {
        mockIsLoading = false;
        mockList = [{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title',
            text: 'text',
            replied: 'initial',
            favorite: false
        },{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title2',
            text: 'text2',
            replied: 'initial',
            favorite: false
        }];
        mockSignInCheckResult = true;
        mockProfile = {
            displayName:'display',
            email: 'email',
            photoURL: '',
            uid: 'uid',
            CreateDateUtc: '',
            CreatedBy: 'stan e.',
            ModifiedDateUtc: '',
            ModifiedBy: 'stan e',
            dob:'1987-01-21',
            bio:'bio'
        };
        mockSetPreview = jest.fn();
        mockFirestore = reactFire.useFirestore();
        mockStorage = reactFire.useStorage();
        mockSetReset = jest.fn();  
        mockReset = false; 

        const { getAllByTestId } =  render(<Profile />);
        const display = getAllByTestId("outline-displayName")
        expect(display).toBeTruthy();
    })

    it('Email is present', () => {
        mockIsLoading = false;
        mockList = [{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title',
            text: 'text',
            replied: 'initial',
            favorite: false
        },{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title2',
            text: 'text2',
            replied: 'initial',
            favorite: false
        }];
        mockSignInCheckResult = true;
        mockProfile = {
            displayName:'display',
            email: 'email',
            photoURL: '',
            uid: 'uid',
            CreateDateUtc: '',
            CreatedBy: 'stan e.',
            ModifiedDateUtc: '',
            ModifiedBy: 'stan e',
            dob:'1987-01-21',
            bio:'bio'
        };
        mockSetPreview = jest.fn();
        mockFirestore = reactFire.useFirestore();
        mockStorage = reactFire.useStorage();
        mockSetReset = jest.fn();  
        mockReset = false; 

        const { getAllByTestId } =  render(<Profile />);
        const email = getAllByTestId('outline-email');
        
        expect(email).toBeTruthy();
    })

    it('Bio is present', () => {
        mockIsLoading = false;
        mockList = [{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title',
            text: 'text',
            replied: 'initial',
            favorite: false
        },{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title2',
            text: 'text2',
            replied: 'initial',
            favorite: false
        }];
        mockSignInCheckResult = true;
        mockProfile = {
            displayName:'display',
            email: 'email',
            photoURL: '',
            uid: 'uid',
            CreateDateUtc: '',
            CreatedBy: 'stan e.',
            ModifiedDateUtc: '',
            ModifiedBy: 'stan e',
            dob:'1987-01-21',
            bio:'bio'
        };
        mockSetPreview = jest.fn();
        mockFirestore = reactFire.useFirestore();
        mockStorage = reactFire.useStorage();
        mockSetReset = jest.fn();  
        mockReset = false; 

        const { getAllByTestId } =  render(<Profile />);
        const bio = getAllByTestId('outline-Bio');
        
        expect(bio).toBeTruthy();
    })

    it('DOB is present', () => {
        mockIsLoading = false;
        mockList = [{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title',
            text: 'text',
            replied: 'initial',
            favorite: false
        },{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title2',
            text: 'text2',
            replied: 'initial',
            favorite: false
        }];
        mockSignInCheckResult = true;
        mockProfile = {
            displayName:'display',
            email: 'email',
            photoURL: '',
            uid: 'uid',
            CreateDateUtc: '',
            CreatedBy: 'stan e.',
            ModifiedDateUtc: '',
            ModifiedBy: 'stan e',
            dob:'1987-01-21',
            bio:'bio'
        };
        mockSetPreview = jest.fn();
        mockFirestore = reactFire.useFirestore();
        mockStorage = reactFire.useStorage();
        mockSetReset = jest.fn();  
        mockReset = false; 

        const { getAllByTestId } =  render(<Profile />);
        const dob = getAllByTestId('outline-DOB');
        
        expect(dob).toBeTruthy();
    })

    it('Upload photo is present', () => {
        mockIsLoading = false;
        mockList = [{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title',
            text: 'text',
            replied: 'initial',
            favorite: false
        },{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title2',
            text: 'text2',
            replied: 'initial',
            favorite: false
        }];
        mockSignInCheckResult = true;
        mockProfile = {
            displayName:'display',
            email: 'email',
            photoURL: '',
            uid: 'uid',
            CreateDateUtc: '',
            CreatedBy: 'stan e.',
            ModifiedDateUtc: '',
            ModifiedBy: 'stan e',
            dob:'1987-01-21',
            bio:'bio'
        };
        mockSetPreview = jest.fn();
        mockFirestore = reactFire.useFirestore();
        mockStorage = reactFire.useStorage();
        mockSetReset = jest.fn();  
        mockReset = false; 

        const { getAllByTestId } =  render(<Profile />);
        const upPhoto = getAllByTestId('upload-photo');
        
        expect(upPhoto).toBeTruthy();
    })

    it('Update photo button is present', () => {
        mockIsLoading = false;
        mockList = [{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title',
            text: 'text',
            replied: 'initial',
            favorite: false
        },{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title2',
            text: 'text2',
            replied: 'initial',
            favorite: false
        }];
        mockSignInCheckResult = true;
        mockProfile = {
            displayName:'display',
            email: 'email',
            photoURL: '',
            uid: 'uid',
            CreateDateUtc: '',
            CreatedBy: 'stan e.',
            ModifiedDateUtc: '',
            ModifiedBy: 'stan e',
            dob:'1987-01-21',
            bio:'bio'
        };
        mockSetPreview = jest.fn();
        mockFirestore = reactFire.useFirestore();
        mockStorage = reactFire.useStorage();
        mockSetReset = jest.fn();  
        mockReset = false; 

        const { container } =  render(<Profile />);
        const oUpdateBtnPhoto = container.querySelector('#upload-btn-photo');
        expect(oUpdateBtnPhoto).toBeTruthy();
    })

    it('UpdateProfile btn is present', () => {
        mockIsLoading = false;
        mockList = [{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title',
            text: 'text',
            replied: 'initial',
            favorite: false
        },{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title2',
            text: 'text2',
            replied: 'initial',
            favorite: false
        }];
        mockSignInCheckResult = true;
        mockProfile = {
            displayName:'display',
            email: 'email',
            photoURL: '',
            uid: 'uid',
            CreateDateUtc: '',
            CreatedBy: 'stan e.',
            ModifiedDateUtc: '',
            ModifiedBy: 'stan e',
            dob:'1987-01-21',
            bio:'bio'
        };
        mockSetPreview = jest.fn();
        mockFirestore = reactFire.useFirestore();
        mockStorage = reactFire.useStorage();
        mockSetReset = jest.fn();  
        mockReset = false; 

        const { container } =  render(<Profile />);
        const oUpdateProfileBtn = container.querySelector('#updateProfileBtn');
        expect(oUpdateProfileBtn).toBeTruthy();
    })

    it('Change photo upload to blank and click update profile', () => {
        mockIsLoading = false;
        mockList = [{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title',
            text: 'text',
            replied: 'initial',
            favorite: false
        },{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title2',
            text: 'text2',
            replied: 'initial',
            favorite: false
        }];
        mockSignInCheckResult = true;
        mockProfile = {
            displayName:'display',
            email: 'email',
            photoURL: '',
            uid: 'uid',
            CreateDateUtc: '',
            CreatedBy: 'stan e.',
            ModifiedDateUtc: '',
            ModifiedBy: 'stan e',
            dob:'1987-01-21',
            bio:'bio'
        };
        mockFirestore = reactFire.useFirestore();
        mockStorage = reactFire.useStorage();
        mockReset = false; 

        const { container, getAllByTestId } =  render(<Profile />);
        const upPhoto = getAllByTestId('upload-photo')[0].querySelector('input');
        const oUpdatePhotoBtn = container.querySelector('#upload-btn-photo');

        fireEvent.change(upPhoto, {target: {value: ''}})

        fireEvent.click(oUpdatePhotoBtn)

        expect(uploadImage).toHaveBeenCalledTimes(1)
    })

    // it('Change photo upload with value and click update profile', () => {
    //     mockIsLoading = false;
    //     mockList = [{
    //         createDateUtc: '',
    //         createBy: 'stan e.',
    //         modifiedDateUtc: '',
    //         modifiedBy: 'stan e.',
    //         title: 'title',
    //         text: 'text',
    //         replied: 'initial',
    //         favorite: false
    //     },{
    //         createDateUtc: '',
    //         createBy: 'stan e.',
    //         modifiedDateUtc: '',
    //         modifiedBy: 'stan e.',
    //         title: 'title2',
    //         text: 'text2',
    //         replied: 'initial',
    //         favorite: false
    //     }];
    //     mockSignInCheckResult = true;
    //     mockProfile = {
    //         displayName:'display',
    //         email: 'email',
    //         photoURL: '',
    //         uid: 'uid',
    //         CreateDateUtc: '',
    //         CreatedBy: 'stan e.',
    //         ModifiedDateUtc: '',
    //         ModifiedBy: 'stan e',
    //         dob:'1987-01-21',
    //         bio:'bio'
    //     };
    //     mockFirestore = reactFire.useFirestore();
    //     mockStorage = reactFire.useStorage();
    //     mockReset = false; 

    //     const { container, getAllByTestId } =  render(<Profile />);
    //     const upPhoto = getAllByTestId('upload-photo')[0].querySelector('input');
    //     const oUpdatePhotoBtn = container.querySelector('#upload-btn-photo');

    //     fireEvent.change(upPhoto, {target: {value: 'https://images.freeimages.com/images/large-previews/a35/wire-1230667.jpg'}})

    //     fireEvent.click(oUpdatePhotoBtn)

    //     expect(uploadImage).toHaveBeenCalledTimes(1)
    // })

    it('Change all fields to blank and click update profile', () => {
        mockIsLoading = false;
        mockList = [{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title',
            text: 'text',
            replied: 'initial',
            favorite: false
        },{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title2',
            text: 'text2',
            replied: 'initial',
            favorite: false
        }];
        mockSignInCheckResult = true;
        mockProfile = {
            displayName:'display',
            email: 'email',
            photoURL: '',
            uid: 'uid',
            CreateDateUtc: '',
            CreatedBy: 'stan e.',
            ModifiedDateUtc: '',
            ModifiedBy: 'stan e',
            dob:'1987-01-21',
            bio:'bio'
        };
        mockFirestore = reactFire.useFirestore();
        mockStorage = reactFire.useStorage();
        mockReset = false; 

        const { container, getAllByTestId } =  render(<Profile />);
        const upPhoto = getAllByTestId('upload-photo')[0].querySelector('input');
        const display = getAllByTestId('outline-displayName')[0].querySelector('input');
        const email = getAllByTestId('outline-email')[0].querySelector('input');
        const bio = screen.getByRole('textbox', {  name: /bio/i});
        const dob = getAllByTestId('outline-DOB')[0].querySelector('input');
        const oUpdateProfileBtn = container.querySelector('#updateProfileBtn');
        const oUpdatePhotoBtn = container.querySelector('#upload-btn-photo');

        fireEvent.change(upPhoto, {target: {value: ''}})
        fireEvent.change(display, {target: {value: ''}})
        fireEvent.change(email, {target: {value: ''}})
        fireEvent.change(bio, {target: {value: ''}})
        fireEvent.change(dob, {target: {value: ''}})

        fireEvent.click(oUpdateProfileBtn)

        expect(updateProfileInfo).toHaveBeenCalledTimes(1)
    })

    it('Change all fields with value and click update profile', () => {

        mockIsLoading = false;
        mockList = [{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title',
            text: 'text',
            replied: 'initial',
            favorite: false
        },{
            createDateUtc: '',
            createBy: 'stan e.',
            modifiedDateUtc: '',
            modifiedBy: 'stan e.',
            title: 'title2',
            text: 'text2',
            replied: 'initial',
            favorite: false
        }];
        mockSignInCheckResult = true;
        mockProfile = {
            displayName:'display',
            email: 'email',
            photoURL: '',
            uid: 'uid',
            CreateDateUtc: '',
            CreatedBy: 'stan e.',
            ModifiedDateUtc: '',
            ModifiedBy: 'stan e',
            dob:'1987-01-21',
            bio:'bio'
        };
        mockFirestore = reactFire.useFirestore();
        mockStorage = reactFire.useStorage();
        mockReset = false; 

        const { container, getAllByTestId } =  render(<Profile />);
        const upPhoto = getAllByTestId('upload-photo')[0].querySelector('input');
        const display = getAllByTestId('outline-displayName')[0].querySelector('input');
        const email = getAllByTestId('outline-email')[0].querySelector('input');
        const bio = screen.getByRole('textbox', {  name: /bio/i});
        const dob = getAllByTestId('outline-DOB')[0].querySelector('input');
        const oUpdateProfileBtn = container.querySelector('#updateProfileBtn');
        const oUpdatePhotoBtn = container.querySelector('#upload-btn-photo');

        // fireEvent.change(upPhoto, {target: {value: 'https://images.freeimages.com/images/large-previews/a35/wire-1230667.jpg'}})
        // fireEvent.change(upPhoto, {target: {value: ''}})
        // fireEvent.click(oUpdatePhotoBtn)

        fireEvent.change(display, {target: {value: 'display'}})
        fireEvent.change(email, {target: {value: 'email@email.com'}})
        fireEvent.change(bio, {target: {value: 'bio test'}})
        fireEvent.change(dob, {target: {value: '1987-01-01'}})

        fireEvent.click(oUpdateProfileBtn)

        expect(updateProfileInfo).toHaveBeenCalledTimes(1)
        // expect(mockSetAlert).toHaveBeenCalledTimes(1)
        // expect(updateAlert).toHaveBeenCalledTimes(1)

        // const onAlert = screen.getByText(/Profile successfully Updated/i)
        // fireEvent.click(onAlert)
    })
})