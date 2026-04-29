const base = import.meta.env.BASE_URL;

export const logo = {
  svg:   `${base}logo/jayne-bou-audio-logo.svg`,
  png:   `${base}logo/jayne-bou-audio-logo.png`,
  white: `${base}logo/jayne-bou-audio-logo-white.png`,
  mark:  `${base}logo/jayne-bou-audio-mark.png`,
};

export const jayne = {
  default:       `${base}jayne/jayne-1.png`,
  expressive:    `${base}jayne/jayne-2.png`,
  guide:         `${base}jayne/jayne-3.png`,
  trust:         `${base}jayne/jayne-4.png`,
  tech:          `${base}jayne/jayne-5.png`,
  teacher:       `${base}jayne/jayne-3.png`,
  heroListening: `${base}jayne/jayne-1.png`,
  packing:       `${base}jayne/jayne-2.png`,
  contact:       `${base}jayne/jayne-4.png`,
  anim: {
    blink:  `${base}jayne/anim/jayne-blink.gif`,
    point:  `${base}jayne/anim/jayne-point.gif`,
    listen: `${base}jayne/anim/jayne-listen.gif`,
  },
};

export const products = {
  p01: `${base}products/product-01.jpg`,
  p02: `${base}products/product-02.jpg`,
  p03: `${base}products/product-03.jpg`,
  p04: `${base}products/product-04.jpg`,
  p05: `${base}products/product-05.jpg`,
  p06: `${base}products/product-06.jpg`,
};

export const images = {
  learnWatts:          `${base}images/learn-watts.jpg`,
  learnActiveVsPassive:`${base}images/learn-active-vs-passive.jpg`,
  learnValveVsTransistor:`${base}images/learn-valve-vs-transistor.jpg`,
  learnWarmVsBright:   `${base}images/learn-warm-vs-bright.jpg`,
  aboutHero:           `${base}images/about-hero.webp`,
  shippingPackaging:   `${base}images/shipping-packaging.jpg`,
  videoPlaceholder:    `${base}images/video-placeholder.jpg`,
};
