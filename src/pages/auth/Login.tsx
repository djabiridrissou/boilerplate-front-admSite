import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setConnectedUserToLocalStorage, signOut, update } from "../../redux/auth/auth";
import { toast } from 'react-toastify';
import { setUserCreated } from "../../redux/auth/auth";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userStored = localStorage.getItem("user");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (userStored) {
            dispatch(update({
                userDto: { "connected": false },
                userId: JSON.parse(userStored).user.userId
            }) as any)
        }
        dispatch(signOut() as any);
    }, []);

    const submit = (e: any) => {
        e.preventDefault();
        dispatch(login({ userDto: { "identifier": email, "password": password } }) as any).unwrap().then((res: any) => {
            if (res.status === 200) {
                if (res.data.passwordToChange != "") {
                    dispatch(setUserCreated(res.data));
                    navigate("/change-password");
                    toast.info('Please change your password');
                } else {
                    dispatch(setConnectedUserToLocalStorage({ user: res.data, token: res.token }) as any).unwrap().then(() => {
                        navigate("/debt-system");
                        toast.success('Login successful');
                    });
                }
            } else {
                setError(true);
                setErrorMessage(res.data.message);
            }
        }).catch((error: any) => {
            console.log(error);
            setError(true);
            setErrorMessage("Something went wrong, please try again");
        });

    }
    return (
        <>
            <div className="flex flex-col sm:flex-row h-screen"> {/* Utilisez h-screen pour couvrir la hauteur totale */}
                <div className="sm:w-1/2 flex flex-col justify-center sm:items-center mt-4">
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
                            <h2 className="text-center text-xsm font-bold leading-9 tracking-tight text-gray-900">Enter Your Credentials To Log In</h2>
                        </div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
                            <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold leading-6 text-gray-900">
                                            Identifier
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="string"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                autoComplete="email"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray-900">
                                            Password
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
                                        <button

                                            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={(e) => submit(e)}
                                        >
                                            Log In
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

export default Login;