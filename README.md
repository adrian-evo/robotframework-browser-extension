# robotframework-browser-extension
Extend Browser library with new custom keywords, as explained on [Browser](https://github.com/MarketSquare/robotframework-browser) project page.

- `Wait For Download With Filename`

By default, the keyword `Wait For Download` from Browser library is downloading the file
with a GUID name, as opposed with manual download when the filename is suggested by the browser.

- `Wait For Navigation  Url  [timeout  [waitUntil]]`

Implement Wait for navigation function that is missing from Browser library and available in Playwright
Optional arguments: Url (absolute path or RegExp between slashes, e.g. /.*signin.*/), timeout, waitUntil

- `Go To Document  Url`

Go To an Url that just return a downloaded file instead of loading a page. Original keyword is failing with ERR_ABORTED in such case.
Can be combined with the above keyword to get downloaded filename.

download.robot file contains test cases that exemplifies the usage of the above custom keywords.
