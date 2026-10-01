// Beta member quotes for the home page notes wall (components/home/NotesSection).
//
// This repo is public. Add a note here ONLY after the person gave written
// permission to quote them publicly under the exact name shown: either the
// survey testimonial opt-in (beta_survey_responses.testimonial_consent +
// testimonial_name_preference) or an email reply saying yes. Record where the
// permission came from in `consent`.
//
// Quotes are the person's own words. Only trim with an ellipsis or fix an
// obvious typo; never reword.

export type BetaNote = {
  id: string;
  quote: string;
  /** Exactly as they agreed to be credited (first name, or first name + last initial). */
  name: string;
  /** Where and when permission was given. */
  consent: string;
};

export const BETA_NOTES: BetaNote[] = [
  {
    id: "critney",
    quote:
      "I've found a way to start and end my day with scripture. It only takes a few minutes but it helps me grow in my faith… Zoe helps me to remember and apply scripture to my life.",
    name: "Critney",
    consent: "Beta survey testimonial opt-in, first name, 2026-08-01",
  },
  {
    id: "laura",
    quote:
      "Zoe is a great way to consolidate your thoughts and be able to express them to God coherently… not a substitute for a relationship with God, just helping you to aim in the right direction.",
    name: "Laura",
    consent: "Beta survey testimonial opt-in, first name, 2026-08-01",
  },
  {
    id: "laurie",
    quote:
      "There have been days where I was down and low and behold a scripture was sent and it was just what I needed to hear!",
    name: "Laurie C.",
    consent: "Email yes to a homepage-quote ask signed \"Laurie C.\", 2026-09-30",
  },
  {
    id: "colleen",
    quote: "These lessons and the check ins during afternoon and evening really do so much for me!!",
    name: "Colleen C.",
    consent: "Email yes to a homepage-quote ask signed \"Colleen C.\", 2026-09-30",
  },
  {
    id: "lisse",
    quote:
      "Zoe is making a difference in staying connected with Jesus throughout my day, and I notice a difference in the way I interact with others as well as my thoughts.",
    name: "Lisse",
    consent: "Email yes, 2026-09-30: \"Totally fine with you sharing. Please use Lisse as my name.\"",
  },
  {
    id: "nina",
    quote: "I'm finding the devotionals easy to read and process after a rough night with the little one lol",
    name: "Nina P.",
    consent: "Email yes, 2026-09-30, to an ask offering \"Karina P.\" or \"Nina P.\" (she goes by Nina)",
  },
  {
    id: "kimberly",
    quote: "I like that it remembers me.",
    name: "Kimberly B.",
    consent: "Email yes, 2026-10-01, to a homepage-quote ask signed \"Kimberly B.\"",
  },
];

/** Below this many notes the section stays hidden. */
export const MIN_PUBLIC_NOTES = 3;
