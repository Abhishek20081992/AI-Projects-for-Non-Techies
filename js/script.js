```javascript
// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    // Get the modal and the button that opens it
    const modal = document.getElementById('downloadModal');
    const downloadBtn = document.getElementById('download-script-btn');
    const closeBtn = document.getElementsByClassName('close-button')[0];
    const downloadForm = document.getElementById('downloadForm');
    const downloadLink = document.getElementById('actualDownloadLink'); // Hidden link for download

    if (downloadBtn) {
        downloadBtn.onclick = () => {
            modal.style.display = 'flex'; // Use flex to center the modal
        };
    }

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            downloadForm.reset(); // Reset form on close
        };
    }

    // Close the modal if user clicks outside of it
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            downloadForm.reset(); // Reset form on outside click
        }
    };

    if (downloadForm) {
        downloadForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const form = event.target;
            const formData = new FormData(form);

            // You will get this URL from Formspree.io after setting up your form.
            // IMPORTANT: REPLACE THIS WITH YOUR ACTUAL FORMSPREE ENDPOINT URL!
            const formspreeEndpoint = "YOUR_FORMSPREE_ENDPOINT_HERE"; 

            try {
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Thanks for your interest! Your download will start shortly.');
                    modal.style.display = 'none'; // Hide the modal

                    // Trigger the download
                    // IMPORTANT: Ensure this URL points to your PDF in the resources folder on GitHub
                    const fileUrl = '/resources/gmail-cleaner-script.pdf'; 
                    downloadLink.href = fileUrl;
                    downloadLink.click(); // Programmatically click the hidden link
                    
                    form.reset(); // Clear the form
                } else {
                    alert('Oops! There was a problem submitting your form. Please try again.');
                    console.error('Formspree submission error:', response.status, response.statusText);
                }
            } catch (error) {
                alert('An error occurred. Please check your internet connection and try again.');
                console.error('Network error during form submission:', error);
            }
        });
    }
});

