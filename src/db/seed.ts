import { db } from "./client";
import { people, personAnswers } from "./schema";

type SeedPerson = {
  name: string;
  descriptor: string;
  work: number;
  personal: number;
  color: string;
  whyWork: string;
  whyPersonal: string;
  answers: string[];
  highlights: string[];
};

const seedPeople: SeedPerson[] = [
  {
    name: "Arjun Mehta",
    descriptor: "Computer science · 3rd year · serial side-project starter",
    work: 97,
    personal: 32,
    color: "",
    whyWork: "You both care about making useful things, not just finishing the assignment.",
    whyPersonal: "You share a soft spot for the wonderfully overcomplicated.",
    answers: [
      "I used to think the best programmer was whoever wrote the cleverest code. Then I had to fix my own project six months later. Now I think boring, readable code is a form of kindness. Still recovering from my one-liner phase.",
      "Building a tool that finds empty study rooms on campus. The annoying part isn't the code—it's that every building publishes its schedule in a different format. I want to make something people actually use, not another abandoned GitHub repo.",
      "Mechanical keyboards. Specifically why a $12 switch can sound better than a $90 one. I have a spreadsheet. You did ask.",
    ],
    highlights: [
      "boring, readable code is a form of kindness",
      "make something people actually use",
      "I have a spreadsheet",
    ],
  },
  {
    name: "Cleo Rivera",
    descriptor: "Film studies · 2nd year · enthusiastic overthinker",
    work: 29,
    personal: 98,
    color: "avatar-coral",
    whyWork: "You both like finding a fresh angle on a familiar problem.",
    whyPersonal: "Same offbeat humor. Same ability to turn a small tangent into a whole evening.",
    answers: [
      "That being cringe is bad. Being sincerely excited about something is actually kind of brave? I spent a whole year pretending not to like musicals. What a waste of a perfectly good year.",
      "A five-minute documentary about the guy who repairs bikes outside the library. He has incredible stories but freezes every time the camera is on. So mostly we're drinking tea and not filming. Honestly not mad about it.",
      "Which fictional characters would survive working one shift at a busy café. Darcy: absolutely not. Shrek: employee of the month. I will defend this with my life.",
    ],
    highlights: [
      "being sincerely excited",
      "drinking tea and not filming",
      "Shrek: employee of the month",
    ],
  },
  {
    name: "Maya Chen",
    descriptor: "Design · 3rd year · makes things, then makes them again",
    work: 90,
    personal: 76,
    color: "avatar-yellow",
    whyWork: "A shared love of the messy middle: making, testing, and starting again.",
    whyPersonal: "You both find the interesting stuff in the tiny, everyday details.",
    answers: [
      "I thought asking for feedback meant you didn't trust your own taste. Turns out showing someone an unfinished thing is much harder, and much more useful, than showing off a finished one.",
      "I'm redesigning the campus food pantry signage. My first version was beautiful and completely confusing. Trying to make it useful before making it pretty this time. The printer and I are also in a long-running argument.",
      "The little design decisions that make cities feel welcoming. Benches! Hand-painted signs! Why one street feels like a hug and the next feels like a parking ticket.",
    ],
    highlights: [
      "showing someone an unfinished thing",
      "make it useful before making it pretty",
      "little design decisions",
    ],
  },
  {
    name: "Theo Brooks",
    descriptor: "Mathematics · 2nd year · quietly competitive",
    work: 85,
    personal: 48,
    color: "avatar-ink",
    whyWork: "You both enjoy untangling a hard problem with someone who sticks with it.",
    whyPersonal: "You appreciate a dry joke and a very committed niche interest.",
    answers: [
      "Group work. Still not a fan of group grades, to be clear. But working through a proof with someone who sees it differently is genuinely better than staring at a wall alone.",
      "Trying to prove a result for a graph theory reading course. There's one step that everyone calls 'obvious.' It is not obvious. It has eaten my Tuesday, Wednesday, and most of Thursday.",
      "Chess endgames. Less glamorous than openings, but all the interesting mistakes happen when you think the game is over.",
    ],
    highlights: [
      "working through a proof with someone",
      "It is not obvious",
      "all the interesting mistakes",
    ],
  },
  {
    name: "Imani Okafor",
    descriptor: "Sociology · 4th year · good questions, better playlists",
    work: 73,
    personal: 89,
    color: "",
    whyWork: "You both ask who a project is actually helping, before getting lost in the details.",
    whyPersonal: "You share a curious streak and strong opinions held with a sense of humor.",
    answers: [
      "That changing your mind means you lost an argument. My little brother said 'isn't learning the whole point?' and I had no comeback. Rude of him to be right at fourteen.",
      "My dissertation is about who uses campus third spaces and who doesn't feel welcome in them. Interview transcription is slowly turning me into a person who hates her own voice. The conversations themselves are the good part.",
      "How a good playlist tells a story. Track three is a responsibility. You cannot put your emotional climax at track three and then act like nothing happened.",
    ],
    highlights: [
      "isn't learning the whole point",
      "who doesn't feel welcome",
      "Track three is a responsibility",
    ],
  },
  {
    name: "Leo Park",
    descriptor: "Engineering · 3rd year · fixes things with too much tape",
    work: 94,
    personal: 56,
    color: "avatar-yellow",
    whyWork: "Hands-on problem solvers. You both prefer trying it to talking about trying it.",
    whyPersonal: "A shared appreciation for small adventures and stories that get out of hand.",
    answers: [
      "I used to think I needed a complete plan before starting anything. Building a truly terrible first version teaches me more than another week of planning. My desk is evidence of this philosophy.",
      "Solar-powered sensor for the community garden. It works beautifully indoors, which is not where gardens are. Waterproofing is apparently its own entire discipline. Would love someone to bounce ideas off.",
      "All the things that went wrong on my last camping trip. There was a raccoon, a missing tent pole, and a very optimistic weather app.",
    ],
    highlights: [
      "a truly terrible first version",
      "bounce ideas off",
      "a very optimistic weather app",
    ],
  },
  {
    name: "Sofia Alvarez",
    descriptor: "Literature · 2nd year · always has a book to lend",
    work: 51,
    personal: 94,
    color: "avatar-coral",
    whyWork: "You both notice the human story hiding inside the assignment.",
    whyPersonal: "You both love a deep conversation that starts with something wonderfully unserious.",
    answers: [
      "Rereading books. I thought life was too short. Then I reread a book I loved at sixteen and realized the book hadn't changed, but I'd become a completely different reader. It's like visiting an old friend.",
      "An essay on unreliable narrators. The annoying thing is that I've started noticing how unreliable I am when I tell stories about my own life. Very inconvenient research side effect.",
      "People's marginal notes in secondhand books. Someone wrote 'girl, leave him' in my copy of Jane Eyre and I think about that stranger constantly.",
    ],
    highlights: [
      "a completely different reader",
      "stories about my own life",
      "girl, leave him",
    ],
  },
  {
    name: "Noah Williams",
    descriptor: "Biology · 1st year · birdwatcher, accidental comedian",
    work: 65,
    personal: 83,
    color: "avatar-ink",
    whyWork: "Patient observation and genuine curiosity are your common ground.",
    whyPersonal: "You both get a lot of joy out of things other people walk right past.",
    answers: [
      "That you have to be loud to be interesting. My roommate barely talks at parties, but once she gets comfortable she is the funniest person I know. Trying to give people more time now.",
      "Keeping the plants in our lab alive. They're allegedly a hardy species. Mine haven't read that part of the textbook. Logging light and watering schedules to figure out what's happening.",
      "Birds on campus. The crows recognize the security guard and follow him because he gives them peanuts. There is an entire political system happening above our heads.",
    ],
    highlights: [
      "give people more time",
      "figure out what's happening",
      "an entire political system",
    ],
  },
];

async function seed() {
  const existing = await db.select({ id: people.id }).from(people).limit(1);
  if (existing.length > 0) {
    console.log("People already seeded — skipping. (Delete .data/venn.db to reseed.)");
    return;
  }

  for (const person of seedPeople) {
    const [row] = await db
      .insert(people)
      .values({
        name: person.name,
        descriptor: person.descriptor,
        work: person.work,
        personal: person.personal,
        color: person.color,
        whyWork: person.whyWork,
        whyPersonal: person.whyPersonal,
      })
      .returning({ id: people.id });

    if (!row) throw new Error(`Failed to insert ${person.name}`);

    await db.insert(personAnswers).values(
      person.answers.map((body, promptIndex) => ({
        personId: row.id,
        promptIndex,
        body,
        highlight: person.highlights[promptIndex] ?? "",
      })),
    );
  }

  console.log(`Seeded ${seedPeople.length} people with answers.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
