import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { getConnectionRequests } from '../api/venn';
import vennLogo from '@/assets/venn-logo.png';

export const Route = createFileRoute('/connections')({
 head: () => ({ meta: [{ title: 'Venn — Connection requests' }, { name: 'description', content: 'The connection requests made on Venn.' }] }),
 loader: async () => await getConnectionRequests(),
 component: Connections,
});

function initials(name: string) {
 return name.split(' ').map(part => part[0]).join('');
}

function formatWhen(value: string) {
 // SQLite stores "YYYY-MM-DD HH:MM:SS" in UTC; render it in the viewer's locale.
 const date = new Date(value.replace(' ', 'T') + 'Z');
 if (Number.isNaN(date.getTime())) return value;
 return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function Connections() {
 const requests = Route.useLoaderData();
 return <div className="venn-app">
  <header className="site-header"><div className="brand" aria-label="Venn"><img className="logo-mark" src={vennLogo} alt="" width={816} height={816} aria-hidden="true"/><span className="brand-word">venn</span></div><span className="header-note">A little common ground.</span></header>
  <main className="main-content">
   <div className="step-strip"><Link to="/" className="inline-flex items-center gap-1 text-xs"><ArrowLeft className="size-3"/> Back to Venn</Link><i className="step-divider"/><span className="current">Connection requests</span></div>
   <div className="matches-intro"><div><div className="eyebrow">Who reached out</div><h1 className="page-heading">Connection <em>requests.</em></h1><p className="intro-copy">{requests.length === 0 ? 'No requests yet — send one from the matches screen.' : `${requests.length} request${requests.length === 1 ? '' : 's'} so far.`}</p></div></div>
   {requests.length > 0 && <div className="results-heading"><strong>{requests.length} in the log</strong><span>Newest first</span></div>}
   <div className="match-list">{requests.map(request => <article key={request.id} className="match-card">
    <div className="card-top"><span className="avatar">{initials(request.personName)}</span><div className="min-w-0"><h2 className="card-name">{request.personName}</h2><div className="card-descriptor">{request.personDescriptor}</div></div></div>
    <div className="card-bottom"><span className="component-scores">{request.submissionId === null ? 'From a demo visitor' : `From submission #${request.submissionId}`}</span><span className="text-xs text-muted-foreground">{formatWhen(request.createdAt)}</span></div>
   </article>)}</div>
  </main>
  <footer className="page-footer"><span>Venn · A student connection experiment</span><span className="footer-script">People, not categories.</span></footer>
 </div>;
}
