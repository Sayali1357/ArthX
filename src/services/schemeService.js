import axios from 'axios';
import { getUserData } from '../utils/auth';

const API_URL = 'http://localhost:5000/government-schemes';

// Get headers with auth token
const getAuthHeaders = () => {
    const userData = getUserData();
    if (!userData?.token) {
        throw new Error('No authentication token found');
    }
    return {
        headers: {
            'x-auth-token': userData.token
        }
    };
};

// ===================== API Methods =====================

// 1. Get all government schemes
export const getAllSchemes = async () => {
    try {
        const response = await axios.get(API_URL, getAuthHeaders());
        console.log(`✅ Retrieved ${response.data.length} schemes`);
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching schemes:', error.response?.data || error.message);
        throw error;
    }
};

// 2. Check eligibility for all schemes for a user
export const checkEligibility = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/eligibility/${userId}`, getAuthHeaders());
        console.log(`✅ Retrieved eligibility for user ${userId}: ${response.data.length} items`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error checking eligibility for user ${userId}:`, error.response?.data || error.message);
        throw error;
    }
};

// 3. Get specific scheme by ID
export const getSchemeById = async (schemeId) => {
    try {
        const response = await axios.get(`${API_URL}/${schemeId}`, getAuthHeaders());
        console.log(`✅ Retrieved scheme with ID: ${schemeId}`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error fetching scheme ${schemeId}:`, error.response?.data || error.message);
        throw error;
    }
};
