export default function isScrolledToElement(target: HTMLElement, container?: HTMLElement): boolean {
  const { top, bottom } = target.getBoundingClientRect();
  if (!container) {
    return Math.floor(top) * Math.floor(bottom - 1) <= 0;
  }

  const containerTop = container.getBoundingClientRect().top;
  return Math.floor(top - containerTop) * Math.floor(bottom - containerTop - 1) <= 0;
}
