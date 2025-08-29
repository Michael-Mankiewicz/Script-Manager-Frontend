to run type:

npm run dev

Then, click on the hyperlink in the terminal to open up the frontend of the application in the browser.

to debug:

The program will work fully after the backend is also running. Clicking submit after the cartonfile and fedex invoice is uploaded will download a zipfile in the browser with all generated address correction invoices. If the file is extremely small it often means no invoices were generated, which means there was an error in the backend. Look at the backend github's readme to debug that - it almost always means that the columns indices for the fedex invoice were incorrect and all need to be adjusted by 1.

