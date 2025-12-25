import { setResponse } from "../slices/ResponseSlice";
import { forgotPasswordPopup, setSignIn } from "../slices/SignInSignUpSlice";
import { setUser } from "../slices/userSlice";
// import { setUser } from "../Slice/userSlice";

// export const userLogin = (build) => {
//   return build.mutation({
//     query: (payload) => {

//  console.log("Login payload:", payload)
//       return {
//         url: "/api/users/login",
//         method: "POST",
//         data: payload,
//       };
//     },
//     async onQueryStarted(_, { queryFulfilled, dispatch }) {
//       try {
//         const { data } = await queryFulfilled;

//         dispatch(setResponse({ success: data?.success }))

//       } catch (error) {
//         console.log(error, "error");

//         const res = error?.error?.data?.error;
//         dispatch(setResponse({ error: res }));
//       }
//     },
//   });
// };

export const userLogin = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/users/login",
      method: "POST",
      body: payload,
    }),
    async onQueryStarted(_, { queryFulfilled, dispatch }) {
      try {
        const { data } = await queryFulfilled;

        console.log(data, "user in service");
        const token = data?.data?.token;
        const user = data?.data?.user;

        if (token) {
          localStorage.setItem("auth-token", token);
          localStorage.setItem("auth-user", JSON.stringify(user));

          localStorage.setItem("auth-user-role", data?.data?.user?.role);
        }

        // dispatch(setUser({ result: user }));
        dispatch(setResponse({ success: data?.success }));
      } catch (error) {
        console.log(error, "login error");
        const res = error?.error?.data?.error;
        dispatch(setResponse({ error: res }));
      }
    },
  });
};


export const user = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/users/login",
      method: "POST",
      body: payload,
    }),
    async onQueryStarted(_, { queryFulfilled, dispatch }) {
      try {
        const { data } = await queryFulfilled;

        console.log(data, "user in service");
        const token = data?.data?.token;
        const user = data?.data?.user;

        if (token) {
          localStorage.setItem("auth-token", token);
          localStorage.setItem("auth-user", JSON.stringify(user));

          localStorage.setItem("auth-user-role", data?.data?.user?.role);
        }

        // dispatch(setUser({ result: user }));
        dispatch(setResponse({ success: data?.success }));
      } catch (error) {
        console.log(error, "login error");
        const res = error?.error?.data?.error;
        dispatch(setResponse({ error: res }));
      }
    },
  });
};


export const updateUserProfile = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/users/updateprofile", // Adjust this to match your actual API endpoint
      method: "POST",             // Usually, PUT or PATCH is used for updating
      body: payload,
    }),
    // async onQueryStarted(_, { queryFulfilled, dispatch }) {
    //   try {
    //     const { data } = await queryFulfilled;

    //     console.log(data, "profile updated");

    //     const updatedUser = data?.data?.user;

    //     if (updatedUser) {
    //       sessionStorage.setItem("auth-user", JSON.stringify(updatedUser));
    //     }

    //     dispatch(setResponse({ success: data?.success }));
    //   } catch (error) {
    //     console.log(error, "profile update error");
    //     const res = error?.error?.data?.error;
    //     dispatch(setResponse({ error: res }));
    //   }
    // },
  });
};



// export const userSignUp = (build) => {
//   return build.mutation({
//     query: (payload) => {
//       return {
//         url: "/api/users/register",
//         method: "POST",
//         data: payload,
//       };
//     },
//     async onQueryStarted(_, { queryFulfilled, dispatch }) {
//       try {
//         const { data } = await queryFulfilled;
//         dispatch(setResponse({ success: data?.success }));
//       } catch (error) {
//         const res = error?.error?.data?.error;
//         dispatch(setResponse({ error: res }));
//         console.log(error, "error");
//       }
//     },
//   });
// };

export const userSignUp = (build) => {
  return build.mutation({
    query: (payload) => {
      return {
        url: "/api/users/register",
        method: "POST",
        body: payload.registrationData, // only send registration part
      };
    },

    // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //   try {
    //     const captchaPayload = arg?.captchaPayload;
    //     console.log("payload", arg, captchaPayload);
    //     // Step 1: Validate CAPTCHA
    //     // const captchaResponse = await fetch("/api/recaptcha", {
    //     //   method: "POST",
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //   },
    //     //   body: JSON.stringify(captchaPayload),
    //     // });

    //     // const captchaResult = await captchaResponse.json();

    //     // if (!captchaResult.success) {
    //     //   console.log("Captcha verification failed");
    //     //   dispatch(setResponse({ error: "Captcha verification failed" }));
    //     //   return;
    //     // }

    //     // Step 2: Proceed with user registration
    //     const { data } = await queryFulfilled;
    //     dispatch(setResponse({ success: data?.success }));
    //   } catch (error) {
    //     const res =
    //       error?.error?.data?.error || "An error occurred during signup";
    //     dispatch(setResponse({ error: res }));
    //     console.log("Registration error:", error);
    //   }
    // },
  });
};

// to send link on email

export const userResetPassword = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/users/forgotpassword",
      method: "PUT",
      body: payload,
    }),
  });
};




// to change pssword based on emial, otp revieved via email and newpassword

export const userChangePassword = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/users/resetpassword",
      method: "PUT",
      body: payload,
    }),
  });
};


export const getProfile = (build) => {
   return build.query({
    query: () => ({
      url: `/api/users/profile`,
      method: "GET",
      // body: payload,
    }),
  });
};

