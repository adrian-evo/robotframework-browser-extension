// Return a list with default Playwright download path and name and the suggested browser filename
// e.g. ['c:\\mydownloadpath\\add58fc7-465e-423e-877c-a63da4e1ba55', 'suggestedfilename.pdf']
async function waitForDownloadWithFilename(page) {
	const [ download ] = await Promise.all([
  		page.waitForEvent('download'),
	]);
	const path = await download.path();
	const expectedName = await download.suggestedFilename();
	return [path, expectedName]
}
exports.__esModule = true;
exports.waitForDownloadWithFilename = waitForDownloadWithFilename;
