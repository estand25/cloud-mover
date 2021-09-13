import {
    updateState, 
    updateAlert,
    updateShowPassword,
    handleMouseDownPassword,
    routeHome,
    logIn,
    accountUpdated,
    accountDelete,
    uploadImage,
    updateProfileInfo,
    createUser
 } from '../../src/utilies'
 import * as reactFire from 'reactfire'
 import * as firebaseAuth from 'firebase/auth'
 import * as firebaseStore from 'firebase/firestore'
 import * as firebaseStorage from 'firebase/storage'

 jest.mock("reactfire", () => ({
     useAuth: jest.fn(),
     useFirestore: jest.fn(),
     useStorage: jest.fn()
 }))
 
 jest.mock("firebase/auth", () => {
    return {
        // since this method from firebase return a promise, here need a promise as well 
        signInWithEmailAndPassword: jest.fn().mockResolvedValue({
           user: {
               uid: "fakeUid",
            },
          }),
        createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
             user: {
               uid: "fakeUid",
             },
          }), 
        updateProfile: jest.fn().mockResolvedValue({
            data: jest.fn()
        })
    }
})

jest.mock("firebase/firestore", () => {
    return {
        doc: jest.fn().mockResolvedValue({
            data: 'xxxxx'
        }),
        getDoc: jest.fn().mockResolvedValue({
            data: jest.fn()
        }),
        updateDoc: jest.fn().mockResolvedValue({
            data: jest.fn()
        }),
        deleteDoc: jest.fn().mockResolvedValue({
            data: jest.fn()
        }),
        setDoc: jest.fn().mockResolvedValue({
            data: jest.fn()
        }),
    }
})

jest.mock("firebase/storage", () => {
    return {
        deleteObject: jest.fn().mockResolvedValue({
            data: 'xxxxx'
        }),
        ref: jest.fn().mockResolvedValue({
            data: jest.fn()
        }),
        uploadBytesResumable: jest.fn().mockResolvedValue({
            data: jest.fn()
        })
    }
})
 
describe('Testing utility function', () => {   
    beforeEach(() => {
        useFirestoreMock: jest.fn().mockResolvedValue({ });
        useStorageMock: jest.fn().mockResolvedValue({ });
    })

    afterEach(() => {
        useFirestoreMock.mockClear();
        useStorageMock.mockClear();
    })

    const useFirestoreMock = reactFire.useFirestore;   
    const useStorageMock = reactFire.useStorage;

    const useState = (defaultValue) => {
        let value = defaultValue;
        const getValue = value
        const setValue = newValue => value = newValue
        return [getValue, setValue];
      }        

    const useObjectState = (defaultValue) => {
        let value = Object.assign(defaultValue,{})
        const getValue = value
        const setValue = newValue => value = newValue
        return [getValue, setValue];
    }

    it('Testing UpdateState change state object', ()  => {
        const [state, onChangeState] = useState({
            test: 'test1'
        })

        const e = {
            target: {
                name: 'test',
                value: 'test2'
            }
        }
        
        updateState(e, onChangeState, state)
        
        expect('test2').toEqual(state['test']);
    })

    it('Testing updateAlert will update all fields severity, text, and open', () => {
        const [actual, onChangeState] = useState({
            severity: '',
            text: '',
            open: false
        })

        var ex = {
            severity: 'success',
            text: 'test test',
            open: true
        }

        updateAlert(
            ex.severity, 
            ex.text, 
            ex.open, 
            actual, 
            onChangeState)

        expect(ex.severity).toEqual(actual.severity)
        expect(ex.text).toEqual(actual.text)
        expect(ex.open).toEqual(actual.open)

    })
    
    it('Testing updateAlert will update all fields severity, text, and open are null', () => {
        const [actual, onChangeState] = useObjectState({
            severity: 'error',
            text: 'test1',
            open: false
        })

        var ex = {
            severity: 'error',
            text: 'test1',
            open: false
        }

        updateAlert(
            null, 
            null, 
            null, 
            actual, 
            onChangeState)

        expect(actual.severity).toEqual(ex.severity)
        expect(actual.text).toEqual(ex.text)
        expect(actual.open).toEqual(ex.open)

    })
    
    it('Testing updateShowPassword will update', () => {
        const actual = {
            showPassword: false
        }

        var ex = {
            showPassword: true
        }

        const onChange = newValue => {
            return newValue
        }

        updateShowPassword(
            onChange, 
            actual,
            ex.showPassword
        )

        expect(actual.showPassword).not.toBeNull()
    })

    it('Testing handleMouseDownPassword will be clicked', () => {
        const preventDefault = jest.fn()
        const actual = {
            e: {
                preventDefault: () => preventDefault()
            }
        }

        handleMouseDownPassword(actual.e)

        expect(preventDefault).toHaveBeenCalled();
    })
    
    it('Testing routeHome will call push when severity is success ', () => {
        const alert = {
            severity: 'success'
        }

        const history = {
            push: jest.fn()
        }

        routeHome(alert, history)

        expect(history.push).toHaveBeenCalled();
    })

    it('Testing routeHome will not be call push when severity is not success ', () => {
        const alert = {
            severity: 'error'
        }

        const history = {
            push: jest.fn()
        }

        routeHome(alert, history)

        expect(history.push).not.toHaveBeenCalled();
    })

    it('Testing logIn with valid email and password', () => {   
        const [actual, onChangeState] = useState({
            severity: '',
            text: '',
            open: false
        })

        const logInObject = {
            email:'test@email.com',
            password: 'password'
        }

        const auth = {
             data:{
                 user: {
                     uid: 'xxxx'
                 }
             }
           };

        logIn(
            auth,
            logInObject,
            actual,
            onChangeState
        )

        expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalled();
    })

    it('Testing logIn with invalid email and password', () => {   
        const [actual, onChangeState] = useState({
            severity: '',
            text: '',
            open: false
        })

        var ex = {
            severity: 'error',
            text: 'Email & password must be provider !',
            open: true
        }

        const logInObject = {
            email: null,
            password: null
        }

        const auth = {
             data:{
                 user: {
                     uid: 'xxxx'
                 }
             }
           };

        logIn(
            auth,
            logInObject,
            actual,
            onChangeState
        )

        expect(actual.severity).toEqual(ex.severity)
        expect(actual.text).toEqual(ex.text)
        expect(actual.open).toEqual(ex.open)
    })

    it('Testing MyAccount accountUpdated with valid authProvider and name', () => {
        const [actual, onChangeState] = useState({
            severity: '',
            text: '',
            open: false
        })

        const account = {
            authProvider: 'local',
            name: 'test',
            imageExt: 'png',
            uid: 'xxxx'
        }

        const firestore = useFirestoreMock();

        accountUpdated(
            firestore,
            account,
            actual,
            onChangeState
        )

        expect(firebaseStore.updateDoc).toHaveBeenCalled();
    })

    it('Testing MyAccount accountUpdated with invalid authProvider and name', () => {
        const [actual, onChangeState] = useState({
            severity: '',
            text: '',
            open: false
        })

        const account = {
            authProvider: '',
            name: '',
            imageExt: 'png',
            uid: 'xxxx'
        }

        var ex = {
            severity: 'error',
            text: 'AuthProvider & name must be provider !',
            open: true
        }

        const firestore = useFirestoreMock();

        accountUpdated(
            firestore,
            account,
            actual,
            onChangeState
        )

        expect(actual.severity).toEqual(ex.severity)
        expect(actual.text).toEqual(ex.text)
        expect(actual.open).toEqual(ex.open)
    })

    it('Testing MyAccount accountDelete with valid inputs', () => {
        const [actual, onChangeState] = useState({
            severity: '',
            text: '',
            open: false
        })

        const account = {
            authProvider: 'local',
            name: 'test',
            imageExt: 'png',
            uid: 'xxxx'
        }

        const firestore = useFirestoreMock();
        const auth = {
            currentUser: {
                delete: jest.fn().mockResolvedValue({})
             },
             data:{
                 user: {
                     uid: 'xxxx'
                 }
             }
           };

        const storage = useStorageMock();

        accountDelete(
            storage,
            firestore,
            auth,
            account,
            actual,
            onChangeState

        )

        expect(firebaseStorage.ref).toHaveBeenCalled();
        expect(firebaseStorage.deleteObject).toHaveBeenCalled();
        expect(firebaseStore.deleteDoc).toHaveBeenCalled();
        expect(auth.currentUser.delete).toHaveBeenCalled();
    })

    it('Testing Profile uploadImage', () => {
        const e = {
            target: {
                files:[{
                    lastModified: 1488239818000,
                    name: "FadeImage.jpg",
                    size: 643,
                    type: "image/jpeg"
                }]
            }
        }

        let file = null
        let preview = null

        const setFileName = newFile => file = newFile
        const setPreview = newPreview => preview = newPreview
        global.URL.createObjectURL = jest.fn();

        uploadImage(e, setFileName, setPreview)

        expect(file).not.toBeNull();
        expect(preview).not.toBeNull();
        expect(URL.createObjectURL).toHaveBeenCalled();
    })

    it('Testing Profile updateProfileInfo', () => {        
        const [actual, onChangeState] = useState({
            severity: '',
            text: '',
            open: false
        })

        const profile = {
            displayName: 'test_',
            email: 'test@test.com',
            photoURL: 'https://images.freeimages.com/images/large-previews/a35/wire-1230667.jpg',
            uid: 'xxxx'          
        }

        const user = {
            displayName: '',
            email: '',
            photoURL: '',
            uid: ''
        }

        const fileName = {
            lastModified: 1488239818000,
            name: "FadeImage.jpg",
            size: 643,
            type: "image/jpeg"
        }

        const firestore = useFirestoreMock();
        const storage = useStorageMock();

        updateProfileInfo(
            firestore,
            storage,
            user,
            profile,
            fileName,
            actual,
            onChangeState
        )
        
        expect(firebaseAuth.updateProfile).toHaveBeenCalled();
        expect(firebaseStore.doc).toHaveBeenCalled();
        expect(firebaseStore.updateDoc).toHaveBeenCalled();
        expect(firebaseStorage.ref).toHaveBeenCalled();
        expect(firebaseStorage.uploadBytesResumable).toHaveBeenCalled();
    })

    it('Testing SignUp createUser', () => {     
        const [actual, onChangeState] = useState({
            severity: '',
            text: '',
            open: false
        })

        var reg = {
            email: 'email@t.com',
            password: 'password',
            name: 'name',
            showPassword: false
        }

        const firestore = useFirestoreMock();
        const auth = {
            currentUser: {
                delete: jest.fn().mockResolvedValue({})
             },
             data:{
                 user: {
                     uid: 'xxxx'
                 }
             }
           };

        createUser(
            auth,
            firestore,
            reg,
            actual,
            onChangeState
        )

        expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalled();
        expect(firebaseStore.doc).toHaveBeenCalled();
    })

    it('Testing SignUp createUser with not inputs', () => {     
        const [actual, onChangeState] = useState({
            severity: '',
            text: '',
            open: false
        })

        var reg = {
            email: '',
            password: '',
            name: '',
            showPassword: false
        }

        const firestore = useFirestoreMock();
        const auth = {
            currentUser: {
                delete: jest.fn().mockResolvedValue({})
             },
             data:{
                 user: {
                     uid: 'xxxx'
                 }
             }
           };

        createUser(
            auth,
            firestore,
            reg,
            actual,
            onChangeState
        )

        expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalled();
        expect(firebaseStore.doc).toHaveBeenCalled();
        expect(firebaseStore.setDoc).toHaveBeenCalled();
    })
})