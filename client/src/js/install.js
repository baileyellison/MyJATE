const butInstall = document.getElementById('buttonInstall');

// Store the event for the beforeinstallprompt event
let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-info bar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the butInstall element
butInstall.addEventListener('click', async () => {
  // Hide the install button
  butInstall.style.display = 'none';
  // Show the install prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  }
});

// Add a handler for the appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('App was installed successfully');
});
