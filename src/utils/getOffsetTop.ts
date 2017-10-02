export default function getOffsetTop(el: HTMLElement): number {
  let self = el;
  let offsetTop = 0;
  while (self) {
    offsetTop += self.offsetTop;
    self = self.offsetParent as HTMLElement;
  }
  return offsetTop;
}
