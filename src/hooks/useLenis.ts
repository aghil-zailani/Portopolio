import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
	const lenisRef = useRef<Lenis | null>(null);
	const scrollTo = useCallback((target: string) => {
		const lenis = lenisRef.current;
		const element = document.querySelector<HTMLElement>(target);
		if (!element) return;
		if (lenis) lenis.scrollTo(element, { offset: -20 });
		else element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
	}, []);

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.1 });
		lenisRef.current = lenis;
		const onScroll = () => ScrollTrigger.update();
		const tick = (time: number) => lenis.raf(time * 1000);
		lenis.on('scroll', onScroll);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(tick);
			lenis.off('scroll', onScroll);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	return { scrollTo };
}
