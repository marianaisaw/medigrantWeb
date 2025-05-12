// Smooth scroll for anchor links

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSvthNx1tDIxxio0FdhLDAEf7_OBnCwMA",
    authDomain: "medigrants.firebaseapp.com",
    databaseURL: "https://medigrants.firebaseio.com",
    projectId: "medigrants",
    storageBucket: "medigrants.firebasestorage.app",
    messagingSenderId: "1009855688798",
    appId: "1:1009855688798:web:2231100e8149b847a404cf"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(app);
  
  // Listen for a submit
  document.querySelector(".mg-contact-form").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    //   Get input Values
    let name = document.getElementById("name").value;
    let organization = document.getElementById("organization").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("intended-use").value;
    console.log(name, organization, email, message);
  
    // Save to Firestore
    db.collection("infos").add({
      name: name,
      organization: organization,
      email: email,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      document.querySelector(".mg-contact-form").reset();
      alert("Thank you! Your info has been submitted.");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
  }

// Handle Solutions button active state
document.addEventListener('DOMContentLoaded', function() {
  const solutionsBtn = document.querySelector('.mg-solutions-btn');
  const currentPage = window.location.pathname.split('/').pop();
  
  // Set initial state based on current page
  if (currentPage === 'index.html' || currentPage === '') {
    solutionsBtn.classList.add('active');
  }

  // Handle click on Solutions button
  solutionsBtn.addEventListener('click', function(e) {
    if (currentPage === 'index.html' || currentPage === '') {
      e.preventDefault(); // Prevent navigation if already on Solutions page
    }
    solutionsBtn.classList.add('active');
  });

  // Remove active state when clicking other navigation links
  document.querySelectorAll('.mg-nav-link:not(.mg-solutions-btn)').forEach(link => {
    link.addEventListener('click', function() {
      solutionsBtn.classList.remove('active');
    });
  });
});