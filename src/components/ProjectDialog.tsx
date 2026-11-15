import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { Project } from '../data/portfolio';

type Props = {
	project: Project;
	onClose: () => void;
};

export default function ProjectDialog({ project, onClose }: Props) {
	const dialog = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = dialog.current;
		if (!element) return;
		const focusable = element.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
		focusable.item(0)?.focus();
		document.body.classList.add('overflow-hidden');

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
			if (event.key !== 'Tab') return;
			const items = Array.from(focusable);
			if (items.length === 0) {
				event.preventDefault();
				element.focus();
				return;
			}
			const first = items[0];
			const last = items[items.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.body.classList.remove('overflow-hidden');
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [onClose]);

	return <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-night/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
		<div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="project-title" tabIndex={-1} className="relative my-auto w-full max-w-[680px] border border-line bg-canvas p-6 text-ink shadow-2xl outline-none sm:p-9">
			<button type="button" onClick={onClose} aria-label="Tutup detail proyek" className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line hover:bg-soft"><X size={17} /></button>
			<p className="font-mono text-[9px] uppercase tracking-[.15em] text-accent">{project.category} / {project.year}</p>
			<h2 id="project-title" className="mt-4 max-w-[520px] font-display text-4xl font-semibold leading-none tracking-[-.06em] sm:text-5xl">{project.title}</h2>
			<p className="mt-3 text-xs font-medium text-muted">{project.role}</p>
			<div className={`paper-grid mt-7 flex min-h-40 items-end p-5 ${project.artClass}`}><p className="font-display text-3xl font-bold tracking-[-.05em]">{project.artTitle}</p></div>
			<p className="mt-6 text-sm leading-7 text-muted">{project.detail}</p>
			<p className="mt-5 border-l-2 border-accent pl-4 text-sm font-medium leading-6">{project.impact}</p>
			<h3 className="mt-7 font-mono text-[9px] uppercase tracking-widest text-accent">Kontribusi utama</h3>
			<ul className="mt-3 grid gap-2">{project.highlights.map((highlight) => <li key={highlight} className="text-xs leading-5 text-muted">— {highlight}</li>)}</ul>
			<div className="mt-6 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-full border border-line px-3 py-1.5 font-mono text-[9px] text-muted">{item}</span>)}</div>
			<div className="mt-8 flex flex-wrap gap-3">
				{project.demoUrl && <a className="inline-flex items-center gap-2 rounded-full bg-night px-4 py-2.5 text-xs font-semibold text-paper dark:bg-accent dark:text-night" href={project.demoUrl} target="_blank" rel="noreferrer">Buka demo <ArrowUpRight size={14} /></a>}
				{project.repoUrl && <a className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-xs font-semibold hover:border-accent" href={project.repoUrl} target="_blank" rel="noreferrer">Lihat repository <ArrowUpRight size={14} /></a>}
				{!project.demoUrl && !project.repoUrl && <p className="self-center text-[10px] text-muted">Tambahkan tautan demo atau repository pada data proyek.</p>}
			</div>
		</div>
	</div>;
}
