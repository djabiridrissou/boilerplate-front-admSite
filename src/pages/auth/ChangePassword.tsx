import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../../redux/auth/auth";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const userCreated = useSelector((state: any) => state.auth.userCreated);
    console.log("user created", userCreated?.fullName);

    useEffect(() => {
        //dispatch(signOut() as any);
    }, []);

    const submit = (e: any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError(true);
            setErrorMessage("Passwords do not match");
            return;
        }
        if (password === userCreated.passwordToChange) {
            setError(true);
            setErrorMessage("New password cannot be the same as old password");
            return;
        }
        dispatch(update({
            userDto: { "identifier": userCreated.identifier, "password": password, "fullName": userCreated.fullName, "passwordToChange": "", "role": userCreated.role },
            userId: userCreated.userId
        }) as any).unwrap().then((res: any) => {
            if (res.status === 200) {
                console.log("success", res);
                setPassword("");
                setConfirmPassword("");
                navigate("/");
                toast.success('Password updated, Log in to continue');
            } else {
                setError(true);
                setErrorMessage(res.data.message);
                console.log("error", res);
            }
        }).catch((error: any) => {
            console.log(error);
            setError(true);
            setErrorMessage("Something went wrong, please try again");
        });

    }
    return (
        <>
            <div className="flex flex-col sm:flex-row  overflow-hidden h-screen"> {/* Utilisez h-screen pour couvrir la hauteur totale */}
                <div className="sm:w-1/2 flex flex-col justify-center sm:items-center">
                    <img
                        className="mx-auto h-20 w-auto"
                        src="/images/coarm.png"
                        alt="coat of arm"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Debt Management System
                    </h2>
                </div>
                <div className="w-full sm:w-1/2 sm:items-center">
                    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center items-center">
                            {/* Image Logo and title */}
                            <h2 className="text-center text-xsm font-bold leading-9 tracking-tight text-gray-900">Change Your Password</h2>
                        </div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
                            <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
                                <div className="space-y-6">
                                   
                                    
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray-900">
                                            New Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray-900">
                                            Confirm New Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button

                                            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={(e) => submit(e)}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                    {error && <p className="text-red-500 text-center">{errorMessage}</p>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChangePassword;