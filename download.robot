*** Settings ***
Library         Browser  jsextension=${CURDIR}/download.js
Library         String
Library         OperatingSystem

*** Test Cases ***
Download Suggested Filename
    New Browser    chromium     headless=false    downloadsPath=${CURDIR}
    New Context    acceptDownloads=True
    New Page       https://mypage.withdownloads


    # This will return a list with the default Playwright filename which is a GUID name, 
    # and the real file name as proposed by the browser when doing manual download.
    # e.g. ['c:\\mydownloadpath\\add58fc7-465e-423e-877c-a63da4e1ba55', 'suggestedfilename.pdf']
    # Then rename the downloaded file with Move File keyword. 
    ${dl_promise}    Promise To  Wait For Download With Filename
    Click            \#file_download
    ${file_path}=    Wait For  ${dl_promise}
    
    ${path}  Get Regexp Matches  ${file_path}[0]  .*\\\\
    Move File    ${file_path}[0]  ${path}[0]${file_path}[1]


Wait For Navigation Sample
    New Browser    chromium     headless=false
    New Context
    New Page       https://www.google.com

    Click  //iframe[contains(@src,'consent')] >>> text=I agree
    Click  text=Sign in
    
    # Wait until page containing signin substring is navigated to
    Wait For Navigation  /.*signin.*/  5000  load


Go To Document And Download
    New Browser    chromium     headless=false    downloadsPath=${CURDIR}
    New Context    acceptDownloads=True
    New Page
    
    Prepare For Download
    
    # Go To a page that will just download a document instead of navigating to a new page
    Go To Document  https://mypage.withdirectdownloads
    ${filename}    wait for file to download
    Should Match Regexp  ${filename}  expectedpartoffilename.*\\.pdf


*** Keywords ***
Prepare For Download
    ${dl_promise}    Promise To  Wait For Download With Filename
    Set Test Variable  ${DL_PROMISE}  ${dl_promise}

Wait For File To Download
    [Return]    ${file_path}[1]
    ${dl_promise}    Get Variable Value  ${DL_PROMISE}
    ${file_path}=    Wait For  ${dl_promise}
    ${path}  Get Regexp Matches  ${file_path}[0]  .*\\\\
    Move File    ${file_path}[0]  ${path}[0]${file_path}[1]
