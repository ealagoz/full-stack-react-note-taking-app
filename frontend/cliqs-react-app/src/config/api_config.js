export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  ENDPOINTS: {
    GET_NOTES: import.meta.env.VITE_API_ENDPOINTS_GET_NOTES,
    ADD_NOTE: import.meta.env.VITE_API_ENDPOINTS_ADD_NOTE,
    UPDATE_NOTE: import.meta.env.VITE_API_ENDPOINTS_UPDATE_NOTE,
    DELETE_NOTE: import.meta.env.VITE_API_ENDPOINTS_DELETE_NOTE,
  },
};
