import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";

const COOLDOWN_PERIOD = 60000;

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{7,14}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
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
      const waitTime = Math.ceil((COOLDOWN_PERIOD - (currentTime - parseInt(lastSubmissionTime))) / 1000);
      const errorMessage = `Sabar dikit napa, sisa ${waitTime} detik lagi baru lo bisa ngirim`;
      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
      return;
    }

    try {
      const { message, to, mode } = get();

      if (!isValidEmail(to) && !isValidPhoneNumber(to)) {
        const errorMessage = 'Masukin email atau no hp yg valid';
        set({ isLoading: false, error: errorMessage, to: '' });
        toast.error(errorMessage);
        return;
      }
      if (message.trim() === ''  || message.trim().length < 5) {
        const errorMessage = 'Pendek amat pesan lo';
        set({ isLoading: false, error: errorMessage });
        toast.error(errorMessage);
        return;
      }

    const whoisResponse = await fetch('https://hutils.loxal.net/whois');
    const whoisData = await whoisResponse.json();

    const messageDetails = {
      mode,
      to,
      message,
      details: [whoisData]
    };


      const response = await axiosInstance.post('/send', messageDetails);

      sessionStorage.setItem('lastSubmissionTime', currentTime.toString());

      set({ isLoading: false, message: '', to: '' });
      toast.success(response.data.message || 'Pesan lo berhasil dikirim.' );
      return response.data;
    } catch (error) {
      let errorMessage = 'Error gan';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Error gan, backend ngamuk';
      }
      set({ isLoading: false, error: errorMessage });
      toast.error(error.response.data.message);
    }
  },

  clearError: () => set({ error: null })
}));

export default useMessageStore;