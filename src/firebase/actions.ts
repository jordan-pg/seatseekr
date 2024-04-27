import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithPopup,
	signOut,
	sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "./config";
import {
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
} from "firebase/auth";

interface UserProfile {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export const createUser = async (newUserData: UserProfile) => {
	const { email, password, firstName, lastName } = newUserData;
	const { user } = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);

	const userRef = doc(collection(db, "users"), user.uid);
	await setDoc(userRef, {
		firstName,
		lastName,
		email,
	});

	return {
		id: user.uid,
		firstName,
		lastName,
		email,
	};
};

export const getUserData = async (userId: string) => {
	const userRef = doc(collection(db, "users"), userId);
	const userSnap = await getDoc(userRef);
	return userSnap.data();
};

export const handleLogout = async () => {
	const auth = getAuth();
	await signOut(auth)
		.then(() => {
			alert("You have signed out successfully");
		})
		.catch(() => {
			alert("Something went wrong.");
		});
};

export const handleGoogleSignIn = async () => {
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	await setPersistence(auth, browserSessionPersistence).then(() => {
		return signInWithPopup(auth, provider)
			.then(() => {
				console.log("User signed in with Google successfully");
			})
			.catch((error) => {
				console.error(error);
			});
	});
};

export const handleEmailSignIn = async (email: string, password: string) => {
	await setPersistence(auth, browserSessionPersistence).then(() => {
		return signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				console.log("Successful user sign in.");
			})
			.catch((error) => {
				const errorMessage = getAuthErrorMessage(error.code);
				alert(errorMessage);
			});
	});
};

export const handleForgotEmail = async (email: string) => {
	const auth = getAuth();
	await sendPasswordResetEmail(auth, email)
		.then(() => {
			alert("Password reset email sent!");
		})
		.catch((error) => {
			const errorMessage = getAuthErrorMessage(error.code);
			console.log(error);
			alert(errorMessage);
		});
};

export const getAuthErrorMessage = (errorCode: string) => {
	switch (errorCode) {
		case "auth/invalid-email":
			return "Please enter a valid email address.";
		case "auth/missing-email":
			return "Please enter a valid email address.";
		case "auth/user-not-found":
			return "Sorry, we couldn't find a user with that email address.";
		case "auth/wrong-password":
			return "Sorry, that password is incorrect. Please try again.";
		case "auth/weak-password":
			return "Your password must be at least 6 characters long.";
		case "auth/email-already-in-use":
			return "That email address is already in use. Please use a different one or sign in.";
		case "auth/network-request-failed":
			return "Sorry, there was a problem connecting to the server. Please try again later.";
		case "auth/too-many-requests":
			return "Sorry, you have made too many attempts to sign in. Please try again later.";
		case "auth/operation-not-allowed":
			return "Sorry, that operation is not allowed. Please contact support for assistance.";
		case "auth/user-disabled":
			return "Sorry, this account has been disabled. Please contact support for assistance.";
		case "auth/account-exists-with-different-credential":
			return "Sorry, that email address is already associated with a different account. Please sign in using a different method or contact support for assistance.";
		default:
			return "Sorry, there was an error. Please try again later.";
	}
};
