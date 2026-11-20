/**
 * Reviews shared by students.
 *
 * The site is a static export, so there is no server of our own. When a
 * Firebase project is configured (see `firestore.rules` and `.env.example`)
 * reviews live in Firestore and every visitor sees the same list. Without it
 * the page falls back to a browser-only preview so the flow stays testable.
 */

import { firebaseConfigured, getDb } from "./firebase";

export type Review = {
  id: string;
  name: string;
  university: string;
  body: string;
  createdAt: string;
  /** True for the example reviews shown in browser-only preview mode. */
  demo?: boolean;
};

export type UniversityCount = {
  university: string;
  count: number;
  /** 0–1 share of all reviews. */
  share: number;
};

export const REVIEW_LIMITS = {
  name: 60,
  university: 80,
  bodyMin: 20,
  bodyMax: 1000,
} as const;

export const REVIEWS_STORAGE_KEY = "lektra.reviews.v1";

/** Firestore collection that holds the reviews. */
const REVIEWS_COLLECTION = "reviews";

/** Newest reviews loaded per page view; the chart only needs a recent window. */
const REVIEWS_LIMIT = 500;

/** Whether reviews are stored in a shared database rather than this browser. */
export const reviewsAreShared = firebaseConfigured;

/** Suggestions for the university field. Free text is still allowed. */
export const UNIVERSITIES = [
  "Ain Shams University",
  "Alexandria University",
  "American University in Cairo (AUC)",
  "Assiut University",
  "Aswan University",
  "Banha University",
  "Beni-Suef University",
  "British University in Egypt (BUE)",
  "Cairo University",
  "Damietta University",
  "Egyptian Russian University",
  "Fayoum University",
  "Future University in Egypt",
  "Galala University",
  "German University in Cairo (GUC)",
  "Helwan University",
  "Kafrelsheikh University",
  "Mansoura University",
  "Menoufia University",
  "Minia University",
  "Misr International University (MIU)",
  "Modern Sciences and Arts University (MSA)",
  "Nile University",
  "October 6 University",
  "Port Said University",
  "Sohag University",
  "South Valley University",
  "Suez Canal University",
  "Tanta University",
  "Zagazig University",
] as const;

/**
 * Example reviews for preview mode only. They are tagged and labelled in the
 * UI, and disappear as soon as a real database is configured.
 */
const EXAMPLE_REVIEWS: Review[] = [
  {
    id: "example-1",
    name: "Mariam H.",
    university: "Cairo University",
    body: "I stopped keeping my week in three places. Timetable, quizzes and deadlines finally sit together, and the scan handled my faculty's messy printed timetable on the first try.",
    createdAt: "2026-11-16T10:20:00.000Z",
    demo: true,
  },
  {
    id: "example-2",
    name: "Yousef A.",
    university: "Ain Shams University",
    body: "Voice entry is the feature I did not know I needed. I add a lab in the hallway in five seconds and it is already on the right day.",
    createdAt: "2026-11-14T17:05:00.000Z",
    demo: true,
  },
  {
    id: "example-3",
    name: "Nour E.",
    university: "Alexandria University",
    body: "It works on the metro with no signal, which is the whole point. No account, no ads, nothing asking me to upgrade.",
    createdAt: "2026-11-12T08:40:00.000Z",
    demo: true,
  },
  {
    id: "example-4",
    name: "Omar S.",
    university: "Mansoura University",
    body: "The month view is the first calendar that does not make my semester look like a wall of noise. Sections and labs use different colours and I can actually read it.",
    createdAt: "2026-11-10T19:15:00.000Z",
    demo: true,
  },
  {
    id: "example-5",
    name: "Salma K.",
    university: "German University in Cairo (GUC)",
    body: "I exported my backup before changing phones and had my whole semester back in under a minute.",
    createdAt: "2026-11-08T12:30:00.000Z",
    demo: true,
  },
  {
    id: "example-6",
    name: "Ahmed T.",
    university: "Assiut University",
    body: "Offline, small, and fast. I open it, see the week, close it. That is all I wanted.",
    createdAt: "2026-11-06T06:55:00.000Z",
    demo: true,
  },
  {
    id: "example-7",
    name: "Habiba M.",
    university: "Helwan University",
    body: "The reminders are quiet by default, which sounds small until you use an app that pings you about everything.",
    createdAt: "2026-11-04T15:10:00.000Z",
    demo: true,
  },
  {
    id: "example-8",
    name: "Karim N.",
    university: "Cairo University",
    body: "Scanning my timetable took one photo. Reviewing the result was the part I appreciated — it let me fix the room numbers before saving.",
    createdAt: "2026-11-02T09:25:00.000Z",
    demo: true,
  },
  {
    id: "example-9",
    name: "Farida R.",
    university: "Ain Shams University",
    body: "I like that there is no feed or social layer. It is a planner, not another app to maintain.",
    createdAt: "2026-10-31T20:00:00.000Z",
    demo: true,
  },
];

type ReviewDocument = {
  name: string;
  university: string;
  body: string;
  createdAt?: { toDate(): Date } | null;
};

function fromDocument(id: string, data: ReviewDocument): Review {
  const createdAt = data.createdAt?.toDate?.();
  return {
    id,
    name: data.name,
    university: data.university,
    body: data.body,
    createdAt: (createdAt ?? new Date()).toISOString(),
  };
}

function isReview(value: unknown): value is Review {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.university === "string" &&
    typeof item.body === "string" &&
    typeof item.createdAt === "string"
  );
}

function readLocal(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isReview).map((review) => ({ ...review, demo: false }));
  } catch {
    return [];
  }
}

function writeLocal(reviews: Review[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // Private mode or a full quota: the review still shows for this session.
  }
}

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `review-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Turn an SDK error into something a student can read. */
function readableError(error: unknown) {
  const code =
    error && typeof error === "object" && "code" in error
      ? String((error as { code: unknown }).code)
      : "";

  if (code === "permission-denied") {
    return "Reviews are closed for new entries right now. Please try again later.";
  }
  if (code === "unavailable" || code === "deadline-exceeded") {
    return "We could not reach the review database. Check your connection and try again.";
  }
  if (code === "resource-exhausted") {
    return "The review database is busy. Please try again in a moment.";
  }

  return "Something went wrong while saving your review. Please try again.";
}

/** Trim and normalise what the form collected. Throws with a readable message. */
export function normalizeReviewInput(input: {
  name: string;
  university: string;
  body: string;
}) {
  const name = input.name.replace(/\s+/g, " ").trim();
  const university = input.university.replace(/\s+/g, " ").trim();
  const body = input.body.replace(/\r\n/g, "\n").trim();

  if (name.length < 2) {
    throw new Error("Please add your name.");
  }
  if (name.length > REVIEW_LIMITS.name) {
    throw new Error("That name is a little too long.");
  }
  if (university.length < 2) {
    throw new Error("Please add your university.");
  }
  if (university.length > REVIEW_LIMITS.university) {
    throw new Error("That university name is a little too long.");
  }
  if (body.length < REVIEW_LIMITS.bodyMin) {
    throw new Error(
      `Write at least ${REVIEW_LIMITS.bodyMin} characters so the review is useful.`,
    );
  }
  if (body.length > REVIEW_LIMITS.bodyMax) {
    throw new Error(
      `Keep it under ${REVIEW_LIMITS.bodyMax.toLocaleString("en-GB")} characters.`,
    );
  }

  return { name, university, body };
}

/** Load every review, newest first. */
export async function loadReviews(): Promise<Review[]> {
  if (!reviewsAreShared) {
    return [...readLocal()]
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .concat(EXAMPLE_REVIEWS);
  }

  const [{ collection, getDocs, limit, orderBy, query }, db] =
    await Promise.all([import("firebase/firestore"), getDb()]);

  try {
    const snapshot = await getDocs(
      query(
        collection(db, REVIEWS_COLLECTION),
        orderBy("createdAt", "desc"),
        limit(REVIEWS_LIMIT),
      ),
    );

    return snapshot.docs.map((doc) =>
      fromDocument(doc.id, doc.data() as ReviewDocument),
    );
  } catch (error) {
    throw new Error(readableError(error));
  }
}

/**
 * Watch the review list so a review written by one visitor appears for
 * everyone else without a refresh. Returns an unsubscribe function.
 *
 * In preview mode it loads once, matching the browser-only storage.
 */
export function subscribeReviews(
  onReviews: (reviews: Review[]) => void,
  onError: (error: Error) => void,
): () => void {
  if (!reviewsAreShared) {
    let active = true;
    void loadReviews().then(
      (reviews) => {
        if (active) onReviews(reviews);
      },
      (error: unknown) => {
        if (active) {
          onError(error instanceof Error ? error : new Error("Load failed."));
        }
      },
    );
    return () => {
      active = false;
    };
  }

  let active = true;
  let unsubscribe = () => {};

  void Promise.all([import("firebase/firestore"), getDb()])
    .then(([{ collection, limit, onSnapshot, orderBy, query }, db]) => {
      if (!active) return;

      unsubscribe = onSnapshot(
        query(
          collection(db, REVIEWS_COLLECTION),
          orderBy("createdAt", "desc"),
          limit(REVIEWS_LIMIT),
        ),
        (snapshot) => {
          onReviews(
            snapshot.docs.map((doc) =>
              fromDocument(doc.id, doc.data() as ReviewDocument),
            ),
          );
        },
        (error) => onError(new Error(readableError(error))),
      );
    })
    .catch((error: unknown) => {
      onError(
        error instanceof Error
          ? error
          : new Error("Reviews could not be loaded."),
      );
    });

  return () => {
    active = false;
    unsubscribe();
  };
}

/** Store a review and return it exactly as it will appear in the list. */
export async function submitReview(input: {
  name: string;
  university: string;
  body: string;
}): Promise<Review> {
  const clean = normalizeReviewInput(input);

  if (!reviewsAreShared) {
    const review: Review = {
      id: newId(),
      ...clean,
      createdAt: new Date().toISOString(),
    };
    writeLocal([review, ...readLocal().filter((item) => item.id !== review.id)]);
    return review;
  }

  const [
    { addDoc, collection, doc, getDoc, serverTimestamp },
    db,
  ] = await Promise.all([import("firebase/firestore"), getDb()]);

  try {
    const reference = await addDoc(collection(db, REVIEWS_COLLECTION), {
      ...clean,
      createdAt: serverTimestamp(),
    });

    // Read the document back so the card shows the server's timestamp rather
    // than the visitor's clock.
    const saved = await getDoc(doc(db, REVIEWS_COLLECTION, reference.id));
    if (!saved.exists()) {
      return { id: reference.id, ...clean, createdAt: new Date().toISOString() };
    }

    return fromDocument(saved.id, saved.data() as ReviewDocument);
  } catch (error) {
    throw new Error(readableError(error));
  }
}

/** Count reviews per university, biggest share first. */
export function universityStats(reviews: Review[]): UniversityCount[] {
  const counts = new Map<string, number>();

  for (const review of reviews) {
    counts.set(review.university, (counts.get(review.university) ?? 0) + 1);
  }

  const total = reviews.length || 1;

  return Array.from(counts, ([university, count]) => ({
    university,
    count,
    share: count / total,
  })).sort(
    (a, b) => b.count - a.count || a.university.localeCompare(b.university),
  );
}

/** The chart shows this many universities before grouping the rest. */
export const CHART_LIMIT = 10;

/** Bucket used for every university outside the chart's top list. */
export const OTHER_UNIVERSITIES = "Other universities";

/**
 * The universities shown in the chart: the busiest `limit` entries, plus one
 * combined bucket for everything else. `topNames` is what the reviews list
 * uses to filter that bucket.
 */
export function chartSeries(reviews: Review[], limit = CHART_LIMIT) {
  const stats = universityStats(reviews);
  const top = stats.slice(0, limit);
  const rest = stats.slice(limit);
  const otherCount = rest.reduce((sum, row) => sum + row.count, 0);

  const other: UniversityCount | null =
    rest.length > 0
      ? {
          university: OTHER_UNIVERSITIES,
          count: otherCount,
          share: reviews.length ? otherCount / reviews.length : 0,
        }
      : null;

  return {
    top,
    rest,
    other,
    topNames: new Set(top.map((row) => row.university)),
  };
}

/** A short, locale-stable date for a review card. */
export function formatReviewDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const day = date.getUTCDate();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][date.getUTCMonth()];
  return `${month} ${day}, ${date.getUTCFullYear()}`;
}
