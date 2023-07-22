const BACKEND_URL = 'http://localhost:4500';
const userUrl = `${BACKEND_URL}/api/v1/user`;
const orderUrl = `${BACKEND_URL}/api/v1/order`;

export const urlMap = {
  login: `${userUrl}/login`,
  register: `${userUrl}/register`,
  userProfile: `${userUrl}/me`,
  createConference: `${orderUrl}/create`,
  getSingleConference: `${orderUrl}/single`,
  getAllConferences: `${orderUrl}/all`,
  submitPaper: `${orderUrl}/paper/submit`,
  addReviewer: `${orderUrl}/reviewer/add`,
  assignReviewer: `${orderUrl}/reviewer/assign`,
  sendEmails: `${orderUrl}/email/send`,
  getReviewPapers: `${orderUrl}/review/paper`,
  submitReview: `${orderUrl}/paper/review/submit`,
  submitPlag: `${orderUrl}/plag/submit`,
  changeConferenceStatus: `${orderUrl}/status/change`,
  changeConferenceConfiguration: `${orderUrl}/configuration/change`,
  getReviewersSummary: `${orderUrl}/reviewer/summary`,
};
