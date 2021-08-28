export default function pipeline(context, middleware, index) {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) {
    return context.next;
  }
  return () => {
    nextMiddleware({
      ...context,
      next: pipeline(context, middleware, index + 1),
    });
  };
}
