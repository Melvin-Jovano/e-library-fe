import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import HomeView from '../views/HomeView.vue';
import BookDetail from '../components/BookDetail.vue';
import InsertBook from '../components/InsertBook.vue';
import OrderView from '../views/OrderView.vue'
import UserOrderView from '../views/UserOrderView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user-order',
      name: 'user-order',
      component: UserOrderView,
      meta: {
        middleware: [checkSession, checkAdmin]
      }
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView,
      meta: {
        middleware: [checkSession]
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        middleware: [checkSession]
      }
    },
    {
      path: '/books/:bookId',
      name: 'details',
      component: BookDetail,
      props: true,
      meta: {
        middleware: [checkSession]
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        middleware: [checkSession]
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        middleware: [checkSession]
      }
    },
    {
      path: '/insertbook',
      name: 'insert',
      component: InsertBook,
      meta:{
        middleware: [checkSession]
      }
    }
  ]
});

function middlewarePipeline (context, middleware, index) {
  const nextMiddleware = middleware[index]

  if(!nextMiddleware){
      return context.next
  }

  return () => {
      const nextPipeline = middlewarePipeline(
          context, middleware, index + 1
      )

      nextMiddleware({ ...context, next: nextPipeline })

  }
}

function checkAdmin({to, from, next}) {
  const isAdmin = localStorage.getItem('role') === 'ADMIN';

  if(!isAdmin) {
    return next({name: 'home'});
  }

  return next();
}

function checkSession({to, from, next}) {
  const isAuthenticated = (localStorage.getItem('accessToken') !== null && localStorage.getItem('refreshToken') !== null);

  if(!isAuthenticated && to.name === 'register') {
    return next();
  }

  if(!isAuthenticated && (to.name !== 'login' || to.path === '/')) {
    return next({name: 'login'});
  }

  if(isAuthenticated && (to.name === 'register' || to.name === 'login')) {
    return next({name: 'home'});
  }

  return next();
}

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware || to.meta.middleware.length === 0) {
      return next()
  }

  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
  }

  return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1)
  })
});

export default router
