export default function getDeltaY(target: HTMLElement, container: HTMLElement): number {
  return target.getBoundingClientRect().top - container.getBoundingClientRect().top;
}
