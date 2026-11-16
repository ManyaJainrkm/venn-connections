-- Venn Connections: one-shot database setup for Turso.
-- Paste this whole file into your Turso database's SQL console and run it.
-- It creates every table the app needs and loads the 8 starter people.
-- Safe to run on a brand-new, empty database.

PRAGMA foreign_keys = ON;

-- ===== Tables =====
CREATE TABLE `connection_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submission_id` integer,
	`person_id` integer NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`submission_id`) REFERENCES `submissions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE TABLE `people` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`descriptor` text NOT NULL,
	`work` integer NOT NULL,
	`personal` integer NOT NULL,
	`color` text DEFAULT '' NOT NULL,
	`why_work` text NOT NULL,
	`why_personal` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
CREATE TABLE `person_answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`person_id` integer NOT NULL,
	`prompt_index` integer NOT NULL,
	`body` text NOT NULL,
	`highlight` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE TABLE `submission_answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submission_id` integer NOT NULL,
	`prompt_index` integer NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`submission_id`) REFERENCES `submissions`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE TABLE `submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`blend` integer DEFAULT 50 NOT NULL,
	`activity_preferences` text DEFAULT '[]' NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);

-- ===== Starter data: the 8 people =====
INSERT INTO people VALUES(1,'Arjun Mehta','Computer science · 3rd year · serial side-project starter',97,32,'','You both care about making useful things, not just finishing the assignment.','You share a soft spot for the wonderfully overcomplicated.','2026-10-28 01:26:05');
INSERT INTO people VALUES(2,'Cleo Rivera','Film studies · 2nd year · enthusiastic overthinker',29,98,'avatar-coral','You both like finding a fresh angle on a familiar problem.','Same offbeat humor. Same ability to turn a small tangent into a whole evening.','2026-10-28 01:26:05');
INSERT INTO people VALUES(3,'Maya Chen','Design · 3rd year · makes things, then makes them again',90,76,'avatar-yellow','A shared love of the messy middle: making, testing, and starting again.','You both find the interesting stuff in the tiny, everyday details.','2026-10-28 01:26:05');
INSERT INTO people VALUES(4,'Theo Brooks','Mathematics · 2nd year · quietly competitive',85,48,'avatar-ink','You both enjoy untangling a hard problem with someone who sticks with it.','You appreciate a dry joke and a very committed niche interest.','2026-10-28 01:26:05');
INSERT INTO people VALUES(5,'Imani Okafor','Sociology · 4th year · good questions, better playlists',73,89,'','You both ask who a project is actually helping, before getting lost in the details.','You share a curious streak and strong opinions held with a sense of humor.','2026-10-28 01:26:05');
INSERT INTO people VALUES(6,'Leo Park','Engineering · 3rd year · fixes things with too much tape',94,56,'avatar-yellow','Hands-on problem solvers. You both prefer trying it to talking about trying it.','A shared appreciation for small adventures and stories that get out of hand.','2026-10-28 01:26:05');
INSERT INTO people VALUES(7,'Sofia Alvarez','Literature · 2nd year · always has a book to lend',51,94,'avatar-coral','You both notice the human story hiding inside the assignment.','You both love a deep conversation that starts with something wonderfully unserious.','2026-10-28 01:26:05');
INSERT INTO people VALUES(8,'Noah Williams','Biology · 1st year · birdwatcher, accidental comedian',65,83,'avatar-ink','Patient observation and genuine curiosity are your common ground.','You both get a lot of joy out of things other people walk right past.','2026-10-28 01:26:05');

-- ===== Their answers (3 per person) =====
INSERT INTO person_answers VALUES(1,1,0,'I used to think the best programmer was whoever wrote the cleverest code. Then I had to fix my own project six months later. Now I think boring, readable code is a form of kindness. Still recovering from my one-liner phase.','boring, readable code is a form of kindness');
INSERT INTO person_answers VALUES(2,1,1,'Building a tool that finds empty study rooms on campus. The annoying part isn''t the code—it''s that every building publishes its schedule in a different format. I want to make something people actually use, not another abandoned GitHub repo.','make something people actually use');
INSERT INTO person_answers VALUES(3,1,2,'Mechanical keyboards. Specifically why a $12 switch can sound better than a $90 one. I have a spreadsheet. You did ask.','I have a spreadsheet');
INSERT INTO person_answers VALUES(4,2,0,'That being cringe is bad. Being sincerely excited about something is actually kind of brave? I spent a whole year pretending not to like musicals. What a waste of a perfectly good year.','being sincerely excited');
INSERT INTO person_answers VALUES(5,2,1,'A five-minute documentary about the guy who repairs bikes outside the library. He has incredible stories but freezes every time the camera is on. So mostly we''re drinking tea and not filming. Honestly not mad about it.','drinking tea and not filming');
INSERT INTO person_answers VALUES(6,2,2,'Which fictional characters would survive working one shift at a busy café. Darcy: absolutely not. Shrek: employee of the month. I will defend this with my life.','Shrek: employee of the month');
INSERT INTO person_answers VALUES(7,3,0,'I thought asking for feedback meant you didn''t trust your own taste. Turns out showing someone an unfinished thing is much harder, and much more useful, than showing off a finished one.','showing someone an unfinished thing');
INSERT INTO person_answers VALUES(8,3,1,'I''m redesigning the campus food pantry signage. My first version was beautiful and completely confusing. Trying to make it useful before making it pretty this time. The printer and I are also in a long-running argument.','make it useful before making it pretty');
INSERT INTO person_answers VALUES(9,3,2,'The little design decisions that make cities feel welcoming. Benches! Hand-painted signs! Why one street feels like a hug and the next feels like a parking ticket.','little design decisions');
INSERT INTO person_answers VALUES(10,4,0,'Group work. Still not a fan of group grades, to be clear. But working through a proof with someone who sees it differently is genuinely better than staring at a wall alone.','working through a proof with someone');
INSERT INTO person_answers VALUES(11,4,1,'Trying to prove a result for a graph theory reading course. There''s one step that everyone calls ''obvious.'' It is not obvious. It has eaten my Tuesday, Wednesday, and most of Thursday.','It is not obvious');
INSERT INTO person_answers VALUES(12,4,2,'Chess endgames. Less glamorous than openings, but all the interesting mistakes happen when you think the game is over.','all the interesting mistakes');
INSERT INTO person_answers VALUES(13,5,0,'That changing your mind means you lost an argument. My little brother said ''isn''t learning the whole point?'' and I had no comeback. Rude of him to be right at fourteen.','isn''t learning the whole point');
INSERT INTO person_answers VALUES(14,5,1,'My dissertation is about who uses campus third spaces and who doesn''t feel welcome in them. Interview transcription is slowly turning me into a person who hates her own voice. The conversations themselves are the good part.','who doesn''t feel welcome');
INSERT INTO person_answers VALUES(15,5,2,'How a good playlist tells a story. Track three is a responsibility. You cannot put your emotional climax at track three and then act like nothing happened.','Track three is a responsibility');
INSERT INTO person_answers VALUES(16,6,0,'I used to think I needed a complete plan before starting anything. Building a truly terrible first version teaches me more than another week of planning. My desk is evidence of this philosophy.','a truly terrible first version');
INSERT INTO person_answers VALUES(17,6,1,'Solar-powered sensor for the community garden. It works beautifully indoors, which is not where gardens are. Waterproofing is apparently its own entire discipline. Would love someone to bounce ideas off.','bounce ideas off');
INSERT INTO person_answers VALUES(18,6,2,'All the things that went wrong on my last camping trip. There was a raccoon, a missing tent pole, and a very optimistic weather app.','a very optimistic weather app');
INSERT INTO person_answers VALUES(19,7,0,'Rereading books. I thought life was too short. Then I reread a book I loved at sixteen and realized the book hadn''t changed, but I''d become a completely different reader. It''s like visiting an old friend.','a completely different reader');
INSERT INTO person_answers VALUES(20,7,1,'An essay on unreliable narrators. The annoying thing is that I''ve started noticing how unreliable I am when I tell stories about my own life. Very inconvenient research side effect.','stories about my own life');
INSERT INTO person_answers VALUES(21,7,2,'People''s marginal notes in secondhand books. Someone wrote ''girl, leave him'' in my copy of Jane Eyre and I think about that stranger constantly.','girl, leave him');
INSERT INTO person_answers VALUES(22,8,0,'That you have to be loud to be interesting. My roommate barely talks at parties, but once she gets comfortable she is the funniest person I know. Trying to give people more time now.','give people more time');
INSERT INTO person_answers VALUES(23,8,1,'Keeping the plants in our lab alive. They''re allegedly a hardy species. Mine haven''t read that part of the textbook. Logging light and watering schedules to figure out what''s happening.','figure out what''s happening');
INSERT INTO person_answers VALUES(24,8,2,'Birds on campus. The crows recognize the security guard and follow him because he gives them peanuts. There is an entire political system happening above our heads.','an entire political system');
