export class TimeSystem {
  format(seconds) {
    const safe = Math.max(0, seconds);
    const minutes = Math.floor(safe / 60);
    const rest = (safe % 60).toFixed(2).padStart(5, '0');
    return `${minutes}:${rest}`;
  }
}
