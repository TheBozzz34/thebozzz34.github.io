function togglePopup() {
    const popup = document.getElementById('emailPopup');
    popup.classList.toggle('hidden');
  }

  async function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;

    const data = {
      email,
      firstName,
      lastName,
      unsubscribed: false,
      audienceId: "815ef301-2bd9-4974-8644-ba5ea1fc1503",
    };

    try {
      const response = await fetch('https://necrozma.xyz/api/add-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Thank you for signing up!');
        form.reset();
        togglePopup();
      } else {
        alert('Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  }