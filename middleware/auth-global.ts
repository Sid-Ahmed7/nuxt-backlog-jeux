export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  const publicRoutes = ['/', '/login', '/signup', '/a-propos']
  const isCataloguePublic = to.path.startsWith('/catalogue-de-jeu')
  const isPublic = isCataloguePublic || publicRoutes.includes(to.path)

  if (!isPublic && !authStore.user) {
    return navigateTo('/login')
  }

  if (authStore.user && to.path === '/login') {
    return navigateTo('/')
  }
})
