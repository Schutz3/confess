import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const COOLDOWN_PERIOD = 60000;

// Helper functions for validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

const useMessageStore = create((set, get) => ({
  message: '',
  to: '',
  mode: false,
  isLoading: false,
  error: null,

  setMessage: (message) => set({ message }),
  setTo: (to) => set({ to }),
  setMode: (mode) => set({ mode: Boolean(mode) }),

  sendMessage: async () => {
    set({ isLoading: true, error: null });

    const lastSubmissionTime = sessionStorage.getItem('lastSubmissionTime');
    const currentTime = Date.now();

    if (lastSubmissionTime && currentTime - parseInt(lastSubmissionTime) < COOLDOWN_PERIOD) {
      set({ 
        isLoading: false, 
        error: `Please wait ${Math.ceil((COOLDOWN_PERIOD - (currentTime - parseInt(lastSubmissionTime))) / 1000)} seconds before submitting again.`
      });
      return;
    }

    try {
      const { message, to, mode } = get();

      if (!isValidEmail(to) && !isValidPhoneNumber(to)) {
        set({ isLoading: false, error: 'Please enter a valid email address or phone number.' });
        return;
      }

      const whoisResponse = await fetch('https://hutils.loxal.net/whois');
      const whoisData = await whoisResponse.json();

      const messageDetails = {
        mode,
        to,
        message,
        details: Object.entries(whoisData).map(([key, value]) => ({
          field: key,
          value: value.toString()
        }))
      };

      const response = await axiosInstance.post('/send', messageDetails);

      sessionStorage.setItem('lastSubmissionTime', currentTime.toString());

      set({ isLoading: false, message: '', to: '' });
      return response.data;
    } catch (error) {
      let errorMessage = 'An error occurred while sending the message.';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'No response received from the server. Please try again later.';
      }
      set({ isLoading: false, error: errorMessage });
    }
  },

  clearError: () => set({ error: null })
}));

export default useMessageStore;