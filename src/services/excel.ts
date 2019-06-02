import XLSX from 'xlsx';
import fs from 'fs-extra';
import path from 'path';
import baseRouter from '../controller/baseRouter';
const cwd = process.cwd();
baseRouter.get('/get-excel', function(ctx, next) {
	const buf = fs.readFileSync(path.join(cwd, 'public', 'test.xlsx'));
	const workbook = XLSX.read(buf, { type: 'buffer' });
	const sheet = workbook.Sheets[workbook.SheetNames[0]];
	const data = XLSX.utils.sheet_to_json(sheet).filter((item: { [key: string]: string }) => {
		for (let key in item) {
			if (/EMPTY/.test(key)) {
				delete item[key];
			}
		}
		return item;
	});
	ctx.body = data;
});

baseRouter.get('/write-excel', async function(ctx, next) {
	const data = await fs.readJson(path.join(cwd, 'public', 'test.json'));
	const sheet = XLSX.utils.json_to_sheet(data);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, sheet, 'sheet1');
	XLSX.writeFile(workbook, path.join(cwd, 'public', 'output.xlsx'));
	ctx.body = '写入excel成功';
});
