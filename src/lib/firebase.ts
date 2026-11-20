/**
 * Firebase client for shared student reviews.
 *
 * The web config is public by design — Firestore security rules decide who can
 * read and write. The SDK is imported lazily so the rest of the site never
 * downloads it, and so static prerendering never touches browser APIs.
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

/** Whether a Firebase project is configured for shared reviews. */
export const firebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

type Firestore = import("firebase/firestore").Firestore;

let database: Promise<Firestore> | null = null;

/** Initialise the Firestore client once, on first use in the browser. */
export function getDb(): Promise<Firestore> {
  if (!firebaseConfigured) {
    return Promise.reject(new Error("Firebase is not configured."));
  }

  database ??= (async () => {
    const [{ getApp, getApps, initializeApp }, { getFirestore }] =
      await Promise.all([
        import("firebase/app"),
        import("firebase/firestore"),
      ]);

    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    return getFirestore(app);
  })();

  return database;
}
