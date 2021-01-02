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
// Wait for navigation function that is missing from Browser library and available in Playwright
// Optional arguments: Url (absolute path or RegExp between shashes, e.g. /.*signin.*/), timeout, waitUntil
async function waitForNavigation(page, args, logger) {
	var callWait = 0;
	if (args[0] !== undefined) {
		if (args[0].charAt() == '/' )
			var re = new RegExp(args[0], 'i');
		else
			var re = args[0];
		logger('Url: ' + args[0]);
		callWait = 1;
	}
	if (args[1] !== undefined) {
		logger('Timeout: ' + args[1]);
		tm = parseInt(args[1]);
		callWait = 2
	}
	if (args[2] !== undefined) {
		logger('WaitUntil: ' + args[2]);
		callWait = 3
	}
	switch(callWait) {
		case 1:
    		await page.waitForNavigation({
	    		url: re,
    		});
			break;
		case 2:
    		await page.waitForNavigation({
	    		url: re,
				timeout: tm,
    		});
			break;
		case 3:
    		await page.waitForNavigation({
	    		url: re,
				timeout: tm,
				waitUntil: args[2],
    		});
			break;
		default:
			await page.waitForNavigation();
	}
	return await page.title();
}
// Go To an Url that just return a downloaded file instead of loading a page. Original keywors is failing with ERR_ABORTED in such case.
// Can be combined with the above keyword to get downloaded filename.
async function goToDocument(page, args, logger) {
	try {
		await page.goto(args[0],{
			waitUntil: 'networkidle',  
		});
	}
	catch (ERR_ABORTED) {
		logger('Catch ERR_ABORTED')
	}
	return await page.title();
}
exports.__esModule = true;
exports.waitForDownloadWithFilename = waitForDownloadWithFilename;
exports.waitForNavigation = waitForNavigation;
exports.goToDocument = goToDocument;
