export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const loading = useSupabaseClient().auth.onAuthStateChange

  const publicRoutes = ['/', '/login', '/signup', '/catalogue-de-jeu', '/catalogue-de-jeu/']

  const isPublic = publicRoutes.some(route => to.path.startsWith(route))

  if (!isPublic && !user.value) {
    return navigateTo('/login')
  }

  if (user.value && to.path === '/login') {
    return navigateTo('/')
  }
})
