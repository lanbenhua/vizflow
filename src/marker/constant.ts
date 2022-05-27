export const createCustomMarker = (linkId: string, markerId = '#arrow') => `
svg.shopee-v-svg ${linkId} path.shopee-v-link:not(.invisible-link) {
  marker-end: url(${markerId});
}
`;

export const getMarkerStyleId = (id: string) => ({
  styleId: `style_${id}`,
  styleDomId: `#style_${id}`,
  markerId: `marker_${id}`,
  markerDomId: `#marker_${id}`,
});
