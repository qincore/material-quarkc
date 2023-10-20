export const queryParentNode = (el: string | HTMLElement): HTMLElement => {
  if (el instanceof HTMLElement) {
    const p = el.parentNode;
    if (p instanceof ShadowRoot) {
      return p.host.parentNode as HTMLElement;
    }
    return p as HTMLElement;
  }

  if (typeof el === "string") {
    const e = document.querySelector(el);
    return e.parentNode as HTMLElement;
  }

  return;
};