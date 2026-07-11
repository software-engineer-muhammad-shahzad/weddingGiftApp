const endpoints = {
  // audth-details
  auth: {
    signup: "/Auth/register",
    verifyOtp: "/Auth/verifysignup",
    resendOtp: "/Auth/resendsignupverification",
    login: "/Auth/Login",
    forgotPassword: "/Auth/forgotpassword",
    setNewPassword: "/Auth/resetpassword",
  },
  // dashboard-details
  dashboard: {
    coupleDashboard: "/couple/dashboard",
    coupleContributionList: "/couple/contributions",
  },
  // notification-details
  notifications: {
    coupleNotification: "/couple/notifications",
  },
  // bank-details
  bankdetails: {
    coupleBankDetails: "/couple/bankdetails",
  },
  // couple-profile-details
  coupleProfile: {
    coupleProfileDetails: "/couple/profile",
    updateCoupleProfile: "/couple/profile/photo",
    deleteCoupleProfile: "/couple/profile/photo",
  },

  // support-ticket
  support: {
    coupleSubmitTicket: "/couple/support/tickets",
  },
  greetings: {
    coupleGreetings: "/couple/greetings",
  },
  qrCode: {
    getQrCode: "/couple/getqrcodeinfo",
  },

  sendGift: {
    sendGift: "/usermanagement/users/{userid}",
    createUserServer: "/usermanagement/users/guest/create",
    createUserStripe: "/payments/stripe/customer/{guestid}",
  },
  payment: {
    createCard: "/payments/stripe/customer/createcard",
    makePayment: "/payments/payment/chargepayment",
  },
};

export default endpoints;
