import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, MotionConfig } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Check, Mic, Square, ArrowLeft, BriefcaseBusiness, Smile, X, LockKeyhole, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import collage from '@/assets/venn-collage.png';
import vennLogo from '@/assets/venn-logo.png';
import portrait from '@/assets/portrait.png.asset.json';
import astronaut from '@/assets/astronaut.png.asset.json';
import poppy from '@/assets/poppy.png.asset.json';
import moonFace from '@/assets/moon-face.png.asset.json';
import lips from '@/assets/lips.png.asset.json';
import tealLeaf from '@/assets/teal-leaf.png.asset.json';
import dahlia from '@/assets/dahlia.png.asset.json';
import feather from '@/assets/feather.png.asset.json';
import botanical from '@/assets/pink-botanical.png.asset.json';
import sageLeaf from '@/assets/sage-leaf.png.asset.json';
import cloud from '@/assets/lavender-cloud.png.asset.json';
import copperMoon from '@/assets/copper-moon.png.asset.json';
import pinkPaper from '@/assets/pink-paper.png.asset.json';
import telephone from '@/assets/cutout-telephone.png';
import butterfly from '@/assets/cutout-butterfly.png';
import saturnHand from '@/assets/cutout-saturn-hand.png';
import earthGreen from '@/assets/earth-watercolor-green.png';
import earthYellow from '@/assets/earth-watercolor-yellow.png';

export const Route = createFileRoute('/')({
 head: () => ({ meta: [
  { title: 'Venn — Find your overlap' },
  { name: 'description', content: 'Find students you click with, for work or for life. Three questions, your own words, a little common ground.' },
  { property: 'og:title', content: 'Venn — Find your overlap' },
  { property: 'og:description', content: 'Student connections beyond the usual labels. Find your people, in your own words.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
 ] }), component: Venn,
});

const prompts = [
 "What's something you've changed your mind about?",
 'What are you working on right now, and what part of it is annoying you?',
 'What could you talk about for an hour with zero preparation?',
];
type Person = { id: number; name: string; descriptor: string; work: number; personal: number; color: string; whyWork: string; whyPersonal: string; answers: string[]; highlights: string[] };
const people: Person[] = [
 { id: 1, name: 'Arjun Mehta', descriptor: 'Computer science · 3rd year · serial side-project starter', work: 97, personal: 32, color: '', whyWork: 'You both care about making useful things, not just finishing the assignment.', whyPersonal: 'You share a soft spot for the wonderfully overcomplicated.', answers: [
  'I used to think the best programmer was whoever wrote the cleverest code. Then I had to fix my own project six months later. Now I think boring, readable code is a form of kindness. Still recovering from my one-liner phase.',
  "Building a tool that finds empty study rooms on campus. The annoying part isn't the code—it's that every building publishes its schedule in a different format. I want to make something people actually use, not another abandoned GitHub repo.",
  'Mechanical keyboards. Specifically why a $12 switch can sound better than a $90 one. I have a spreadsheet. You did ask.',
 ], highlights: ['boring, readable code is a form of kindness', 'make something people actually use', 'I have a spreadsheet'] },
 { id: 2, name: 'Cleo Rivera', descriptor: 'Film studies · 2nd year · enthusiastic overthinker', work: 29, personal: 98, color: 'avatar-coral', whyWork: 'You both like finding a fresh angle on a familiar problem.', whyPersonal: 'Same offbeat humor. Same ability to turn a small tangent into a whole evening.', answers: [
  'That being cringe is bad. Being sincerely excited about something is actually kind of brave? I spent a whole year pretending not to like musicals. What a waste of a perfectly good year.',
  "A five-minute documentary about the guy who repairs bikes outside the library. He has incredible stories but freezes every time the camera is on. So mostly we're drinking tea and not filming. Honestly not mad about it.",
  "Which fictional characters would survive working one shift at a busy café. Darcy: absolutely not. Shrek: employee of the month. I will defend this with my life.",
 ], highlights: ['being sincerely excited', 'drinking tea and not filming', 'Shrek: employee of the month'] },
 { id: 3, name: 'Maya Chen', descriptor: 'Design · 3rd year · makes things, then makes them again', work: 90, personal: 76, color: 'avatar-yellow', whyWork: 'A shared love of the messy middle: making, testing, and starting again.', whyPersonal: 'You both find the interesting stuff in the tiny, everyday details.', answers: [
  "I thought asking for feedback meant you didn't trust your own taste. Turns out showing someone an unfinished thing is much harder, and much more useful, than showing off a finished one.",
  "I'm redesigning the campus food pantry signage. My first version was beautiful and completely confusing. Trying to make it useful before making it pretty this time. The printer and I are also in a long-running argument.",
  'The little design decisions that make cities feel welcoming. Benches! Hand-painted signs! Why one street feels like a hug and the next feels like a parking ticket.',
 ], highlights: ['showing someone an unfinished thing', 'make it useful before making it pretty', 'little design decisions'] },
 { id: 4, name: 'Theo Brooks', descriptor: 'Mathematics · 2nd year · quietly competitive', work: 85, personal: 48, color: 'avatar-ink', whyWork: 'You both enjoy untangling a hard problem with someone who sticks with it.', whyPersonal: 'You appreciate a dry joke and a very committed niche interest.', answers: [
  'Group work. Still not a fan of group grades, to be clear. But working through a proof with someone who sees it differently is genuinely better than staring at a wall alone.',
  "Trying to prove a result for a graph theory reading course. There's one step that everyone calls 'obvious.' It is not obvious. It has eaten my Tuesday, Wednesday, and most of Thursday.",
  'Chess endgames. Less glamorous than openings, but all the interesting mistakes happen when you think the game is over.',
 ], highlights: ['working through a proof with someone', "It is not obvious", 'all the interesting mistakes'] },
 { id: 5, name: 'Imani Okafor', descriptor: 'Sociology · 4th year · good questions, better playlists', work: 73, personal: 89, color: '', whyWork: 'You both ask who a project is actually helping, before getting lost in the details.', whyPersonal: 'You share a curious streak and strong opinions held with a sense of humor.', answers: [
  "That changing your mind means you lost an argument. My little brother said 'isn't learning the whole point?' and I had no comeback. Rude of him to be right at fourteen.",
  "My dissertation is about who uses campus third spaces and who doesn't feel welcome in them. Interview transcription is slowly turning me into a person who hates her own voice. The conversations themselves are the good part.",
  'How a good playlist tells a story. Track three is a responsibility. You cannot put your emotional climax at track three and then act like nothing happened.',
 ], highlights: ["isn't learning the whole point", "who doesn't feel welcome", 'Track three is a responsibility'] },
 { id: 6, name: 'Leo Park', descriptor: 'Engineering · 3rd year · fixes things with too much tape', work: 94, personal: 56, color: 'avatar-yellow', whyWork: 'Hands-on problem solvers. You both prefer trying it to talking about trying it.', whyPersonal: 'A shared appreciation for small adventures and stories that get out of hand.', answers: [
  "I used to think I needed a complete plan before starting anything. Building a truly terrible first version teaches me more than another week of planning. My desk is evidence of this philosophy.",
  "Solar-powered sensor for the community garden. It works beautifully indoors, which is not where gardens are. Waterproofing is apparently its own entire discipline. Would love someone to bounce ideas off.",
  'All the things that went wrong on my last camping trip. There was a raccoon, a missing tent pole, and a very optimistic weather app.',
 ], highlights: ['a truly terrible first version', 'bounce ideas off', 'a very optimistic weather app'] },
 { id: 7, name: 'Sofia Alvarez', descriptor: 'Literature · 2nd year · always has a book to lend', work: 51, personal: 94, color: 'avatar-coral', whyWork: 'You both notice the human story hiding inside the assignment.', whyPersonal: 'You both love a deep conversation that starts with something wonderfully unserious.', answers: [
  "Rereading books. I thought life was too short. Then I reread a book I loved at sixteen and realized the book hadn't changed, but I'd become a completely different reader. It's like visiting an old friend.",
  "An essay on unreliable narrators. The annoying thing is that I've started noticing how unreliable I am when I tell stories about my own life. Very inconvenient research side effect.",
  "People's marginal notes in secondhand books. Someone wrote 'girl, leave him' in my copy of Jane Eyre and I think about that stranger constantly.",
 ], highlights: ['a completely different reader', 'stories about my own life', "girl, leave him"] },
 { id: 8, name: 'Noah Williams', descriptor: 'Biology · 1st year · birdwatcher, accidental comedian', work: 65, personal: 83, color: 'avatar-ink', whyWork: 'Patient observation and genuine curiosity are your common ground.', whyPersonal: 'You both get a lot of joy out of things other people walk right past.', answers: [
  'That you have to be loud to be interesting. My roommate barely talks at parties, but once she gets comfortable she is the funniest person I know. Trying to give people more time now.',
  "Keeping the plants in our lab alive. They're allegedly a hardy species. Mine haven't read that part of the textbook. Logging light and watering schedules to figure out what's happening.",
  'Birds on campus. The crows recognize the security guard and follow him because he gives them peanuts. There is an entire political system happening above our heads.',
 ], highlights: ['give people more time', 'figure out what\'s happening', 'an entire political system'] },
];
function compatibility(person: Person, value: number) { return person.work * (1 - value / 100) + person.personal * value / 100; }
function HighlightedAnswer({ text, phrase }: { text: string; phrase: string }) {
 const index = text.toLocaleLowerCase().indexOf(phrase.toLocaleLowerCase());
 if (index < 0) return <>{text}</>;
 return <>{text.slice(0, index)}<mark>{text.slice(index, index + phrase.length)}</mark>{text.slice(index + phrase.length)}</>;
}
const artworks = { portrait: portrait.url, astronaut: astronaut.url, poppy: poppy.url, moon: moonFace.url, lips: lips.url, leaf: tealLeaf.url, dahlia: dahlia.url, feather: feather.url, botanical: botanical.url, sage: sageLeaf.url, cloud: cloud.url, copperMoon: copperMoon.url, paper: pinkPaper.url, telephone, butterfly, saturn: saturnHand };
type Cut = [x: number, y: number, size: number, artwork: keyof typeof artworks, depth: number, rot: number];
const introSections: { line: ReactNode; tone: string; cuts: Cut[] }[] = [
 { line: <>Most apps sort you by <em>major.</em></>, tone: 'warm', cuts: [
  [13,18,210,'portrait',1.2,-12],[36,12,105,'copperMoon',0.6,8],[86,18,220,'astronaut',0.9,8],[66,14,140,'butterfly',1.5,14],
  [8,60,155,'poppy',0.8,-12],[93,58,170,'lips',1.1,-8],[16,87,185,'telephone',0.7,-8],[38,91,100,'paper',1.4,-18],
  [67,88,180,'saturn',1,15],[88,88,145,'dahlia',1.3,12] ] },
 { line: <>Venn listens to <em>how you write</em> about yourself.</>, tone: 'cool', cuts: [
  [13,18,190,'moon',0.9,-6],[85,18,190,'dahlia',1.2,12],[94,66,165,'leaf',0.7,12],[7,68,150,'botanical',1,-20],
  [22,87,180,'butterfly',0.8,8],[57,90,175,'feather',1.3,-12],[82,87,165,'lips',0.6,-10],[48,13,125,'paper',1.1,15] ] },
 { line: <>Three questions. <em>Your own words.</em></>, tone: 'calm', cuts: [
  [13,23,160,'cloud',0.5,-5],[87,26,145,'sage',0.6,-24],[12,80,145,'botanical',0.45,-12],[85,81,170,'feather',0.5,12],
  [50,90,110,'butterfly',0.4,0],[50,13,90,'copperMoon',0.4,10] ] },
];
function Intro() {
 const root = useRef<HTMLDivElement>(null);
 const [visible, setVisible] = useState(true);
 useEffect(() => {
  const el = root.current; if (!el) return;
  const io = new IntersectionObserver(([entry]) => { if (entry) setVisible(entry.isIntersecting && entry.intersectionRatio > 0.15); }, { threshold: [0, 0.15, 0.5] });
  io.observe(el);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => io.disconnect();
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
   const items = [...el.querySelectorAll<HTMLElement>('[data-cut]')].flatMap(node => node.parentElement ? [{ node, section: node.parentElement, x: Number(node.dataset['x'] ?? 0), y: Number(node.dataset['y'] ?? 0), depth: Number(node.dataset['depth'] ?? 0), rot: Number(node.dataset['rot'] ?? 0), p: 0, mx: 0, my: 0, first: true, dx: 0, dy: 0, dragging: false, sx: 0, sy: 0 }] : []);
   const pointer = { x: -9999, y: -9999 };
   let raf = 0;
   const tick = () => {
    raf = 0; let moving = false; const vh = window.innerHeight; const rects = new Map<HTMLElement, DOMRect>();
    for (const item of items) {
     let r = rects.get(item.section); if (!r) { r = item.section.getBoundingClientRect(); rects.set(item.section, r); }
     const tp = Math.max(-1.5, Math.min(1.5, (r.top + r.height / 2 - vh / 2) / vh));
     let tx = 0, ty = 0;
     if (finePointer && !item.dragging) { const cx = r.left + r.width * item.x / 100, cy = r.top + r.height * item.y / 100; const dx = pointer.x - cx, dy = pointer.y - cy; const w = Math.max(0, 1 - Math.hypot(dx, dy) / 420); tx = Math.max(-1, Math.min(1, dx / 200)) * 7 * w * item.depth; ty = Math.max(-1, Math.min(1, dy / 200)) * 7 * w * item.depth; }
     const k = item.first ? 1 : 0.12; item.first = false;
     item.p += (tp - item.p) * k; item.mx += (tx - item.mx) * k; item.my += (ty - item.my) * k;
     if (Math.abs(tp - item.p) > 0.0004 || Math.abs(tx - item.mx) > 0.02 || Math.abs(ty - item.my) > 0.02) moving = true;
     if (!item.dragging && (item.dx || item.dy)) {
      item.dx *= 0.985; item.dy *= 0.985;
      if (Math.hypot(item.dx, item.dy) < 0.3) { item.dx = 0; item.dy = 0; } else moving = true;
     }
     const opacity = item.dragging || item.dx || item.dy ? 1 : Math.max(0, Math.min(1, 1.3 - Math.abs(item.p) * 1.5));
     item.node.style.transform = `translate3d(${(item.mx + item.dx).toFixed(2)}px, ${(item.p * -item.depth * 200 + item.my + item.dy).toFixed(2)}px, 0) rotate(${(item.rot + item.p * item.depth * 16 + item.mx * 0.3 + item.dx * 0.02).toFixed(2)}deg)`;
     item.node.style.opacity = opacity.toFixed(3);
     item.node.style.zIndex = item.dragging || item.dx || item.dy ? '5' : '';
    }
    if (moving) raf = requestAnimationFrame(tick);
   };
   const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
   const onPointer = (event: PointerEvent) => { if (event.pointerType !== 'mouse') return; pointer.x = event.clientX; pointer.y = event.clientY; kick(); };
   let active: (typeof items)[number] | null = null;
   const onDown = (event: PointerEvent) => {
    const node = (event.target as HTMLElement).closest<HTMLElement>('[data-cut]');
    const item = items.find(it => it.node === node); if (!item) return;
    event.preventDefault(); active = item; item.dragging = true;
    item.sx = event.clientX - item.dx; item.sy = event.clientY - item.dy;
    try { item.node.setPointerCapture(event.pointerId); } catch { /* a pointer the browser no longer tracks simply isn't captured. */ }
    item.node.dataset['dragging'] = 'true'; kick();
   };
   const onMove = (event: PointerEvent) => { if (!active) return; active.dx = event.clientX - active.sx; active.dy = event.clientY - active.sy; kick(); };
   const onUp = () => { if (!active) return; active.dragging = false; delete active.node.dataset['dragging']; active = null; kick(); };
   el.addEventListener('pointerdown', onDown); el.addEventListener('pointermove', onMove); el.addEventListener('pointerup', onUp); el.addEventListener('pointercancel', onUp);
   window.addEventListener('scroll', kick, { passive: true }); window.addEventListener('resize', kick);
   if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });
   kick();
   return () => { io.disconnect(); cancelAnimationFrame(raf); el.removeEventListener('pointerdown', onDown); el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerup', onUp); el.removeEventListener('pointercancel', onUp); window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick); window.removeEventListener('pointermove', onPointer); };
 }, []);
 return <div ref={root} className="intro-stack">
  {introSections.map((section, i) => <section key={i} className={`intro-section tone-${section.tone}`}>
   {section.cuts.map(([x, y, size, artwork, depth, rot], j) => <span key={j} aria-hidden="true" data-cut="" data-x={x} data-y={y} data-depth={depth} data-rot={rot} className="cutout artwork-cutout" style={{ left: `${x}%`, top: `${y}%`, '--s': size, transform: `rotate(${rot}deg)` } as CSSProperties}><img src={artworks[artwork]} alt="" width={768} height={768} loading={i === 0 ? 'eager' : 'lazy'} draggable={false}/></span>)}
   <p className="intro-line">{section.line}</p>
  </section>)}
  {visible && <a href="#questionnaire" className="skip-intro" onClick={event => { event.preventDefault(); document.getElementById('questionnaire')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>Skip intro <ArrowRight className="size-3"/></a>}
 </div>;
}
function EarthDivider({ index }: { index: number }) {
 const root = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const el = root.current;
  if (!el) return;
  const orbiters = [...el.querySelectorAll<HTMLElement>('.earth-orbiter')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0, progress: number | undefined;
  const tick = () => {
   raf = 0;
   const rect = el.getBoundingClientRect();
   const target = (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight;
   progress = progress === undefined || reduced.matches ? target : progress + (target - progress) * 0.14;
   if (Math.abs(target - progress) < 0.0001) progress = target;
   const settledProgress = progress;
   const angle = reduced.matches ? Math.PI / 2 + 0.14 : settledProgress * Math.PI * 2 + index * 1.4;
   const radius = Math.max(0, rect.width / 2 - 36);
   orbiters.forEach((orbiter, i) => {
    const phase = angle + i * (Math.PI - 0.28);
    const depth = Math.sin(phase);
    orbiter.style.transform = `translate3d(${(Math.cos(phase) * radius).toFixed(2)}px, ${(depth * 15).toFixed(2)}px, 0)`;
    orbiter.style.zIndex = depth >= 0 ? '3' : '1';
    const image = orbiter.querySelector('img');
    if (image) image.style.transform = `rotate(${(reduced.matches ? i * 25 - 12 : settledProgress * (i === 0 ? 300 : -260) + i * 25 - 12).toFixed(2)}deg)`;
   });
   if (!reduced.matches && progress !== target) raf = requestAnimationFrame(tick);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick);
  reduced.addEventListener('change', kick);
  kick();
  return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick); reduced.removeEventListener('change', kick); };
 }, [index]);
 return <div ref={root} className={`earth-divider earth-divider-${index}`} aria-hidden="true">
  <svg className="earth-orbit-doodle" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
   <ellipse cx="50" cy="50" rx="50" ry="15" vectorEffect="non-scaling-stroke"/>
  </svg>
  {[earthGreen, earthYellow].map((src, i) => <span key={src} className={`earth-orbiter earth-orbiter-${i}`}><img src={src} alt="" width={768} height={768} loading="lazy" draggable={false}/></span>)}
 </div>;
}
function PromptCutout({ index }: { index: number }) {
 const ref = useRef<HTMLSpanElement>(null);
 const [open, setOpen] = useState(index === 0);
 useEffect(() => {
  if (index === 0 || !ref.current) return;
  const io = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { setOpen(true); io.disconnect(); } }, { threshold: 1, rootMargin: '0px 0px -15% 0px' });
  io.observe(ref.current); return () => io.disconnect();
 }, [index]);
 return <span ref={ref} aria-hidden="true" className="prompt-cutout" data-open={open}><img src={[artworks.poppy, artworks.butterfly, artworks.sage][index]} alt="" width={768} height={768} loading="lazy" draggable={false}/></span>;
}
const activities = ['Parties & nights out', 'Study sessions', 'Jogging', 'Climbing', 'Career fairs', 'Research & academic expos'];
const activityLevels = ['Not really', 'A little curious', 'Could be fun', 'Count me in'];
const activityYeses = ["i'm down for it", 'so down!', 'totally!', 'like, absolutely', 'yes a hundred times', 'in a heartbeat'];
function useCrayonSound() {
 const audio = useRef<{ context: AudioContext; source: AudioBufferSourceNode; gain: GainNode } | null>(null);
 const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const stop = () => {
  if (timer.current !== null) clearTimeout(timer.current);
  timer.current = null;
  const current = audio.current;
  if (current) current.gain.gain.setTargetAtTime(0, current.context.currentTime, .015);
 };
 const start = () => {
  try {
   if (!audio.current) {
    const context = new AudioContext();
    const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const samples = buffer.getChannelData(0);
    let previous = 0;
    for (let i = 0; i < samples.length; i++) {
     previous = (previous + (Math.random() * 2 - 1) * .12) / 1.12;
     samples[i] = previous * 3;
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = context.createBiquadFilter();
    filter.type = 'bandpass'; filter.frequency.value = 1600; filter.Q.value = .65;
    const gain = context.createGain(); gain.gain.value = 0;
    source.connect(filter); filter.connect(gain); gain.connect(context.destination);
    source.start();
    audio.current = { context, source, gain };
   }
   void audio.current.context.resume().catch(() => {});
  } catch { /* Audio is optional on browsers without Web Audio support. */ }
 };
 const draw = () => {
  const current = audio.current;
  if (!current) return;
  if (timer.current !== null) clearTimeout(timer.current);
  current.gain.gain.setTargetAtTime(.12, current.context.currentTime, .012);
  timer.current = setTimeout(stop, 65);
 };
 useEffect(() => () => {
  if (timer.current !== null) clearTimeout(timer.current);
  const current = audio.current;
  if (current) { current.source.stop(); void current.context.close(); }
 }, []);
 return { start, draw, stop };
}
function ActivityScale({ name, index, value, onChange }: { name: string; index: number; value: number | null; onChange: (value: number | null) => void }) {
 const [preview, setPreview] = useState<number | null>(null);
 const previewRef = useRef<number | null>(null);
 const dragging = useRef(false);
 const lastX = useRef<number | null>(null);
 const sound = useCrayonSound();
 const level = preview ?? value ?? 0;
 const yes = activityYeses[index] ?? "i'm down for it";
 const levels = [...activityLevels, yes];
 const vineId = `activity-vine-${index}`;
 const showPreview = (next: number | null) => { previewRef.current = next; setPreview(next); };
 const levelAt = (clientX: number, node: HTMLElement) => { const rect = node.getBoundingClientRect(); return Math.max(0, Math.min(4, (clientX - rect.left) / rect.width * 4)); };
 const commit = () => { dragging.current = false; sound.stop(); const chosen = previewRef.current; showPreview(null); if (chosen !== null) onChange(Math.max(0, Math.min(4, Math.round(chosen)))); };
 return <div className={`activity-row activity-tone-${index % 3}`}>
  <div className="activity-title"><label id={`activity-${index}`}>{name}</label><span>{value === null ? '—' : levels[value]}</span></div>
  <div className="activity-wave" data-chosen={value !== null || preview !== null} data-tracking={preview !== null} style={{ '--level': level / 4 } as CSSProperties} onPointerDown={event => {
   if (event.pointerType === 'mouse' && event.button !== 0) return;
   try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* a pointer the browser no longer tracks simply isn't captured. */ }
   dragging.current = true; lastX.current = event.clientX; sound.start();
   showPreview(levelAt(event.clientX, event.currentTarget));
  }} onPointerMove={event => {
   if (dragging.current) {
    if (lastX.current !== event.clientX) sound.draw();
    lastX.current = event.clientX;
    showPreview(levelAt(event.clientX, event.currentTarget));
    return;
   }
   if (event.pointerType !== 'mouse' || event.buttons) return;
   showPreview(levelAt(event.clientX, event.currentTarget));
  }} onPointerUp={commit} onPointerCancel={commit} onPointerLeave={() => { if (!dragging.current) showPreview(null); sound.stop(); }}>
   <svg aria-hidden="true" className="activity-vines" viewBox="0 0 400 64" preserveAspectRatio="none" fill="none">
    <defs>
     <g id={vineId}><path d="M0 32 C25 5 50 59 75 32 S125 5 150 32 S200 59 225 32 S275 5 300 32 S350 59 375 32 L400 32"/><path d="M0 32 C25 56 50 8 75 32 S125 56 150 32 S200 8 225 32 S275 56 300 32 S350 8 375 32 L400 32"/><path d="M38 32 Q42 17 32 12 M112 32 Q115 47 127 51 M188 32 Q190 17 203 13 M262 32 Q268 48 277 51 M337 32 Q343 18 353 13"/></g>
    </defs>
    <use href={`#${vineId}`} className="activity-vine-base"/>
    <g className="activity-vine-light">
     <use href={`#${vineId}`} className="activity-crayon-depth" transform="translate(0 1.5)"/>
     <use href={`#${vineId}`} className="activity-crayon-pigment"/>
     <use href={`#${vineId}`} className="activity-crayon-highlight" transform="translate(0 -.8)"/>
    </g>
   </svg>
   <div className="activity-stops" aria-hidden="true">{levels.map((label, stop) => <span key={label} data-lit={(value !== null || preview !== null) && stop <= level}/>)}</div>
   <Slider className="activity-slider" min={0} max={4} step={.01} value={[level]} thumbProps={{ 'aria-labelledby': `activity-${index}`, 'aria-valuetext': preview !== null ? levels[Math.round(level)] : value === null ? 'Not chosen' : levels[value] }} onValueChange={values => { const next = values[0]; if (next === undefined || !Number.isFinite(next)) return; if (dragging.current) { showPreview(next); return; } showPreview(null); const current = Math.round((value ?? 0) * 100); const moved = Math.round(next * 100); if (moved === current) return; onChange(moved > current ? Math.min(4, (value ?? 0) + 1) : Math.max(0, (value ?? 0) - 1)); }} onValueCommit={values => { const next = values[0]; if (next === undefined || !Number.isFinite(next)) return; showPreview(null); const rounded = Math.max(0, Math.min(4, Math.round(next))); if (rounded !== value) onChange(rounded); sound.stop(); }}/>
  </div>
  <div className="activity-endpoints"><span>Not really</span><span>{yes}</span></div>
  {value !== null && <Button variant="link" type="button" className="activity-clear" onClick={() => { showPreview(null); onChange(null); }} aria-label={`Clear ${name}`}>Clear</Button>}
 </div>;
}
function Venn() {
 const [screen, setScreen] = useState<'onboarding' | 'matches'>('onboarding');
 const [answers, setAnswers] = useState(['', '', '']);
 const [recording, setRecording] = useState<number | null>(null);
 const [blend, setBlend] = useState(50);
 const [sent, setSent] = useState<number[]>([]);
 const [selected, setSelected] = useState<Person | null>(null);
 const [activityPreferences, setActivityPreferences] = useState<(number | null)[]>(activities.map(() => null));
 const ranked = useMemo(() => [...people].sort((a, b) => compatibility(b, blend) - compatibility(a, blend) || a.id - b.id), [blend]);
 const complete = answers.every(answer => answer.trim().length > 0);
 function toggleRequest(id: number) { setSent(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]); }
 function showMatches() { setRecording(null); setScreen('matches'); window.scrollTo({ top: 0 }); }
 return <MotionConfig reducedMotion="user"><div className="venn-app">
  <header className="site-header"><div className="brand" aria-label="Venn"><img className="logo-mark" src={vennLogo} alt="" width={816} height={816} aria-hidden="true"/><span className="brand-word">venn</span></div><span className="header-note">A little common ground.</span></header>
  <main className={`main-content ${screen === 'onboarding' ? 'onboarding' : ''}`}>
   {screen === 'onboarding' ? <>
    <Intro/>
    <div id="questionnaire" className="questionnaire">
    <div className="step-strip"><span className="current"><b className="step-number">1</b> Your words</span><i className="step-divider"/><span><b className="step-number">2</b> Your people</span></div>
    <div className="intro"><p className="questionnaire-kicker">Not another introduction</p><h1 className="page-heading">A little more <em>you.</em><br/>A little less small talk.</h1><p className="intro-copy">Skip the labels. Tell us what’s on your mind. <br/>The interesting connections start between the lines.</p></div>
    <form onSubmit={event => { event.preventDefault(); if (complete) showMatches(); }}>
     {prompts.map((prompt, index) => <div className={`prompt-block prompt-accent-${index}`} key={prompt}>
      {index > 0 && <EarthDivider index={index}/>}
      <div className="prompt-label"><span className="prompt-number">0{index + 1}</span><label htmlFor={`answer-${index}`}>{prompt}</label><PromptCutout index={index}/></div>
      <div className="answer-wrap"><Textarea id={`answer-${index}`} className="answer-box" placeholder={['I used to think…', 'Lately, I’ve been…', 'Don’t get me started on…'][index]} value={answers[index]} onChange={event => setAnswers(previous => previous.map((answer, i) => i === index ? event.target.value : answer))} aria-describedby={`helper-${index}`} required/><Button variant="microphone" type="button" aria-label={recording === index ? `Stop recording for question ${index + 1}` : `Record answer for question ${index + 1}`} aria-pressed={recording === index} title="Decorative microphone — no audio is captured" onClick={() => setRecording(recording === index ? null : index)}>{recording === index ? <Square className="size-3"/> : <Mic className="size-3.5"/>}</Button></div>
      <div className="helper-row"><span id={`helper-${index}`}>a couple of sentences is plenty.</span>{recording === index && <span role="status">Recording… (demo only)</span>}</div>
     </div>)}
     <section className="activity-section" aria-labelledby="activities-heading">
      <div className="activity-section-heading"><h2 id="activities-heading">What are you <em>up for?</em></h2><span>Optional</span></div>
      <div className="activity-grid">{activities.map((name, index) => <ActivityScale key={name} name={name} index={index} value={activityPreferences[index] ?? null} onChange={value => setActivityPreferences(previous => previous.map((item, i) => i === index ? value : item))}/>)}</div>
     </section>
     <div className="form-footer"><span className="small-note"><LockKeyhole className="size-3"/> Your words, not your résumé.</span><Button variant="venn" type="submit" disabled={!complete}>Find my people <ArrowRight/></Button></div>
    </form>
     <div className="mt-5 text-right"><Button variant="link" className="h-auto p-0 text-xs text-muted-foreground" onClick={showMatches}>Explore the demo matches <ArrowRight className="size-3"/></Button></div>
     </div>
   </> : <>
    <div className="step-strip"><Button variant="ghost" className="h-auto p-0 text-xs" onClick={() => setScreen('onboarding')}><ArrowLeft className="size-3"/> Your words</Button><i className="step-divider"/><span className="current"><b className="step-number">2</b> Your people</span></div>
    <div className="matches-intro relative"><div><div className="eyebrow">Good things overlap</div><h1 className="page-heading">Find your <em>people.</em></h1><p className="intro-copy">Different stories. A little something in common.</p></div><img className="collage" src={collage} alt="" width={1024} height={1024}/></div>
    <section className="slider-panel" aria-label="Connection preferences"><div className="slider-heading"><strong>What kind of connection?</strong><span className="blend-label">{100 - blend}% work · {blend}% personal</span></div><div className="slider-axis"><span className="axis-label"><BriefcaseBusiness className="size-4"/>Work</span><Slider className="connection-slider" min={0} max={100} step={1} value={[blend]} onValueChange={values => setBlend(values[0] ?? 50)} aria-label="Work to Personal connection"/><span className="axis-label axis-personal">Personal<Smile className="size-4"/></span></div><div className="slider-caption"><span>Study partners. Co-conspirators.</span><span>Same wavelength. Different majors.</span></div></section>
    <div className="results-heading"><strong>8 people in your orbit</strong><span>{blend < 50 ? 'A little more work-minded' : blend > 50 ? 'A little more personal' : 'A bit of both'}</span></div>
    <div className="match-list">{ranked.map(person => <motion.article layout="position" transition={{ type: 'spring', stiffness: 380, damping: 34 }} key={person.id} className="match-card" tabIndex={0} role="button" aria-label={`View ${person.name}'s answers`} onClick={() => setSelected(person)} onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(person); } }}>
     <div className="card-top"><span className={`avatar ${person.color}`}>{person.name.split(' ').map(part => part[0]).join('')}</span><div className="min-w-0"><h2 className="card-name">{person.name}</h2><div className="card-descriptor">{person.descriptor}</div></div><span className="score">{Math.round(compatibility(person, blend))}<small>%</small></span></div>
     <div className="why-label">The common thread</div><p className="why-copy">{blend <= 50 ? person.whyWork : person.whyPersonal}</p><div className="card-bottom"><span className="component-scores">Work {person.work} / Personal {person.personal}</span><Button variant="connect" data-sent={sent.includes(person.id)} aria-pressed={sent.includes(person.id)} aria-label={`${sent.includes(person.id) ? 'Cancel request to' : 'Connect with'} ${person.name}`} onClick={event => { event.stopPropagation(); toggleRequest(person.id); }}>{sent.includes(person.id) ? <Check className="size-3"/> : <Plus className="size-3"/>}{sent.includes(person.id) ? 'Request sent' : 'Connect'}</Button></div>
    </motion.article>)}</div>
   </>}
  </main>
  <footer className="page-footer"><span>Venn · A student connection experiment</span><span className="footer-script">People, not categories.</span></footer>
  <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><Dialog.Portal><Dialog.Overlay className="detail-overlay"/><Dialog.Content className="detail-panel"><Dialog.Close asChild><Button variant="ghost" size="icon" className="detail-close" aria-label="Close match details"><X/></Button></Dialog.Close>{selected && <>
   <div className="eyebrow">In their own words</div><Dialog.Title className="detail-title">{selected.name}</Dialog.Title><Dialog.Description className="card-descriptor">{selected.descriptor}</Dialog.Description>
   <div className="detail-scores"><span className="score">{Math.round(compatibility(selected, blend))}<small>% overlap</small></span><span className="component-scores">Work {selected.work} / Personal {selected.personal}</span></div>
   {selected.answers.map((answer, index) => <section key={index} className="detail-answer"><div className="prompt-number">0{index + 1}</div><h3 className="detail-question">{prompts[index]}</h3><p><HighlightedAnswer text={answer} phrase={selected.highlights[index] ?? ''}/></p></section>)}
   <Button className="w-full" variant="venn" aria-pressed={sent.includes(selected.id)} onClick={() => toggleRequest(selected.id)}>{sent.includes(selected.id) ? <><Check/>Request sent</> : <>Connect with {selected.name.split(' ')[0]}<ArrowRight/></>}</Button>
  </>}</Dialog.Content></Dialog.Portal></Dialog.Root>
 </div></MotionConfig>;
}
