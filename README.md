# robotframework-browser-extension
Extend Browser library with a new "Wait For Download With Filename" keyword

By default, the keyword "Wait For Download" from Browser library is downloading the file
with a GUID name, as opposed with manual download when the filename is suggested by the browser.

This is a sample keyword in Javascript, that will extend Browser library as explained on [Browser](https://marketsquare.github.io/robotframework-browser) project page.

download.js

```JavaScript
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
```

download.robot

```RobotFramework
*** Settings ***
Library         Browser  jsextension=${CURDIR}/download.js
Library         String
Library         OperatingSystem
Library         Dialogs

*** Test Cases ***
Download Suggested Filename
    New Browser    chromium     headless=false    downloadsPath=${CURDIR}
    New Context    acceptDownloads=True
    New Page       https://mypage.withdownloads

    ${dl_promise}    Promise To  Wait For Download With Filename
    Click            \#file_download
    ${file_path}=    Wait For  ${dl_promise}
    
    ${path}  Get Regexp Matches  ${file_path}[0]  .*\\\\
    Move File    ${file_path}[0]  ${path}[0]${file_path}[1]
