import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const SocialLogIn = () => {
    const { setUser, signInGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const handleSignIn = (e) => {
        e.preventDefault();
        signInGoogle()
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sign Up Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUser(res.user);
                //create user in database
                const newUser = {
                    displayName: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL
                }
                axiosSecure.post('/users', newUser)
                    .then((res) => {
                        if (res.data.insertedId) {
                            // console.log('User created in database');
                        }

                    })
                navigate(location?.state || '/');
            })
            .catch(err => console.log(err));

    }

    return (
        <div>
            <h1 className="text-xl text-center my-1">OR</h1>

            <button
                onClick={handleSignIn}
                className="btn bg-white text-black border-[#e5e5e5] w-full"
            >
                <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <g>
                        <path d="m0 0H512V512H0" fill="#fff" />
                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                    </g>
                </svg>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogIn;
