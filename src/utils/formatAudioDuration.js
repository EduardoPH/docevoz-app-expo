export function formatAudioDuration({ uri, currentDuration, duration }) {
  const _duration =
    (uri && currentDuration > 0 ? currentDuration : duration) *
    0.001;

  let m = Math.floor(_duration / 60);
  let s = Math.floor(_duration % 60);

  if (m > 60) {
    let h = Math.floor(m / 60);
    m = m - 60 * h;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
      s
    ).padStart(2, "0")}`;
  }

  return `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
