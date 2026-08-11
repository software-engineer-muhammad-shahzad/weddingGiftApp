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
    coupleNotification: "/notifications/getusernotifications",
    markAllRead: "/notifications/markallread",
    dismissAnnouncement:
      "/notifications/announcements/{announcementId}/dismiss",
  },
  // bank-details
  bankdetails: {
    coupleBankDetails: "/couple/bankdetails",
  },
  // couple-profile-details
  coupleProfile: {
    coupleProfileDetails: "/couple/profile",
    updateCoupleProfile: "/usermanagement/users/profile/photo",
    deleteCoupleProfile: "/usermanagement/users/{userId}/profile/photo",
  },

  // support-ticket
  support: {
    coupleSubmitTicket: "/notifications/support",
  },
  greetings: {
    coupleGreetings: "/couple/greetings/list",
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
    attachPaymentMethod: "/payments/stripe/paymentmethod/attach",
    makePayment: "/payments/payment/chargepayment",
    uploadWishingVideo: "/payments/upload/wishingvideo",
  },
  guest: {
    getCoupleDetails: "/guest/invite/{publicSlug}",
  },
};

export default endpoints;
