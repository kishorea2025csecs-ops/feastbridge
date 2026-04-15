import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "ta";

const translations = {
  // Navbar
  "nav.home": { en: "Home", ta: "முகப்பு" },
  "nav.map": { en: "Map", ta: "வரைபடம்" },
  "nav.contact": { en: "Contact", ta: "தொடர்பு" },
  "nav.dashboard": { en: "Dashboard", ta: "கட்டுப்பாட்டு பலகை" },
  "nav.login": { en: "Login", ta: "உள்நுழை" },
  "nav.logout": { en: "Logout", ta: "வெளியேறு" },
  "nav.hi": { en: "Hi", ta: "வணக்கம்" },

  // Landing - Hero
  "hero.badge": { en: "Reducing Food Waste in Chennai", ta: "சென்னையில் உணவு வீணாவதை குறைத்தல்" },
  "hero.title1": { en: "Connect Surplus Food with Those Who", ta: "உபரி உணவை தேவைப்படுபவர்களுடன்" },
  "hero.title2": { en: "Need It Most", ta: "இணைக்கவும்" },
  "hero.desc": {
    en: "Feast Bridge connects restaurants with excess food to NGOs serving underprivileged communities in Chennai. Together, we fight hunger and reduce waste.",
    ta: "Feast Bridge அதிகப்படியான உணவை வைத்திருக்கும் உணவகங்களை சென்னையில் நலிவடைந்த சமூகங்களுக்கு சேவை செய்யும் தொண்டு நிறுவனங்களுடன் இணைக்கிறது.",
  },
  "hero.getStarted": { en: "Get Started", ta: "தொடங்குங்கள்" },
  "hero.viewMap": { en: "View Map", ta: "வரைபடம் பார்க்க" },

  // Landing - Stats
  "stats.foodSaved": { en: "Kg Food Saved", ta: "கிலோ உணவு சேமிக்கப்பட்டது" },
  "stats.ngos": { en: "NGOs Connected", ta: "தொண்டு நிறுவனங்கள்" },
  "stats.restaurants": { en: "Restaurants Joined", ta: "உணவகங்கள் இணைந்தன" },

  // Landing - How It Works
  "how.title": { en: "How It Works", ta: "இது எப்படி செயல்படுகிறது" },
  "how.desc": {
    en: "A simple three-step process to turn surplus food into meals for those in need.",
    ta: "உபரி உணவை தேவைப்படுபவர்களுக்கு உணவாக மாற்றும் எளிய மூன்று-படி செயல்முறை.",
  },
  "how.step1.title": { en: "List Surplus Food", ta: "உபரி உணவை பதிவிடுங்கள்" },
  "how.step1.desc": {
    en: "Restaurant owners register and post details about excess food — type, quantity, and pickup window.",
    ta: "உணவக உரிமையாளர்கள் பதிவு செய்து அதிகப்படியான உணவின் விவரங்களை பதிவிடுங்கள்.",
  },
  "how.step2.title": { en: "NGOs Get Notified", ta: "தொண்டு நிறுவனங்களுக்கு அறிவிப்பு" },
  "how.step2.desc": {
    en: "Registered NGOs see available food on the map and receive instant alerts for nearby listings.",
    ta: "பதிவு செய்யப்பட்ட தொண்டு நிறுவனங்கள் வரைபடத்தில் கிடைக்கும் உணவைப் பார்க்கலாம்.",
  },
  "how.step3.title": { en: "Claim & Pick Up", ta: "கோரி எடுத்துக்கொள்ளுங்கள்" },
  "how.step3.desc": {
    en: "NGOs claim the food and pick it up within the given time. Waste reduced, lives fed!",
    ta: "தொண்டு நிறுவனங்கள் உணவைக் கோரி குறிப்பிட்ட நேரத்தில் எடுக்கலாம். வீணாவது குறையும், பசி தீரும்!",
  },

  // Landing - CTA
  "cta.title": { en: "Join the Movement", ta: "இயக்கத்தில் இணையுங்கள்" },
  "cta.desc": {
    en: "Whether you're a restaurant owner or an NGO, your contribution makes a difference. Register today and help us build a hunger-free Chennai.",
    ta: "நீங்கள் உணவக உரிமையாளரோ அல்லது தொண்டு நிறுவனமோ, உங்கள் பங்களிப்பு முக்கியம். இன்றே பதிவு செய்யுங்கள்.",
  },
  "cta.register": { en: "Register Now", ta: "இப்போது பதிவு செய்யுங்கள்" },

  // Landing - Footer
  "footer.tagline": { en: "Food Waste Management Platform", ta: "உணவு கழிவு மேலாண்மை தளம்" },
  "footer.developed": { en: "Developed by", ta: "உருவாக்கியவர்கள்" },

  // Map
  "map.title": { en: "Food Map — Chennai", ta: "உணவு வரைபடம் — சென்னை" },
  "map.subtitle": { en: "Locate restaurants and NGOs in real time", ta: "உணவகங்கள் மற்றும் தொண்டு நிறுவனங்களை கண்டறியுங்கள்" },
  "map.restaurants": { en: "Restaurants", ta: "உணவகங்கள்" },
  "map.ngos": { en: "NGOs", ta: "தொண்டு நிறுவனங்கள்" },
  "map.restaurant": { en: "🍽️ Restaurant", ta: "🍽️ உணவகம்" },
  "map.ngo": { en: "❤️ NGO", ta: "❤️ தொண்டு நிறுவனம்" },

  // Contact
  "contact.title": { en: "Contact Us", ta: "எங்களை தொடர்பு கொள்ளுங்கள்" },
  "contact.subtitle": { en: "Have questions? We'd love to hear from you.", ta: "கேள்விகள் உள்ளதா? உங்களிடமிருந்து கேட்க விரும்புகிறோம்." },
  "contact.sendMessage": { en: "Send a Message", ta: "செய்தி அனுப்பு" },
  "contact.name": { en: "Name", ta: "பெயர்" },
  "contact.email": { en: "Email", ta: "மின்னஞ்சல்" },
  "contact.message": { en: "Message", ta: "செய்தி" },
  "contact.namePlaceholder": { en: "Your name", ta: "உங்கள் பெயர்" },
  "contact.emailPlaceholder": { en: "your@email.com", ta: "உங்கள்@மின்னஞ்சல்.com" },
  "contact.messagePlaceholder": { en: "How can we help?", ta: "நாங்கள் எப்படி உதவ முடியும்?" },
  "contact.send": { en: "Send Message", ta: "செய்தி அனுப்பு" },
  "contact.emailLabel": { en: "Email", ta: "மின்னஞ்சல்" },
  "contact.addressLabel": { en: "Address", ta: "முகவரி" },

  // Login
  "login.welcomeBack": { en: "Welcome Back", ta: "மீண்டும் வருக" },
  "login.joinFeast": { en: "Join Feast Bridge", ta: "Feast Bridge-ல் இணையுங்கள்" },
  "login.signInDesc": { en: "Sign in to continue your mission", ta: "உங்கள் பணியைத் தொடர உள்நுழையுங்கள்" },
  "login.registerDesc": { en: "Register to start reducing food waste", ta: "உணவு வீணாவதை குறைக்க பதிவு செய்யுங்கள்" },
  "login.restaurant": { en: "Restaurant", ta: "உணவகம்" },
  "login.ngoAdmin": { en: "NGO Admin", ta: "தொண்டு நிறுவன நிர்வாகி" },
  "login.restaurantName": { en: "Restaurant Name", ta: "உணவகத்தின் பெயர்" },
  "login.orgName": { en: "Organization Name", ta: "நிறுவனத்தின் பெயர்" },
  "login.email": { en: "Email", ta: "மின்னஞ்சல்" },
  "login.password": { en: "Password", ta: "கடவுச்சொல்" },
  "login.emailPlaceholder": { en: "Enter your email", ta: "மின்னஞ்சலை உள்ளிடுங்கள்" },
  "login.passwordPlaceholder": { en: "Enter your password", ta: "கடவுச்சொல்லை உள்ளிடுங்கள்" },
  "login.signIn": { en: "Sign In", ta: "உள்நுழை" },
  "login.createAccount": { en: "Create Account", ta: "கணக்கை உருவாக்கு" },
  "login.pleaseWait": { en: "Please wait...", ta: "காத்திருக்கவும்..." },
  "login.noAccount": { en: "Don't have an account?", ta: "கணக்கு இல்லையா?" },
  "login.haveAccount": { en: "Already have an account?", ta: "ஏற்கனவே கணக்கு உள்ளதா?" },
  "login.registerHere": { en: "Register here", ta: "இங்கே பதிவு செய்யுங்கள்" },
  "login.loginHere": { en: "Login here", ta: "இங்கே உள்நுழையுங்கள்" },
  "login.restaurantPlaceholder": { en: "e.g. Chennai Grand Kitchen", ta: "எ.கா. சென்னை கிராண்ட் கிச்சன்" },
  "login.ngoPlaceholder": { en: "e.g. Feed Chennai Foundation", ta: "எ.கா. ஃபீட் சென்னை அறக்கட்டளை" },
} as const;

type TranslationKey = keyof typeof translations;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => translations[key]?.en || key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: TranslationKey) => translations[key]?.[lang] || translations[key]?.en || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
