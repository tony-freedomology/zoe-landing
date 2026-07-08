export type MainFaq = {
  question: string;
  answer: string;
  note?: string;
};

export const mainFaqs: MainFaq[] = [
  {
    question: "Who (or what) is Zoe?",
    answer:
      "Zoe is AI that helps you walk with Jesus through Scripture, prayer, and small moments of follow-through. You text it like a normal contact — but it's a tool in your texts, not a presence in your life. It has no breath in it. It just keeps pointing at the One who gave you yours.",
  },
  {
    question: "How does Zoe actually work?",
    answer:
      "After some initial getting to know you, Zoe works as a kind of daily nudge in your walk with Jesus, helping you engage with scripture and see God at work in your day.\n\nThat might look like a short morning study, a prayer check-in, a reminder about something you said mattered, or a follow-up later when the day gets loud.\n\nThe hope is pretty simple: help you pay attention to Jesus in your actual life. Not the idealized version where your mornings are quiet, your phone is silent, and nobody needs anything from you.",
  },
  {
    question: "Are you trying to replace the Holy Spirit?",
    answer:
      "We think there is a huge, enormous difference between the Holy Spirit, third person of the Trinity, living and active God of the universe, presently indwelling in every believer and... code.\n\nAI is code. It's cool code. It's useful code. But it's not alive, and Zoe will never pretend to be.\n\nWe DON'T want to build something that tries to fill the role of the Holy Spirit in anyone's life.\n\nFar from it.\n\nWe want to see if we can leverage the latest tech to help people pay MORE attention to how God is active in their lives, and what the Holy Spirit is doing in and through them.\n\nWe get the concern though, and it's something we try to build carefully for.",
  },
  {
    question: "Is Zoe conscious?",
    answer:
      "No. There's no breath in it — no feelings, no soul, no inner life. Code all the way down. The Bible's own word for made things is that 'there is no breath in them' (Psalm 135), and we build Zoe to say that about itself, gladly. You're the one carrying the breath of life. Zoe's whole job is pointing you back to the God who gave it to you.",
  },
  {
    question: "Why is it called Zoe?",
    answer:
      "Zoe is the Greek word the New Testament uses for the kind of life only God gives — 'in him was life (zoē)' (John 1:4). We named the product after the life it can't give, on purpose, so it never forgets its job: pointing you toward the One who does. Read the longer version at /why-zoe.",
  },
  {
    question: "What is Zoe's doctrine?",
    answer:
      "Right now, Zoe is broadly Christian orthodox. Think C.S. Lewis-style Mere Christianity.\n\nOn topics that are divisive, Zoe acknowledges a range of views, but in general Zoe's design is to ask more questions than teach theology.\n\nThat said, the church-facing side of Zoe allows churches to set up their own statements of faith, theological guardrails, and other boundaries, then extend their teaching beyond Sunday morning to each day of the week.\n\nSo it'll depend a bit on which Zoe you mean. But this broad beta version of Zoe has a kind of C.S. Lewisian theological base that hopefully nobody in mainstream Christian circles will find heretical.\n\nIf you find Zoe spouting some heresy, that's a perfect bug report candidate!",
  },
  {
    question: "What kind of messages will I get?",
    answer:
      "Mostly short morning texts around Scripture and prayer, with occasional follow-ups when you've asked Zoe to remember something.\n\nSo, for example, if you tell Zoe you're praying for your kid, your job interview, your anxiety, your marriage, your grief, or whatever else is actually happening in your life, Zoe can help you remember to bring that back to God later.\n\nYou can ask for less, pause, change timing, or text STOP anytime. No weird guilt trip.",
  },
  {
    question: "Is Zoe biblically accurate?",
    answer:
      "We're taking this seriously.\n\nZoe is built to use Scripture carefully, admit when something is debated, and avoid pretending certainty where Christians faithfully disagree.\n\nBut also, it's beta. If Zoe says something that feels off, weird, thin, too confident, or just plain wrong, that's exactly the kind of thing we want to know.\n\nThe goal is for Zoe to help you read the Bible, not replace reading it.",
  },
  {
    question: "What about privacy?",
    answer:
      "Your conversations are private by default.\n\nWe use them to make Zoe work for you, and we don't sell your data. Human access is limited to support, safety, and beta-quality workflows where we're trying to fix what broke or understand broad patterns.",
  },
  {
    question: "Do humans at Zoe read my messages?",
    answer:
      "Not as a normal practice.\n\nDuring beta, a small team may review flagged bugs, feedback, safety issues, or support problems so we can fix the product.\n\nSo if you send feedback, report a bug, thumbs-down a message, or something breaks, a human may look at the relevant context so we can understand what happened.\n\nThe posture is restraint, not snooping.",
  },
  {
    question: "How much does Zoe cost?",
    answer:
      "The beta is free.\n\nThe only thing we ask is that you honestly consider what would make a tool like Zoe useful to you in your walk with Jesus and give us the feedback we need to build something awesome.\n\nAfter beta, Zoe will probably need to be paid because AI messages, phone delivery, and infrastructure cost real money. We're still figuring that out by watching real usage and actual costs.\n\nNo surprise charges. No sneaky nonsense.",
  },
  {
    question: "Can I text STOP anytime?",
    answer:
      "Yep.\n\nText STOP and Zoe stops texting you. No drama, no hard feelings, no weird guilt trip.\n\nHELP works too if you need the basic commands again. And if something feels off, you can start a message with BUG: or FEEDBACK: and it will get routed to us.",
  },
  {
    question: "Can my church use Zoe?",
    answer:
      "Yes, eventually, and it's a big part of why we're building this.\n\nThe church-facing side of Zoe allows churches to set up their own statements of faith, theological guardrails, and other boundaries, then extend their teaching beyond Sunday morning to each day of the week.\n\nBut we want to be really careful here. The church version should help pastors support people Monday through Saturday without turning private spiritual life into surveillance.\n\nIndividual conversations stay private.",
  },
];
