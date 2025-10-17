import { useEffect } from 'react';

const use3DTilt = (selector = '.tilt-wrapper') => {
  useEffect(() => {
    const wrappers = document.querySelectorAll(selector);
    const listeners = [];
    wrappers.forEach(wrapper => {
      const card = wrapper.querySelector('.tilt');
      if (!card) return;

      const MouseEnter = e => {
        const { left, top, width, height } = wrapper.getBoundingClientRect();
        if (card.classList.contains('animate-hovering')) {
          card.classList.remove('animate-hovering');
        }

        const x = e.clientX - left;
        const y = e.clientY - top;

        const centeredX = x / width - 0.5;
        const centeredY = y / height - 0.5;

        const rotateX = Math.max(Math.min(centeredY * -20, 20), -20);
        const rotateY = Math.max(Math.min(centeredX * -20, 20), -20);

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };

      const MouseLeave = () => {
        if (card.dataset.tiltAnimate === 'true') {
          setTimeout(() => {
            card.classList.add('animate-hovering');
          }, 300);
        }
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        card.style.transition = `transform 0.3s ,box-shadow 0.3s ease-in-out`;

        setTimeout(() => {
          card.style.transition = ` border 0.3s, box-shadow 0.3s ease-in-out`;
        }, 300);
      };

      wrapper.addEventListener('mousemove', MouseEnter);
      wrapper.addEventListener('mouseleave', MouseLeave);
      listeners.push({ wrapper, MouseEnter, MouseLeave });
    });

    return () => {
      listeners.forEach(({ wrapper, MouseEnter, MouseLeave }) => {
        wrapper.removeEventListener('mousemove', MouseEnter);
        wrapper.removeEventListener('mouseleave', MouseLeave);
      });
    };
  }, [selector, location.pathname]);
};

export default use3DTilt;
