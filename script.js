console.log('Popup loaded');
document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM loaded');
	// Get the current tab
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const currentTab = tabs[0];
		// Get the current URL
		const url = currentTab.url;
		// Check if the URL is a raw.githubusercontent.com URL
		if (url.startsWith('https://raw.githubusercontent.com/')) {
			const parts = url.split('/').slice(3);
			const username = parts[0]
			const repoName = parts[1]
			const branch = parts[2]
			const path = parts.slice(3).join('/');

			const githubUrl = `https://github.com/${username}/${repoName}/blob/${branch}/${path}`;
			// Navigate to the converted URL
			chrome.tabs.update(currentTab.id, { url: githubUrl });
		}
		window.close();
	});
});

