let settings = [
	{
		"domain": "https://raw.githubusercontent.com/",
		"original": "https://raw.githubusercontent.com/$1/$2/$3/$4",
		"replace": "https://github.com/$1/$2/blob/$3/$4"
	},
	{
		"domain": "https://www.google.com/search",
		"original": "https://www.google.com/$1",
		"replace": "https://search.brave.com/$1"
	},
	{
		"domain": "https://search.brave.com/",
		"original": "https://search.brave.com/$1",
		"replace": "https://www.google.com/$1"
	},
	{
		"domain": "https://www.youtube.com/shorts/",
		"original": "https://www.youtube.com/$1/$2",
		"replace": "https://www.youtube.com/watch?v=$2"
	}
]

document.addEventListener('DOMContentLoaded', () => {
	// Get the current tab
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const currentTab = tabs[0];

		// Get the current URL
		const url = currentTab.url;

		// Check if it matches any of the settings
		settings.forEach((setting) => {
			//check if url matches
			if (url.startsWith(setting.domain)) {
				
				//split url
				const parts = url.split('/').slice(3);

				//replace original with replace
				let newUrl = setting.replace;
				for (let i = 0; i < parts.length; i++) {
					newUrl = newUrl.replace('$' + (i + 1), parts[i]);
				}
				
				// Navigate to the converted URL
				chrome.tabs.update(currentTab.id, { url: newUrl });
			}
		});

		window.close();
	});
});

