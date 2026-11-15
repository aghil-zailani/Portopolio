import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupAnimations(root: RefObject<HTMLDivElement | null>, reducedMotion: boolean) {
	const element = root.current;
	if (!element) return;
	const listeners: Array<() => void> = [];
	const progressBar = element.querySelector<HTMLElement>('[data-scroll-progress]');
	if (progressBar) {
		const setProgress = gsap.quickSetter(progressBar, 'scaleX');
		const updateProgress = () => {
			const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0);
		};
		updateProgress();
		window.addEventListener('scroll', updateProgress, { passive: true });
		window.addEventListener('resize', updateProgress);
		ScrollTrigger.addEventListener('refresh', updateProgress);
		listeners.push(() => {
			window.removeEventListener('scroll', updateProgress);
			window.removeEventListener('resize', updateProgress);
			ScrollTrigger.removeEventListener('refresh', updateProgress);
		});
	}
	if (reducedMotion) {
		element.querySelectorAll<HTMLElement>('[data-count]').forEach((counter) => {
			counter.textContent = counter.dataset.count ?? '0';
		});
		return () => listeners.forEach((cleanup) => cleanup());
	}

	const context = gsap.context(() => {
		gsap.from('[data-hero-word]', { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.15 });
		gsap.from('[data-hero-copy]', {
			y: 16,
			opacity: 0,
			duration: 0.55,
			stagger: 0.1,
			delay: 0.45,
			ease: 'power2.out',
		});
		gsap.to('[data-orbit]', {
			rotation: 360,
			duration: 42,
			repeat: -1,
			ease: 'none',
			transformOrigin: '50% 50%',
		});
		gsap.to('[data-orbit-reverse]', {
			rotation: -360,
			duration: 56,
			repeat: -1,
			ease: 'none',
			transformOrigin: '50% 50%',
		});
		gsap.to('[data-float]', {
			y: -9,
			duration: 2.8,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut',
		});
		gsap.to('[data-pulse]', {
			scale: 1.25,
			opacity: 0.65,
			duration: 1.2,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut',
		});
		gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((item) => {
			gsap.from(item, {
				y: 24,
				opacity: 0,
				duration: 0.65,
				ease: 'power2.out',
				scrollTrigger: { trigger: item, start: 'top 88%', once: true },
			});
		});
		gsap.fromTo('[data-timeline-line]', { scaleY: 0 }, {
			scaleY: 1,
			ease: 'none',
			scrollTrigger: { trigger: '[data-timeline-line]', start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
		});
		gsap.fromTo('[data-timeline-line-vertical]', { scaleY: 0 }, {
			scaleY: 1,
			ease: 'none',
			scrollTrigger: { trigger: '#experience', start: 'top 75%', end: 'center center', scrub: 0.6 },
		});
		gsap.fromTo('[data-timeline-line-horizontal]', { scaleX: 0 }, {
			scaleX: 1,
			ease: 'none',
			scrollTrigger: { trigger: '#experience', start: 'top 75%', end: 'center center', scrub: 0.6 },
		});
		element.querySelectorAll<HTMLElement>('[data-count]').forEach((counter) => {
			const target = Number(counter.dataset.count);
			if (!Number.isFinite(target)) return;
			const value = { current: 0 };
			gsap.to(value, {
				current: target,
				duration: 1.2,
				ease: 'power1.out',
				scrollTrigger: { trigger: counter, start: 'top 90%', once: true },
				onUpdate: () => { counter.textContent = String(Math.round(value.current)); },
			});
		});

		const cursor = element.querySelector<HTMLElement>('[data-custom-cursor]');
		if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
			const moveX = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' });
			const moveY = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' });
			const onMove = (event: PointerEvent) => {
				moveX(event.clientX - 6);
				moveY(event.clientY - 6);
				gsap.to(cursor, { opacity: 1, duration: 0.18, overwrite: true });
				const interactive = (event.target as Element | null)?.closest('a, button');
				gsap.to(cursor, { scale: interactive ? 2 : 1, duration: 0.18, overwrite: true });
			};
			const onLeave = () => gsap.to(cursor, { opacity: 0, duration: 0.2, overwrite: true });
			window.addEventListener('pointermove', onMove);
			window.addEventListener('pointerleave', onLeave);
			listeners.push(() => {
				window.removeEventListener('pointermove', onMove);
				window.removeEventListener('pointerleave', onLeave);
			});
		}

		const magneticElements = element.querySelectorAll<HTMLElement>('.magnetic');
		magneticElements.forEach((button) => {
			const onMove = (event: PointerEvent) => {
				const bounds = button.getBoundingClientRect();
				const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
				const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
				gsap.to(button, { x, y, duration: 0.25, ease: 'power2.out', overwrite: true });
			};
			const onLeave = () => gsap.to(button, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.35)', overwrite: true });
			button.addEventListener('pointermove', onMove);
			button.addEventListener('pointerleave', onLeave);
			listeners.push(() => {
				button.removeEventListener('pointermove', onMove);
				button.removeEventListener('pointerleave', onLeave);
			});
		});
	}, element);

	return () => {
		listeners.forEach((cleanup) => cleanup());
		context.revert();
	};
}
