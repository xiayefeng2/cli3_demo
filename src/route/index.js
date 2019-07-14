import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import utils from '@/utils'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			components: {
				default: Home,
				head: () => import('@/views/TopHeader.vue'),
				'left-nav': () => import('@/views/LeftNav.vue')
			}
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			components: {
				default: () =>
					import(/* webpackChunkName: "about" */ '@/views/About.vue')
			}
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/login.vue')
		},
		{
			path: '/table',
			name: 'table',
			component: () => import('@/views/Table.vue')
		}
	]
})
router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requiresAuth)) {
		const token = utils.cookies.get('token')
		if (token && token !== 'undefined') {
			next()
		} else {
			next({
				name: 'login'
			})
		}
	} else {
		next()
	}
})

router.afterEach((to, from) => {
	if (to.meta.title) {
		utils.title(to.meta.title)
	}
})

export default router
