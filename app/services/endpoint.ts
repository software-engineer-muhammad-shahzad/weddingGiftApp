const endpoints = {
  auth: {
    signup: "/Auth/register",
    verifyOtp: "/Auth/verifysignup",
    resendOtp: "/Auth/resendsignupverification",
    login: "/Auth/Login",
    forgotPassword: "/Auth/forgotpassword",
    setNewPassword: "/Auth/resetpassword",

  },
  dashboard: {
    coupleDashboard: "/couple/dashboard",
    coupleContributionList:"/couple/contributions"

  },
  notifications:{

    coupleNotification:"/couple/notifications"
  },
  
  bankdetails:{
    coupleBankDetails:"/couple/bankdetails"


  }
};

export default endpoints;
