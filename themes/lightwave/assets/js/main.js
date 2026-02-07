document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Timeline Progress Logic
    const timeline = document.querySelector('.preset-timeline');
    const timelineList = document.querySelector('.preset-timeline ol');
    const timelineItems = document.querySelectorAll('.preset-timeline li');

    if (timeline && timelineList) {
        window.addEventListener('scroll', () => {
            const rect = timelineList.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            // Calculate progress relative to the list bounds
            const scrollStart = viewHeight * 0.5;
            let progress = (scrollStart - rect.top) / rect.height;
            progress = Math.max(0, Math.min(1, progress));

            timelineList.style.setProperty('--timeline-progress', `${progress * 100}%`);

            // Activate markers
            timelineItems.forEach((item) => {
                const itemRect = item.getBoundingClientRect();
                if (itemRect.top < viewHeight * 0.6) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }
});
