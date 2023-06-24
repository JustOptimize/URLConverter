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
	},
	{
		"domain": "https://tracking.tldrnewsletter.com/CL0/",
		"original": "https://tracking.tldrnewsletter.com/CL0/$1",
		"replace": "$1"
	}
]

document.addEventListener('DOMContentLoaded', () => {
	// Get the current tab
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		
		// Get the current URL
		const currentTab = tabs[0];
		const currentTabUrl = currentTab.url;
		
		settings.forEach((setting) => {

			// Check if the current URL starts with the setting.domain
			if (!currentTabUrl.startsWith(setting.domain)) {
				return;
			}
		
			// Split setting.original by /
			const originalParts = setting.original.split('/');
			const currentTabUrlParts = currentTabUrl.split('/');

			let newUrl = setting.replace;
			for (let i = 0; i < originalParts.length; i++) {
				if (originalParts[i].startsWith('$')) {
					let part;
					// If last part, get all remaining parts
					if (i === originalParts.length - 1) {
						part = currentTabUrlParts.slice(i).join('/');
					} else {
						part = currentTabUrlParts[i];
					}

					newUrl = newUrl.replace(originalParts[i], part);
				}
			}

			// Navigate to the converted URL
			chrome.tabs.update(currentTab.id, { url: newUrl });
		});

		window.close();
	});
});
