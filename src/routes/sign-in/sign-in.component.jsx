import {signInWIthGooglePopup } from '../../utils/firebase/firebase.utils'

const SignIn = () =>{
    const logGoogleUser = async () => {
        const response = await signInWIthGooglePopup();
        console.log(response);
    }
    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    )
}

export default SignIn