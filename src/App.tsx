import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
	ArrowDown, ArrowDownRight, ArrowUpRight, Award, Check, ChevronDown, Github, Linkedin, Mail, Menu, Phone, X,
} from 'lucide-react';
import { portfolio, type Project, type ProjectCategory } from './data/portfolio';
import { useActiveSection } from './hooks/useActiveSection';
import { useLenis } from './hooks/useLenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import { setupAnimations } from './lib/animations';

const navigation = [
	{ label: 'About', id: 'about' },
	{ label: 'Education', id: 'education' },
	{ label: 'Skills', id: 'skills' },
	{ label: 'Projects', id: 'projects' },
	{ label: 'Experience', id: 'experience' },
	{ label: 'Contact', id: 'contact' },
];
const sectionIds = ['about', 'education', 'skills', 'projects', 'experience', 'contact'];
const projectFilters: Array<'Semua' | ProjectCategory> = ['Semua', 'Web', 'Mobile', 'Backend', 'Data'];
const skillFilters = ['Semua', 'Frontend', 'Backend', 'Mobile', 'Data / AI', 'Tools'] as const;
type SkillFilter = typeof skillFilters[number];

function App() {
	const root = useRef<HTMLDivElement>(null);
	const projectFeatureRef = useRef<HTMLDivElement>(null);
	const projectDetailRef = useRef<HTMLDivElement>(null);
	const [activeSection, setActiveSection] = useState('about');
	const [projectFilter, setProjectFilter] = useState<'Semua' | ProjectCategory>('Semua');
	const [skillFilter, setSkillFilter] = useState<SkillFilter>('Semua');
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { scrollTo } = useLenis();
	const reducedMotion = useReducedMotion();
	const observedSection = useActiveSection(sectionIds);

	useEffect(() => {
		setActiveSection(observedSection);
	}, [observedSection]);

	useEffect(() => setupAnimations(root, reducedMotion), [reducedMotion]);

	const navigateTo = useCallback((id: string) => {
		setMobileMenuOpen(false);
		scrollTo(`#${id}`);
	}, [scrollTo]);

	const visibleProjects = projectFilter === 'Semua'
		? portfolio.projects
		: portfolio.projects.filter((project) => project.category === projectFilter);
	const visibleSkills = skillFilter === 'Semua'
		? portfolio.skills
		: portfolio.skills.filter((skill) => skill.category === skillFilter);

	useEffect(() => {
		if (!visibleProjects.length) {
			setSelectedProject(null);
			return;
		}
		if (!selectedProject || !visibleProjects.some((project) => project.id === selectedProject.id)) {
			setSelectedProject(visibleProjects[0]);
		}
	}, [visibleProjects, selectedProject]);

	const activeProject = selectedProject ?? visibleProjects[0] ?? null;

	useEffect(() => {
		const feature = projectFeatureRef.current;
		if (!feature || reducedMotion || visibleProjects.length < 2) return;

		const context = gsap.context(() => {
			ScrollTrigger.create({
				trigger: feature,
				start: () => window.innerWidth < 640 ? 'top top+=79' : 'top top+=72',
				end: () => `+=${window.innerHeight * (visibleProjects.length - 1) * 0.72}`,
				pin: feature,
				pinSpacing: true,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				onUpdate: (trigger) => {
					const index = Math.min(
						visibleProjects.length - 1,
						Math.floor(trigger.progress * visibleProjects.length),
					);
					const nextProject = visibleProjects[index];
					setSelectedProject((current) => current?.id === nextProject.id ? current : nextProject);
				},
			});
		}, root);
		ScrollTrigger.refresh();
		const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
		const refreshOnResize = () => ScrollTrigger.refresh();
		window.addEventListener('resize', refreshOnResize);

		return () => {
			window.cancelAnimationFrame(refreshFrame);
			window.removeEventListener('resize', refreshOnResize);
			context.revert();
		};
	}, [projectFilter, reducedMotion, visibleProjects.length]);

	useEffect(() => {
		if (!activeProject || !projectDetailRef.current) return;
		if (reducedMotion) return;
		const context = gsap.context(() => {
			gsap.fromTo(projectDetailRef.current, { autoAlpha: 0, y: 18 }, {
				autoAlpha: 1,
				y: 0,
				duration: 0.4,
				ease: 'power2.out',
			});
			gsap.from('[data-project-detail-item]', {
				y: 12,
				autoAlpha: 0,
				duration: 0.35,
				stagger: 0.055,
				delay: 0.08,
				ease: 'power2.out',
			});
		}, projectDetailRef);
		return () => context.revert();
	}, [activeProject?.id, reducedMotion]);

	return (
		<div ref={root} className="min-h-screen bg-canvas text-ink transition-colors duration-300">
			<div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-accent" data-scroll-progress />
			<header className="fixed left-1/2 top-4 z-50 flex w-[min(100%-2rem,1000px)] -translate-x-1/2 items-center justify-between rounded-full border border-line bg-canvas/95 px-4 py-2.5 text-ink shadow-lg backdrop-blur-md md:justify-center md:gap-6 md:px-5">
				<button className="font-display text-xl font-bold tracking-[-.12em]" type="button" onClick={() => navigateTo('home')} aria-label="Kembali ke awal">
					az<span className="text-accent">.</span>
				</button>
				<nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
					{navigation.map((item) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							onClick={(event) => { event.preventDefault(); navigateTo(item.id); }}
							aria-current={activeSection === item.id ? 'location' : undefined}
							className={`rounded-full px-3 py-2 text-[11px] font-semibold transition-colors hover:text-accent ${activeSection === item.id ? 'bg-accent/10 text-accent' : 'text-muted'}`}
						>
							{item.label}
						</a>
					))}
				</nav>
				<div className="flex items-center gap-2">
					<a className="hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-[10px] font-bold text-night transition-transform hover:-translate-y-0.5 sm:flex" href="/cv.pdf" download>
						Unduh CV <ArrowDown size={13} />
					</a>
					<div className="hidden size-9 rounded-full border border-line md:grid md:place-items-center">
						<span className="font-mono text-[8px] uppercase tracking-widest text-accent">D</span>
					</div>
					<button
						type="button"
						className="grid size-9 place-items-center rounded-full border border-line md:hidden"
						onClick={() => setMobileMenuOpen((open) => !open)}
						aria-expanded={mobileMenuOpen}
						aria-controls="mobile-navigation"
						aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
					>
						{mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
					</button>
				</div>
				<div
					id="mobile-navigation"
					inert={!mobileMenuOpen}
					className={`absolute left-0 right-0 top-[calc(100%+0.6rem)] grid overflow-hidden rounded-3xl border border-line bg-canvas px-4 shadow-xl transition-all duration-300 md:hidden ${mobileMenuOpen ? 'max-h-[28rem] py-3 opacity-100' : 'pointer-events-none max-h-0 border-transparent py-0 opacity-0'}`}
				>
					{navigation.map((item) => (
						<a key={item.id} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); navigateTo(item.id); }} className="border-b border-line py-3 text-sm font-semibold last:border-0">
							<span className="mr-3 font-mono text-[10px] text-accent">{String(navigation.indexOf(item) + 1).padStart(2, '0')}</span>{item.label}
						</a>
					))}
					<a href="/cv.pdf" download className="mt-2 flex items-center justify-between rounded-xl bg-accent px-4 py-3 text-sm font-bold text-night">Unduh CV <ArrowDown size={16} /></a>
				</div>
			</header>

			<main>
				<section id="home" className="paper-grid relative isolate flex min-h-[760px] items-center overflow-hidden bg-night px-6 pb-20 pt-32 text-paper md:min-h-[840px] md:px-12 lg:px-[max(3rem,calc((100vw-1200px)/2))]">
					<div className="pointer-events-none absolute inset-0 -z-10 opacity-25" aria-hidden="true">
						<div className="absolute left-[58%] top-[15%] aspect-square w-[min(52vw,620px)] rounded-full border border-paper/30" />
						<div className="absolute left-[63%] top-[22%] aspect-square w-[min(39vw,460px)] rounded-full border border-dashed border-accent/60" />
						<div className="absolute left-[72%] top-[41%] size-3 rounded-full bg-accent shadow-[0_0_0_10px_rgba(216,229,138,.12)]" />
					</div>
					<div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 md:grid-cols-[1.05fr_.95fr]">
						<div className="relative z-10">
							<p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] text-paper/75" data-hero-copy>
								<span className="size-2 rounded-full bg-accent" data-pulse /> {portfolio.location}
							</p>
							<h1 className="font-display text-[clamp(5rem,15vw,12rem)] font-bold leading-[.76] tracking-[-.095em] text-paper">
								<span className="block" data-hero-word>{portfolio.displayName[0]}</span>
								<span className="block text-accent" data-hero-word>{portfolio.displayName.slice(1).join(' ')}<span className="text-coral">.</span></span>
							</h1>
							<p className="mt-8 font-display text-lg font-semibold tracking-tight text-paper md:text-xl" data-hero-copy>{portfolio.role}<span className="ml-3 rounded-sm border border-accent/80 bg-accent px-2 py-1 align-middle font-mono text-[9px] uppercase tracking-wider text-night">Fullstack - Website - Mobile - AI/ML</span></p>
							<p className="mt-4 max-w-[460px] text-sm leading-7 text-paper/70 md:text-base" data-hero-copy>{portfolio.tagline}</p>
							<div className="mt-7 flex flex-wrap gap-3" data-hero-copy>
								<a href="#projects" onClick={(event) => { event.preventDefault(); navigateTo('projects'); }} className="magnetic inline-flex min-h-12 items-center gap-3 rounded-full bg-paper px-5 text-xs font-bold text-night transition-transform hover:-translate-y-1">
									Lihat karya <ArrowDownRight size={16} />
								</a>
								<a href="#contact" onClick={(event) => { event.preventDefault(); navigateTo('contact'); }} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-paper/60 px-5 text-xs font-bold transition-colors hover:bg-paper/10">
									Hubungi saya <ArrowUpRight size={15} />
								</a>
								<a href="/cv.pdf" download className="inline-flex min-h-12 items-center gap-2 px-2 text-xs font-semibold text-paper/70 underline decoration-paper/35 underline-offset-4 hover:text-paper sm:hidden">
									Unduh CV <ArrowDown size={14} />
								</a>
							</div>
							<div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[.12em] text-paper/55">
								<span>Fokus saat ini</span><i className="h-px w-8 bg-paper/30" /><span>Web</span><span>Fullstack</span><span>Mobile Developer</span><span>Produk digital</span>
							</div>
						</div>
						<div className="relative mx-auto flex aspect-square w-full max-w-[470px] items-center justify-center" aria-label="Ilustrasi website desktop dan aplikasi mobile" role="img">
							<div className="absolute inset-[8%] rounded-full border border-paper/15" data-orbit />
							<div className="absolute inset-[18%] rotate-[-24deg] rounded-[42%] border border-accent/40" data-orbit-reverse />
							<div className="absolute right-[5%] top-[13%] -rotate-6 rounded-lg border border-paper/60 bg-night px-4 py-3 shadow-[5px_6px_0_rgba(216,229,138,.75)]" data-hero-copy>
								<p className="font-mono text-[8px] uppercase tracking-widest text-accent">Web + Mobile</p>
								<p className="mt-2 font-display text-sm font-semibold">Satu produk, banyak layar.</p>
							</div>
							<div className="relative z-10 w-[72%] -rotate-3 transition-transform duration-500 hover:rotate-0" data-float>
								<div className="rounded-2xl border-[7px] border-[#101929] bg-paper p-2 shadow-[14px_18px_0_rgba(0,0,0,.24)]">
									<div className="flex h-5 items-center gap-1.5 rounded-t-lg bg-[#d9d8d1] px-2">
										<span className="size-1.5 rounded-full bg-coral" /><span className="size-1.5 rounded-full bg-[#d6b85d]" /><span className="size-1.5 rounded-full bg-[#729b88]" />
										<span className="ml-2 h-2.5 flex-1 rounded-sm bg-paper" />
									</div>
									<div className="grid min-h-[190px] grid-cols-[.65fr_1.35fr] gap-2 rounded-b-lg bg-[#e6e3d8] p-3 text-night">
										<div className="space-y-2 rounded-lg bg-night p-2">
											<div className="h-2 w-10 rounded bg-accent" />
											{[1, 2, 3, 4].map((item) => <div key={item} className="h-1.5 rounded bg-paper/20" />)}
										</div>
										<div>
											<p className="font-mono text-[7px] uppercase tracking-wider text-muted">Ringkasan / dashboard</p>
											<p className="mt-2 font-display text-sm font-bold leading-tight">Data, alur, hasil.</p>
											<div className="mt-3 flex h-16 items-end gap-1 rounded-lg bg-night p-2">
												{[36, 57, 43, 76, 62, 90].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-accent/80" style={{ height: `${height}%` }} />)}
											</div>
											<div className="mt-2 grid grid-cols-2 gap-1">{['API aktif', 'Data siap'].map((label) => <div key={label} className="rounded bg-paper p-1.5 font-mono text-[6px]">{label}</div>)}</div>
										</div>
									</div>
								</div>
							</div>
							<div className="absolute bottom-[17%] left-[8%] z-20 w-[17%] -rotate-[10deg] rounded-[1.2rem] border-[5px] border-[#101929] bg-paper p-1 shadow-[8px_10px_0_rgba(0,0,0,.3)]" data-hero-copy>
								<div className="relative aspect-[.58] overflow-hidden rounded-[.85rem] bg-[#e6e3d8] p-2 pt-5 text-night">
									<div className="absolute left-1/2 top-1.5 h-1 w-6 -translate-x-1/2 rounded-full bg-[#101929]" />
									<p className="font-mono text-[5px] uppercase tracking-wider text-muted">Mobile app</p>
									<div className="mt-2 h-9 rounded bg-night p-1"><div className="flex h-full items-end gap-0.5">{[35, 75, 50, 90].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-accent" style={{ height: `${height}%` }} />)}</div></div>
									<div className="mt-1.5 grid gap-1">{[1, 2].map((item) => <div key={item} className="h-2 rounded bg-paper" />)}</div>
								</div>
							</div>
							<div className="absolute bottom-[13%] left-[5%] -rotate-3 rounded-full border border-paper/50 bg-night px-3 py-2 font-mono text-[8px] text-paper/80">KODE RAPI · DAMPAK NYATA</div>
							<p className="absolute bottom-[4%] right-[4%] font-mono text-[8px] uppercase tracking-widest text-paper/50">Website · Mobile · AI/ML</p>
						</div>
					</div>
					<a href="#about" onClick={(event) => { event.preventDefault(); navigateTo('about'); }} className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-paper/55 md:flex">
						Gulir untuk menjelajah <ChevronDown size={14} className="text-accent" />
					</a>
				</section>

				<section id="about" className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32 lg:px-[max(3rem,calc((100vw-1200px)/2))]">
					<div className="mx-auto max-w-[1200px]">
						<SectionLabel number="01" label="Tentang saya" side="BEKERJA DENGAN TUJUAN" />
						<div className="mt-14 grid items-center gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
							<div className="paper-grid relative mx-auto grid aspect-[.9] w-full max-w-[340px] place-items-center overflow-hidden border border-line bg-soft">
								<div className="pointer-events-none absolute inset-3 border border-line/60" aria-hidden="true" />
								<img src="/AZZ02949.JPG" alt="Foto profil pemilik portofolio" width={4000} height={6000} loading="lazy" decoding="async" className="relative z-10 aspect-[.9] w-[72%] rounded-2xl border border-paper/25 object-cover shadow-[10px_12px_0_rgba(16,25,41,.5)]" />
								<div className="absolute left-5 top-5 z-20 rounded-full border border-line bg-canvas/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-accent">01 / Profil</div>
							</div>
							<div>
								<h2 className="max-w-[670px] font-display text-4xl font-semibold leading-[1.06] tracking-[-.06em] md:text-6xl" data-reveal>{portfolio.aboutHeadline}</h2>
								<p className="mt-6 max-w-[630px] text-sm leading-7 text-muted md:text-base">{portfolio.bio}</p>
								<div className="mt-9 grid grid-cols-3 border-y border-line py-5">
									{portfolio.stats.map((stat) => <div key={stat.label} className="border-r border-line px-3 first:pl-0 last:border-0">
										<p className="font-display text-3xl font-semibold tracking-tight text-accent md:text-4xl"><span data-count={stat.value}>{stat.value}</span><span>{stat.suffix}</span></p>
										<p className="mt-1 font-mono text-[8px] uppercase tracking-wider text-muted md:text-[9px]">{stat.label}</p>
									</div>)}
								</div>
								<p className="mt-5 max-w-[580px] text-xs leading-6 text-muted"><span className="mr-2 font-mono text-[9px] uppercase tracking-widest text-accent">Pegangan</span>{portfolio.workPrinciple}</p>
							</div>
						</div>
					</div>
				</section>

				<section id="education" className="scroll-mt-24 bg-soft px-6 py-24 md:px-12 md:py-28 lg:px-[max(3rem,calc((100vw-1200px)/2))]">
					<div className="mx-auto max-w-[1200px]">
						<SectionLabel number="02" label="Pendidikan" side="BELAJAR SEPANJANG JALAN" />
						<div className="mt-12 grid gap-10 md:grid-cols-[.65fr_1.35fr]">
							<div><h2 className="max-w-[350px] font-display text-5xl font-semibold leading-[.92] tracking-[-.07em] md:text-7xl" data-reveal>Rasa ingin tahu, <em className="text-accent not-italic">terstruktur.</em></h2><p className="mt-5 max-w-[330px] text-sm leading-6 text-muted">{portfolio.educationIntro}</p></div>
							<div className="relative ml-1 border-l border-line pl-7 md:pl-10">
								<div className="absolute -left-px top-0 h-full w-px origin-top bg-accent" data-timeline-line />
								{portfolio.education.map((item, index) => <article key={item.institution} className={`relative pb-10 last:pb-0 ${index === 0 ? '' : 'pt-4'}`} data-reveal>
									<span className="absolute -left-[2.05rem] top-1 size-2.5 rounded-full border-2 border-accent bg-canvas md:-left-[2.65rem]" />
									<div className="flex flex-wrap items-baseline justify-between gap-2">
										<p className="font-mono text-[10px] uppercase tracking-wider text-accent">{item.period}</p>
										{item.result && <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] text-muted">{item.result}</span>}
									</div>
									<h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{item.institution}</h3>
									<p className="mt-1 text-sm font-medium">{item.degree}</p>
									<p className="mt-3 max-w-[590px] text-xs leading-6 text-muted">{item.notes}</p>
								</article>)}
							</div>
						</div>
					</div>
				</section>

				<section id="skills" className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32 lg:px-[max(3rem,calc((100vw-1200px)/2))]">
					<div className="mx-auto max-w-[1200px]">
						<SectionLabel number="03" label="Keahlian" side="ALAT MENGIKUTI KEBUTUHAN" />
						<div className="mt-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
							<h2 className="max-w-[600px] font-display text-5xl font-semibold leading-[.92] tracking-[-.07em] md:text-7xl" data-reveal>Merancang. Membangun. <span className="text-accent">Mengirim.</span></h2>
							<p className="max-w-[330px] text-sm leading-6 text-muted">{portfolio.skillsIntro}</p>
						</div>
						<div className="mt-9 flex flex-wrap gap-2" role="group" aria-label="Filter kelompok keahlian">
							{skillFilters.map((filter) => <button key={filter} type="button" onClick={() => setSkillFilter(filter)} aria-pressed={skillFilter === filter} className={`rounded-full border px-3.5 py-2 text-[10px] font-semibold transition-colors ${skillFilter === filter ? 'border-accent bg-accent text-night' : 'border-line text-muted hover:border-accent hover:text-ink'}`}>{filter}</button>)}
						</div>
						<div className="mt-5 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
							{visibleSkills.map((skill) => <article key={skill.name} className="group min-h-[205px] border-b border-r border-line p-5 transition-colors hover:bg-soft md:p-6" data-reveal>
								<div className="flex items-center justify-between font-mono text-[9px] text-accent"><span>{String(portfolio.skills.indexOf(skill) + 1).padStart(2, '0')} / {skill.category}</span><ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
								<h3 className="mt-9 font-display text-2xl font-semibold tracking-tight">{skill.name}</h3>
								<p className="mt-2 text-xs leading-5 text-muted">{skill.context}</p>
								<div className="mt-4 flex flex-wrap gap-1.5">{skill.tools.map((tool) => <span key={tool} className="rounded-full bg-soft px-2.5 py-1 font-mono text-[9px] text-muted">{tool}</span>)}</div>
							</article>)}
						</div>
						<div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-5">
							<span className="font-mono text-[9px] uppercase tracking-widest text-accent">Bahasa</span>
							{portfolio.languages.map((language) => <span key={language.name} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">{language.name} <span className="ml-1 text-ink">/ {language.level}</span></span>)}
						</div>
						<div className="mt-16 border-t border-line pt-8">
							<div className="grid gap-7 md:grid-cols-[.8fr_1.2fr] md:items-center">
								<div data-reveal>
									<p className="font-mono text-[9px] uppercase tracking-[.14em] text-accent">Sertifikat</p>
									<h3 className="mt-4 max-w-[390px] font-display text-4xl font-semibold leading-[.95] tracking-[-.05em] md:text-5xl">
										Pengakuan atas <span className="text-accent">proses belajar.</span>
									</h3>
								</div>
								{portfolio.certificates.length > 0 ? (
									<div className="grid gap-3 sm:grid-cols-2" data-reveal>
										{portfolio.certificates.map((certificate, index) => <article key={`${certificate.issuer}-${certificate.title}`} className="border border-line bg-soft p-5 transition-transform hover:-translate-y-1">
											<div className="flex items-center justify-between text-accent">
												<Award size={20} aria-hidden="true" />
												<span className="font-mono text-[9px]">{String(index + 1).padStart(2, '0')} / SERTIFIKAT</span>
											</div>
											<h4 className="mt-8 font-display text-2xl font-semibold leading-tight">{certificate.title}</h4>
											<p className="mt-2 text-xs text-muted">{certificate.issuer} · {certificate.issuedAt}</p>
											{certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-ink">
												Lihat kredensial <ArrowUpRight size={14} />
											</a>}
										</article>)}
									</div>
								) : (
									<div className="relative isolate flex min-h-60 flex-col items-center justify-center overflow-hidden border border-line bg-soft p-8 text-center" data-reveal>
										<div className="absolute inset-4 border border-accent/25" aria-hidden="true" />
										<div className="absolute inset-7 border border-line" aria-hidden="true" />
										<div className="relative grid size-14 place-items-center rounded-full border border-accent/40 bg-canvas text-accent">
											<Award size={25} strokeWidth={1.3} aria-hidden="true" />
										</div>
										<h4 className="relative mt-4 font-display text-2xl font-semibold">Sertifikat</h4>
										<p className="relative mt-2 inline-flex items-center gap-2 rounded-full border border-accent/35 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-accent">
											<span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
											Belum diterbitkan
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

				<section id="projects" className="scroll-mt-24 bg-night px-6 py-24 text-paper md:px-12 md:py-32 lg:px-[max(3rem,calc((100vw-1200px)/2))]">
					<div className="mx-auto max-w-[1200px]">
						<SectionLabel number="04" label="Proyek pilihan" side="PROYEK DARI CV" inverse />
						<div className="mt-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
							<h2 className="font-display text-5xl font-semibold leading-[.92] tracking-[-.07em] md:text-7xl" data-reveal>Masalah nyata,<br /><span className="text-accent">solusi terukur.</span></h2>
							<p className="max-w-[330px] text-sm leading-6 text-paper/60">{portfolio.projectsIntro}</p>
						</div>
						<div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-paper/20 py-3">
							<p className="font-mono text-[9px] uppercase tracking-widest text-paper/50">Gulir untuk melihat tiap proyek <span className="ml-2 text-accent">({visibleProjects.length} proyek)</span></p>
							<div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter proyek">
								{projectFilters.map((filter) => <button key={filter} type="button" onClick={() => setProjectFilter(filter)} aria-pressed={projectFilter === filter} className={`rounded-full border px-3 py-1.5 text-[9px] font-semibold transition-colors ${projectFilter === filter ? 'border-accent bg-accent text-night' : 'border-paper/25 text-paper/70 hover:border-accent hover:text-accent'}`}>{filter}</button>)}
							</div>
						</div>
						<div ref={projectFeatureRef} className="mt-8 grid min-h-[calc(100svh-80px)] grid-cols-1 items-stretch gap-4 sm:gap-5 lg:min-h-[82svh] lg:grid-cols-[0.95fr_1.25fr] lg:gap-8">
							<div className="project-list grid h-full grid-cols-2 auto-rows-fr content-between gap-2 sm:grid-cols-2 sm:gap-3" role="group" aria-label="Pilih proyek">
								{visibleProjects.map((project, index) => {
									const active = activeProject?.id === project.id;
									return (
										<button key={project.id} type="button" onClick={() => setSelectedProject(project)} aria-pressed={active} className={`group relative isolate flex min-h-[60px] flex-col justify-between overflow-hidden rounded-2xl border px-3 py-1.5 text-left transition-all duration-300 sm:min-h-[100px] sm:px-4 sm:py-3 ${active ? 'border-accent bg-accent text-night shadow-[0_0_0_1px_rgba(216,229,138,0.2)]' : 'border-paper/15 bg-white/[0.025] text-paper hover:border-accent/70 hover:bg-white/[0.06]'}`} data-reveal>
											<span className={`pointer-events-none absolute -bottom-4 right-1 -z-10 font-display text-5xl font-bold leading-none transition-colors ${active ? 'text-night/10' : 'text-paper/[0.035] group-hover:text-accent/10'}`} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
											<div className="flex w-full items-center justify-between gap-1">
												<p className={`font-mono text-[8px] uppercase tracking-[.1em] sm:text-[9px] ${active ? 'text-night/65' : 'text-accent/80'}`}>{project.category} <span className="opacity-60">/ {project.year}</span></p>
												<ArrowUpRight size={14} className={`shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${active ? 'text-night' : 'text-paper/55'}`} />
											</div>
											<h3 className="mt-1 line-clamp-2 w-full font-display text-xs font-semibold leading-tight tracking-[-.03em] sm:mt-2 sm:text-base sm:leading-snug">{project.title}</h3>
											<span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${active ? 'scale-x-100 bg-night/50' : 'bg-accent'}`} />
										</button>
									);
								})}
							</div>
							<div className="h-full">
								{activeProject && (
									<div ref={projectDetailRef} className="detail-panel relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-3xl border border-paper/15 bg-[#111827] p-3 shadow-[0_24px_70px_rgba(15,23,42,0.4)] sm:min-h-0 sm:p-6 md:p-8" role="region" aria-label={`Detail proyek ${activeProject.title}`} aria-live="polite">
										<div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
											<div className="absolute right-8 top-8 size-36 rounded-full border border-accent/25" />
											<div className="absolute right-14 top-14 size-24 rounded-full border border-dashed border-paper/20" />
										</div>
										<div className="relative z-10 flex min-h-full flex-col">
											<div className="flex flex-wrap items-center justify-between gap-3" data-project-detail-item>
												<p className="font-mono text-[8px] uppercase tracking-[.17em] text-accent sm:text-[9px]">Featured build / {activeProject.role}</p>
												<p className="font-mono text-[8px] uppercase tracking-[.12em] text-paper/50">{activeProject.category} / {activeProject.year}</p>
											</div>
											<h3 className="mt-4 max-w-[740px] font-display text-3xl font-semibold leading-[.94] tracking-[-.055em] sm:mt-7 sm:text-4xl md:text-5xl" data-project-detail-item>{activeProject.title}</h3>
											<p className="mt-3 max-w-[720px] text-xs leading-5 text-paper/70 sm:hidden" data-project-detail-item>{activeProject.summary}</p>
											<p className="mt-3 hidden max-w-[720px] text-xs leading-5 text-paper/70 sm:mt-5 sm:block sm:text-sm sm:leading-6" data-project-detail-item>{activeProject.detail}</p>
											<div className="mt-3 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2" data-project-detail-item>{activeProject.stack.map((tool) => <span key={tool} className="rounded-full border border-paper/15 bg-white/5 px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-paper/70 sm:px-3 sm:text-[9px]">{tool}</span>)}</div>
											<div className="mt-4 hidden border-t border-paper/15 sm:mt-7 sm:block" data-project-detail-item>
												{activeProject.highlights.map((item, index) => (
													<div key={item} className="group flex items-start gap-4 border-b border-paper/10 py-3 sm:gap-5 sm:py-4">
														<span className="shrink-0 font-mono text-[10px] text-accent/70 sm:text-xs">{String(index + 1).padStart(2, '0')}</span>
														<p className="max-w-[620px] text-xs leading-5 text-paper/75 transition-colors group-hover:text-paper sm:text-sm sm:leading-6">{item}</p>
													</div>
												))}
											</div>
											<div className="mt-auto flex flex-col gap-4 pt-5 sm:flex-row sm:items-end sm:justify-between sm:pt-6" data-project-detail-item>
												<div className="max-w-[520px] border-l-2 border-accent pl-3 sm:pl-4">
													<p className="font-mono text-[8px] uppercase tracking-[.15em] text-accent">Hasil</p>
													<p className="mt-1 line-clamp-1 text-xs leading-5 text-paper/80 sm:line-clamp-none sm:text-sm">{activeProject.impact}</p>
												</div>
												<div className="flex shrink-0 flex-wrap gap-2">
													{activeProject.demoUrl && <a href={activeProject.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold text-night">Demo <ArrowUpRight size={14} /></a>}
													{activeProject.repoUrl && <a href={activeProject.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-xs font-bold text-paper/80 hover:border-accent hover:text-accent">Repo <ArrowUpRight size={14} /></a>}
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

				<section id="experience" className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32 lg:px-[max(3rem,calc((100vw-1200px)/2))]">
					<div className="mx-auto max-w-[1200px]">
						<SectionLabel number="05" label="Pengalaman kerja" side="PROFESSIONAL EXPERIENCE / 02" />
						<div className="mt-10 flex flex-col justify-between gap-5 md:mt-12 md:flex-row md:items-end">
							<h2 className="font-display text-5xl font-semibold uppercase leading-[.88] tracking-[-.07em] md:text-7xl" data-reveal>Pengalaman<br />kerja<span className="text-accent">.</span></h2>
							<p className="max-w-[390px] text-sm leading-6 text-muted">{portfolio.experienceIntro}</p>
						</div>
						<div className="relative mt-14 md:mt-20" role="list" aria-label="Linimasa pengalaman kerja">
							<div className="absolute bottom-8 left-[5px] top-0 w-px origin-top bg-line md:hidden" data-timeline-line-vertical />
							<div className="absolute left-[25%] right-[25%] top-0 hidden h-px origin-left bg-line md:block" data-timeline-line-horizontal />
							<div className="grid gap-8 md:grid-cols-2 md:gap-12">
								{portfolio.experience.map((item) => {
									const year = item.period.match(/\d{4}/)?.[0] ?? item.period;
									return (
										<article key={`${item.company}-${item.period}`} className="relative pb-8 pl-7 last:pb-0 md:pb-0 md:pl-0 md:pt-8" role="listitem" data-reveal>
											<span className="absolute -left-px top-0 size-3 rounded-full border-2 border-accent bg-canvas md:left-1/2 md:top-[-5px] md:-translate-x-1/2" aria-hidden="true" />
											<div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
												<p className="font-display text-4xl font-semibold tracking-[-.07em] text-accent md:text-5xl">{year}</p>
												<p className="font-mono text-[9px] uppercase tracking-[.13em] text-muted">{item.period}</p>
											</div>
											<h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-[-.04em] md:text-3xl">{item.position}</h3>
											<p className="mt-1 font-mono text-[10px] uppercase tracking-[.08em] text-accent">{item.company}</p>
											<p className="mt-4 max-w-[520px] text-sm leading-6 text-muted">{item.summary}</p>
											<ul className="mt-4 grid gap-2">
												{item.highlights.map((highlight) => <li key={highlight} className="flex gap-2.5 text-xs leading-5 text-muted"><Check size={14} className="mt-0.5 shrink-0 text-accent" />{highlight}</li>)}
											</ul>
										</article>
									);
								})}
							</div>
						</div>
					</div>
				</section>

				<section id="contact" className="scroll-mt-24 relative isolate flex min-h-[88svh] overflow-hidden bg-night px-6 py-12 text-paper md:px-12 md:py-16 lg:px-[max(3rem,calc((100vw-1200px)/2))]">
					<div className="pointer-events-none absolute -right-32 top-12 -z-10 size-[min(65vw,700px)] rounded-full border border-paper/10" aria-hidden="true" />
					<div className="pointer-events-none absolute -right-20 top-24 -z-10 size-[min(52vw,560px)] rounded-full border border-dashed border-accent/20" aria-hidden="true" />
					<div className="mx-auto flex w-full max-w-[1200px] flex-col">
						<SectionLabel number="06" label="Kontak" side="PEKANBARU, INDONESIA" inverse />
						<div className="mt-10 flex flex-1 flex-col justify-between gap-12">
							<h2 className="max-w-[1100px] font-display text-[clamp(3.25rem,8vw,7.5rem)] font-bold leading-[.82] tracking-[-.065em] text-paper" data-reveal>
								MARI KERJA BARENG<br />DAN BIKIN SESUATU<br /><span className="text-accent">YANG BERGUNA.</span>
							</h2>
							<div className="flex flex-col justify-between gap-12 border-t border-paper/15 pt-8 md:flex-row md:items-end">
								<div>
									<p className="max-w-[390px] text-sm leading-6 text-paper/60">{portfolio.contactIntro}</p>
									<div className="mt-6 flex flex-wrap gap-3">
										<a href={`mailto:${portfolio.contact.email}`} className="magnetic inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-xs font-bold text-night transition-transform hover:-translate-y-1">
											Kirim email <ArrowUpRight size={15} />
										</a>
										<a href="/cv.pdf" download className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-5 text-xs font-bold text-paper transition-colors hover:border-accent hover:text-accent">
											Unduh CV <ArrowDown size={14} />
										</a>
									</div>
								</div>
								<div className="grid gap-4 font-mono text-[10px] uppercase tracking-[.08em] md:min-w-[360px]">
									<a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-3 transition-colors hover:text-accent">
										<span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-night"><Linkedin size={15} /></span>
										<span className="break-all">{portfolio.contact.linkedinLabel}</span><ArrowUpRight size={13} className="ml-auto shrink-0 opacity-50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
									</a>
									<a href={`tel:${portfolio.contact.phone}`} className="group flex items-center gap-3 transition-colors hover:text-accent">
										<span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-night"><Phone size={15} /></span>
										<span>{portfolio.contact.phoneDisplay}</span><ArrowUpRight size={13} className="ml-auto shrink-0 opacity-50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
									</a>
									<a href={`mailto:${portfolio.contact.email}`} className="group flex items-center gap-3 transition-colors hover:text-accent">
										<span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-night"><Mail size={15} /></span>
										<span className="break-all">{portfolio.contact.email}</span><ArrowUpRight size={13} className="ml-auto shrink-0 opacity-50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
									</a>
									<a href={portfolio.contact.github} target="_blank" rel="noreferrer" className="group flex items-center gap-3 transition-colors hover:text-accent">
										<span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-night"><Github size={15} /></span>
										<span>{portfolio.contact.githubLabel}</span><ArrowUpRight size={13} className="ml-auto shrink-0 opacity-50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-3 bg-night px-6 py-6 text-paper/70 md:flex-row md:items-center md:justify-between md:px-12 lg:px-[max(3rem,calc((100vw-1200px)/2))]">
				<a href="#home" onClick={(event) => { event.preventDefault(); navigateTo('home'); }} className="font-display text-xl font-bold tracking-[-.12em] text-paper">az<span className="text-accent">.</span></a>
				<p className="text-[10px]">© {new Date().getFullYear()} {portfolio.name}. Dibuat dengan rasa ingin tahu.</p>
				<a href="#home" onClick={(event) => { event.preventDefault(); navigateTo('home'); }} className="inline-flex items-center gap-2 text-[10px] hover:text-accent">Kembali ke atas <ArrowUpRight size={13} /></a>
			</footer>

			<div className="pointer-events-none fixed left-0 top-0 z-[80] hidden size-3 rounded-full border border-accent bg-accent/30 opacity-0 transition-[width,height,background-color] duration-150 lg:block" data-custom-cursor aria-hidden="true" />
		</div>
	);
}

function SectionLabel({ number, label, side, inverse = false }: { number: string; label: string; side: string; inverse?: boolean }) {
	return <div className={`flex items-center justify-between gap-4 border-b pb-3 font-mono text-[9px] uppercase tracking-[.14em] ${inverse ? 'border-paper/20 text-paper/60' : 'border-line text-muted'}`}>
		<span><b className="mr-3 font-normal text-accent">{number} /</b>{label}</span><span className="text-right">{side}</span>
	</div>;
}

export default App;
