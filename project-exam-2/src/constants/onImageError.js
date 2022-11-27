const image = "/profile.jpg";
const banner = "/banner.jpg";

export const onImageError = (e) => {
  e.target.src = image;
};

export const onBannerError = (e) => {
  e.target.src = banner;
};
