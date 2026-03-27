import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL || (process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + '';

const API_URL = `${BASE_URL}/users`;
const FINANCIAL_API_URL = `${BASE_URL}/financial`;
const FUNDING_API_URL = `${BASE_URL}/funding`;
const CHATBOT_API_URL = `${BASE_URL}/chatbot`;
const PAYMENTS_API_URL = `${BASE_URL}/payments`;
const VIRTUAL_PITCH_API_URL = `${BASE_URL}/virtual-pitch`;
const MEETINGS_API_URL = `${BASE_URL}/meetings`;
const NOTIFICATIONS_API_URL = `${BASE_URL}/notifications`;

// Auth Header Helper
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// ================= User APIs =================
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', response.data.userType);
        if (response.data.user) {
            localStorage.setItem('userName', response.data.user.name || '');
            localStorage.setItem('userId', response.data.user.id || '');
        }
    }
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', response.data.userType);
        if (response.data.user) {
            localStorage.setItem('userName', response.data.user.name || '');
            localStorage.setItem('userId', response.data.user.id || '');
        }
    }
    return response.data;
};

export const getUserProfile = async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}`, getAuthHeader());
    return response.data;
};

export const updateUserProfile = async (userId, profileData) => {
    const response = await axios.put(`${API_URL}/${userId}`, profileData, getAuthHeader());
    return response.data;
};

// ================= Financial APIs =================
export const saveCashFlowForecast = async (forecastData) => {
    const response = await axios.post(`${FINANCIAL_API_URL}/forecast`, forecastData, getAuthHeader());
    return response.data;
};

export const getCashFlowForecasts = async () => {
    const response = await axios.get(`${FINANCIAL_API_URL}/forecasts`, getAuthHeader());
    return response.data;
};

export const getCashFlowForecast = async (id) => {
    const response = await axios.get(`${FINANCIAL_API_URL}/forecast/${id}`, getAuthHeader());
    return response.data;
};

export const updateCashFlowForecast = async (id, forecastData) => {
    const response = await axios.put(`${FINANCIAL_API_URL}/forecast/${id}`, forecastData, getAuthHeader());
    return response.data;
};

export const deleteCashFlowForecast = async (id) => {
    const response = await axios.delete(`${FINANCIAL_API_URL}/forecast/${id}`, getAuthHeader());
    return response.data;
};

// Working Capital
export const saveWorkingCapitalAnalysis = async (analysisData) => {
    const response = await axios.post(`${FINANCIAL_API_URL}/working-capital/analysis`, analysisData, getAuthHeader());
    return response.data;
};

export const getWorkingCapitalAnalyses = async () => {
    const response = await axios.get(`${FINANCIAL_API_URL}/working-capital/analyses`, getAuthHeader());
    return response.data;
};

export const getWorkingCapitalAnalysis = async (id) => {
    const response = await axios.get(`${FINANCIAL_API_URL}/working-capital/analysis/${id}`, getAuthHeader());
    return response.data;
};

export const updateWorkingCapitalAnalysis = async (id, analysisData) => {
    const response = await axios.put(`${FINANCIAL_API_URL}/working-capital/analysis/${id}`, analysisData, getAuthHeader());
    return response.data;
};

export const deleteWorkingCapitalAnalysis = async (id) => {
    const response = await axios.delete(`${FINANCIAL_API_URL}/working-capital/analysis/${id}`, getAuthHeader());
    return response.data;
};

// ================= Chatbot APIs =================
export const checkChatbotStatus = async () => {
    const response = await axios.get(`${CHATBOT_API_URL}/status`);
    return response.data;
};

export const sendChatMessage = async (message) => {
    const response = await axios.post(`${CHATBOT_API_URL}/message`, { message });
    return response.data;
};

export const getPersonalizedRecommendations = async (message = '') => {
    const response = await axios.post(`${CHATBOT_API_URL}/recommendations`, { message }, getAuthHeader());
    return response.data;
};

// ================= Funding APIs =================
export const getAllFundingRequests = async () => {
    const response = await axios.get(`${FUNDING_API_URL}/all`, getAuthHeader());
    return response.data;
};

export const getFundingRequestById = async (id) => {
    const response = await axios.get(`${FUNDING_API_URL}/${id}`, getAuthHeader());
    return response.data;
};

export const expressFundingInterest = async (id, message = '') => {
    const response = await axios.post(`${FUNDING_API_URL}/${id}/interest`, { message }, getAuthHeader());
    return response.data;
};

export const acceptFundingInterest = async (fundingId, interestId) => {
    const response = await axios.post(`${FUNDING_API_URL}/${fundingId}/accept-interest/${interestId}`, {}, getAuthHeader());
    return response.data;
};

export const deleteFundingRequest = async (id) => {
    const response = await axios.delete(`${FUNDING_API_URL}/${id}`, getAuthHeader());
    return response.data;
};

// ================= Notifications =================
export const getNotifications = async () => {
    const response = await axios.get(NOTIFICATIONS_API_URL, getAuthHeader());
    return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
    const response = await axios.put(`${NOTIFICATIONS_API_URL}/${notificationId}/read`, {}, getAuthHeader());
    return response.data;
};

// ================= Payments =================
export const createPaymentOrder = async (orderData) => {
    const response = await axios.post(`${PAYMENTS_API_URL}/create-order`, orderData, getAuthHeader());
    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await axios.post(`${PAYMENTS_API_URL}/verify`, paymentData, getAuthHeader());
    return response.data;
};

export const getPaymentHistory = async () => {
    const response = await axios.get(`${PAYMENTS_API_URL}/history`, getAuthHeader());
    return response.data;
};

// ================= Virtual Pitches =================
export const getVirtualPitchForMeeting = async (meetingId) => {
    const response = await axios.get(`${MEETINGS_API_URL}/${meetingId}/virtual-pitch`, getAuthHeader());
    return response.data;
};

export const getMeetings = async () => {
    const response = await axios.get(MEETINGS_API_URL, getAuthHeader());
    return response.data;
};

export const getOrCreateVirtualPitchByRoomId = async (roomId) => {
    const response = await axios.get(`${VIRTUAL_PITCH_API_URL}/room/${roomId}`, getAuthHeader());
    return response.data;
};

export const getAllVirtualPitches = async (queryParams = {}) => {
    const { industry, search } = queryParams;
    const params = new URLSearchParams();
    if (industry) params.append('industry', industry);
    if (search) params.append('search', search);

    const url = params.toString()
        ? `${VIRTUAL_PITCH_API_URL}?${params.toString()}`
        : VIRTUAL_PITCH_API_URL;

    const response = await axios.get(url, getAuthHeader());
    return response.data;
};

export const getMyVirtualPitches = async () => {
    const response = await axios.get(`${VIRTUAL_PITCH_API_URL}/my-pitches`, getAuthHeader());
    return response.data;
};

export const joinVirtualPitch = async (pitchId) => {
    const response = await axios.post(`${VIRTUAL_PITCH_API_URL}/${pitchId}/join`, {}, getAuthHeader());
    return response.data;
};
