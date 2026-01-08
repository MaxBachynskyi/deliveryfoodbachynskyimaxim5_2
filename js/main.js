const authButton = document.querySelector('.button-auth');
const logoutButton = document.querySelector('.button-out');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.getElementById('logInForm');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const userName = document.querySelector('.user-name');

const openAuthModal = () => {
  if (modalAuth) modalAuth.classList.add('is-open');
  window.disableScroll();
};

const closeAuthModal = () => {
  if (modalAuth){
    modalAuth.classList.remove('is-open');
    loginInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');
    window.enableScroll();
  }
};

function authorizedUser(username) {
  if (userName) {
    userName.textContent = username;
    userName.style.display = 'inline';
  }
  if (authButton) authButton.style.display = 'none';
  if (logoutButton) logoutButton.style.display = 'flex';
}

function notAuthorizedUser() {
  if (userName) userName.textContent = '';
  if (authButton) authButton.style.display = 'flex';
  if (logoutButton) logoutButton.style.display = 'none';
}

function toggleModalAuth(){
  modalAuth.classList.toggle('is-open');
}

window.disableScroll = function(){
  document.body.dbScrollY = window.scrollY;
  document.body.style.cssText=`
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    overflow: hidden;
    heigh: 100vh;
  `;
}

window.enableScroll = function(){
  document.body.style.cssText = '';
  window.scroll({top: document.body.dbScrollY})
}

if (authButton) authButton.addEventListener('click', openAuthModal);
if (closeAuth) closeAuth.addEventListener('click', closeAuthModal);

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const login = loginInput?.value.trim();
    const password = passwordInput?.value.trim();

    if (!login) {
      loginInput.classList.add('input-error');
      loginInput.focus();
      return;
    }

    if (!password){
      passwordInput.classList.add('input-error');
      passwordInput.focus();
      return;
    }

    loginInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');

    localStorage.setItem('user', login);
    authorizedUser(login);
    closeAuthModal();
    loginForm.reset();
  });
}

if (loginInput) {
  loginInput.addEventListener('input', () => {
    loginInput.classList.remove('input-error');
  });
}
if (passwordInput) {
  passwordInput.addEventListener('input', () => {
    passwordInput.classList.remove('input-error');
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    notAuthorizedUser();
  });
}

if(modalAuth){
  modalAuth.addEventListener('click', function(event){
  if(event.target.classList.contains('is-open')){
    toggleModalAuth();
    loginInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');
    window.enableScroll();
  }
});
}

const savedUser = localStorage.getItem('user');

if (savedUser) {
  authorizedUser(savedUser);
} else {
  notAuthorizedUser();
}

