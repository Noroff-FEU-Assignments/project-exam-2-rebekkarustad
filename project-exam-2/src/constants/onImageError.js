const placeholderImage =
  "https://images.unsplash.com/photo-1605214101860-84e51cf4c0db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

export const onImageError = (e) => {
  e.target.src = placeholderImage;
};
