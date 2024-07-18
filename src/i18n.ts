import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      
      "TH":"TH",
      "EN":"EN",
      "Move Shape": "Move Shape",
      "Move Position": "Move Position",
      
    }
  },
  th: {
    translation: {
      
      "TH":"ไทย",
      "EN":"อังกฤษ",
      "Move Shape": "เลื่อนรูปทรง",
      "Move Position": "สลับตำแหน่ง",
    
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: true
    }
  });

export default i18n;