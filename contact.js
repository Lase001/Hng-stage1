document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  // Reset errors
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  let valid = true;

  // Validation
  if (!name) {
    document.getElementById('test-contact-error-name').textContent = 'Full name is required.';
    valid = false;
  }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    document.getElementById('test-contact-error-email').textContent = 'Please enter a valid email address.';
    valid = false;
  }
  if (!subject) {
    document.getElementById('test-contact-error-subject').textContent = 'Subject is required.';
    valid = false;
  }
  if (message.length < 10) {
    document.getElementById('test-contact-error-message').textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (!valid) return;

  // Submit to Formspree
  const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    form.reset();
    const success = document.getElementById('success-message');
    success.hidden = false;
    setTimeout(() => success.hidden = true, 5000);
  } else {
    alert('Something went wrong. Please try again later.');
  }
});