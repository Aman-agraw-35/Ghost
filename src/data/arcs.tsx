export const arcsData = [...Array(30).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: ['red', 'orange', 'yellow', 'lime', 'cyan', 'blue', 'purple'][Math.floor(Math.random() * 7)],
}));
