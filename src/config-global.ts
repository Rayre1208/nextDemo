import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------
export const RANDOMTUTOR_API = 'https://randomuser.me';
export const RANDOMTUTOR_API_Vercel = 'https://express-server-beige.vercel.app'; //要用Protection Bypass for Automation

export const RANDOMTUTOR_API_MacMini = 'https://torian.pages.dev';
//https://express-server-beige.vercel.app
//https://express-server-beige.vercel.app/?vercelToolbarCode=kvq6Hoqj9_4T7Vq
//export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
//https://api-dev-minimal-v510.vercel.app
export const HOST_API = 'https://api-dev-minimal-v620.pages.dev';
export const TORIAN_API = 'https://api-dev-v620.torian.site';
export const MAC_MINI_API = 'https://api-dev-minimal-v620.pages.dev';
//export const ASSETS_API = process.env.NEXT_PUBLIC_HOST_API;
//https://api-dev-minimal-v510.vercel.app
export const ASSETS_API = 'https://api-dev-minimal-v610.vercel.app/';

export const FIREBASE_API = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUnpREMENT_ID,
};

export const AMPLIFY_API = {
  userPoolId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_ID,
  userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID,
  region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION,
};

export const AUTH0_API = {
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  callbackUrl: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL,
};

export const SUPABASE_API = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

export const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'

// ROOT PATH AFTER PRESS DEMO
export const PATH_AFTER_DEMO = paths.dashboard.root; // as '/introduction';
export const PATH_AFTER_INTRO = paths.introduction.root;
