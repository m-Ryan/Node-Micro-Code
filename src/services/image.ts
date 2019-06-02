import fs from 'fs-extra';
import path from 'path';
import baseRouter from '../controller/baseRouter';
import gm from 'gm';
const cwd = process.cwd();
const staticPath = path.join(cwd, 'public');

baseRouter.get('/get-image', async function(ctx, next) {
	const pdfBgPath = path.join(staticPath, 'pdf-bg.png');
	const qrcodePath = path.join(staticPath, 'qrcode.png');

	await callbackToPromise((resolve, reject) =>
		gm('')
			.in('-page', '+0+0')
			.in(pdfBgPath)
			.in('-page', '+265+380')
			.in(qrcodePath)
			.mosaic()
			.write(path.join(staticPath, 'output.png'), (err) => (err ? reject(err) : resolve()))
	);
	ctx.body = '已合成图片';
});

function callbackToPromise(fn) {
	return new Promise((resolve, reject) => fn(resolve, reject));
}
