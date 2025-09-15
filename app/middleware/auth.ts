export default defineNuxtRouteMiddleware((to, _) => {
  const { user } = useUserStore();
  if (to.path !== "/login") {
    if (!user.token) {
      return navigateTo("/login", { replace: true });
    }
  } else if (to.path === "/login" && user.token) {
    return navigateTo("/", { replace: true });
  }
});
