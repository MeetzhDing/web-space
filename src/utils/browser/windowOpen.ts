const strWindowName = 'noopener,noreferrer';

export function windowOpen(url: string, target = '_blank') {
  window.open(url, target, strWindowName);
}
