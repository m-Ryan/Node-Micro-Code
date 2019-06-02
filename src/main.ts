import Koa from 'Koa';
import router from './controller/router';
const app = new Koa();
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, function() {
	console.log('服务器已开启...');
});
