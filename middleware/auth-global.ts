export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  await new Promise<void>((resolve) => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      resolve();
      authListener?.subscription.unsubscribe();
    });
    setTimeout(() => resolve(), 2000);
  });

  const publicRoutes = ['/', '/login', '/signup', '/catalogue-de-jeu', '/a-propos'];

  const isPublic = publicRoutes.some(route => {
    if (route === '/catalogue-de-jeu') {
      return to.path.startsWith('/catalogue-de-jeu');
    }
    return to.path === route;
  });

  console.log('[Middleware] to.path:', to.path, '| isPublic:', isPublic, '| user:', user.value);

  if (!isPublic && !user.value) {
    return navigateTo('/login');
  }

  if (user.value && to.path === '/login') {
    return navigateTo('/');
  }
});
