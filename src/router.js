import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/authentication",
      name: "authentication",
      component: () =>
        import(
          /* webpackChunkName: "authentication" */ "./views/Authentication.vue"
        ),
    },
    {
      path: "/todos",
      name: "todos",
      component: () =>
        import(/* webpackChunkName: "todos" */ "./views/Todos.vue"),
    },
    {
      path: "/private-notes",
      name: "private-notes",
      component: () =>
        import(
          /* webpackChunkName: "private-notes" */ "./views/PrivateNotes.vue"
        ),
    },
  ],
});
