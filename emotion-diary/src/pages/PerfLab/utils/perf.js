export function domNodeCount() {
  return document.getElementsByTagName("*").length;
}

export function raf2() {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(res);
    });
  });
}
