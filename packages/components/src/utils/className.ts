export const addClassName = (el: HTMLElement, names: string[]) => {
  if(!el || !names || names.length < 1) return
  el.classList.add(names.join(','));
}

export const removeClassName = (el: HTMLElement, names: string[]) => {
  if(!el || !names || names.length < 1) return
  el.classList.remove(names.join(','));
}