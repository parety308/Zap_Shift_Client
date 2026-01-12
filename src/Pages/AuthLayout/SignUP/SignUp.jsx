import { Link, useLocation, useNavigate } from 'react-router';
import authImage from '../../../assets/authImage.png';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import SignUpLoading from '../../../components/SignUpLoading/SignUpLoading';
import { useState } from 'react';
const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const handleRegistration = (data) => {
    setLoading(true);
    const profileImg = data.photo[0];
    createUser(data.email, data.password)
      .then(res => {
        const formData = new FormData();
        formData.append('image', profileImg);
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_HOST}`, formData)
          .then(res => {
            const photoURL = res.data.data.url;

            //create user in database
            const newUser = {
              displayName: data.name,
              email: data.email,
              photoURL: photoURL
            }
            axiosSecure.post('/users', newUser)
              .then((res) => {
                if (res.data.insertedId) {
                  console.log('User created in database');
                }
              })
              .catch(err => console.log(err));

            // Update user profile in firebase
            const userProfile = {
              displayName: data.name,
              photoURL: photoURL
            };
            updateUserProfile(userProfile)
              .then(() => {
                setLoading(false);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Sign Up Successfully",
                  showConfirmButton: false,
                  timer: 1500
                });

                navigate(location?.state || '/');
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

  }
  if (loading) {
    return <SignUpLoading />
  }
  return (
    <>

      <div className='w-10/12 mx-auto lg:flex md:flex justify-between items-center'>
        <div className='w-100 bg-base-100 shadow-sm p-4 my-10'>
          <h1 className="text-4xl font-bold">Create an Account</h1>
          <p>Sign Up with ZapShift</p>

          <form onSubmit={handleSubmit(handleRegistration)}>
            <fieldset className="fieldset">

              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name && <p className='text-red-500'>Name is required</p>}

              {/* Photo */}
              <label className="label">Photo</label>
              <input
                type="file"
                {...register('photo', { required: true })}
                className="file-input"
              />
              {errors.photo && <p className='text-red-500'>Photo is required</p>}

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email && <p className='text-red-500'>Email is required</p>}

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password && (
                <p className='text-red-500'>
                  Password must include uppercase, lowercase, number & special character
                </p>
              )}

              <button type="submit" className="btn bg-lime-300 mt-4">
                Sign Up
              </button>

              <SocialLogIn />
            </fieldset>
          </form>

          <Link
            // state={location.state}
            to="/auth/login"
            state={location.state}
            className="text-blue-500 text-center block mt-3"
          >
            Already have an account? Login
          </Link>
        </div>

        <img src={authImage} alt="Auth" />
      </div>
    </>
  );
};

export default SignUp;