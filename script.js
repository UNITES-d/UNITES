// UNITES website interactions
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Project gallery category filters
const filters = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  projectCards.forEach(card => {
    card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none';
  });
}));

// Appointment requests are prepared as an email. Set the real company email below.
const UNITES_EMAIL = 'unites.gh@gmail.com';
document.getElementById('booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const body = [
    'Appointment request for UNITES',
    `Name: ${form.get('name')}`,
    `Phone: ${form.get('phone')}`,
    `Email: ${form.get('email') || 'Not provided'}`,
    `Service: ${form.get('service')}`,
    `Preferred date: ${form.get('date') || 'Flexible'}`,
    `Project details: ${form.get('details') || 'Not provided'}`
  ].join('\\n');
  if (!UNITES_EMAIL || UNITES_EMAIL === 'YOUR_EMAIL_HERE') {
    document.getElementById('form-message').textContent = 'Thanks! The form is ready, but UNITES must add its real email address in script.js before requests can be sent.';
    return;
  }
  window.location.href = `mailto:${UNITES_EMAIL}?subject=${encodeURIComponent('UNITES appointment request')}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-message').textContent = 'Your email app should open with the appointment request. Please send the email to complete your request.';
});

// Website assistant: starter FAQ assistant (not connected to a live AI service yet).
const chatPanel = document.getElementById('chat-panel');
const chatLauncher = document.getElementById('chat-launcher');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-text');
function toggleChat(open) {
  chatPanel.classList.toggle('open', open);
  chatPanel.setAttribute('aria-hidden', String(!open));
  if (open) chatInput.focus();
}
chatLauncher.addEventListener('click', () => toggleChat(!chatPanel.classList.contains('open')));
document.getElementById('chat-close').addEventListener('click', () => toggleChat(false));
function addMessage(text, type) {
  const node = document.createElement('div');
  node.className = type === 'user' ? 'user-message' : 'bot-message';
  node.textContent = text;
  chatMessages.appendChild(node);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function answerFor(question) {
  const q = question.toLowerCase();
  if (q.includes('service') || q.includes('do you do') || q.includes('offer')) return 'UNITES specializes in plasterboard ceilings, POP ceilings, acoustic ceilings, interior and exterior painting, and wall preparation. Which service are you interested in?';
  if (q.includes('appointment') || q.includes('book') || q.includes('visit')) return 'You can use the Book an Appointment form on this page. Share your contact details, the service you need and your preferred date. UNITES can then contact you to confirm.';
  if (q.includes('quote') || q.includes('quotation') || q.includes('price') || q.includes('cost')) return 'We can help you make a quotation request. Please share the type of work, approximate room or project size, location and a contact number using the appointment form. The UNITES team will follow up.';
  if (q.includes('paint')) return 'UNITES offers interior and exterior painting, including wall preparation for a neat finish. You can book a consultation to discuss your space and preferred finish.';
  if (q.includes('ceiling') || q.includes('pop') || q.includes('acoustic') || q.includes('plaster')) return 'UNITES works on plasterboard, POP and acoustic ceilings. Use the appointment form to tell us about the room, design and project location.';
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('whatsapp')) return 'The company contact details will appear here once UNITES provides its phone number, WhatsApp number and email address.';
  return 'Thanks for your question! I can help with UNITES ceiling services, painting, wall preparation, quotations and appointments. You can also send your enquiry through the appointment form.';
}
function sendChat(question) {
  const clean = question.trim();
  if (!clean) return;
  addMessage(clean, 'user');
  chatInput.value = '';
  window.setTimeout(() => addMessage(answerFor(clean), 'bot'), 250);
}
document.getElementById('chat-form').addEventListener('submit', event => {
  event.preventDefault(); sendChat(chatInput.value);
});
document.querySelectorAll('.quick-questions button').forEach(button => button.addEventListener('click', () => sendChat(button.dataset.question)));
