import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]) {
	const [active, setActive] = useState(sectionIds[0] ?? '');

	useEffect(() => {
		const sections = sectionIds
			.map((id) => document.getElementById(id))
			.filter((section): section is HTMLElement => section !== null);
		if (!sections.length) return;
		const observer = new IntersectionObserver((entries) => {
			const visible = entries
				.filter((entry) => entry.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (visible) setActive(visible.target.id);
		}, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.3, 0.6] });
		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, [sectionIds]);

	return active;
}
