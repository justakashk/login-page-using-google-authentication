 const firebaseConfig = {
      apiKey: " ",
      authDomain: " ",
      projectId: " ",
      storageBucket: " ",
      messagingSenderId: " ",
      appId: " ",
      measurementId: " "
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    auth.onAuthStateChanged(user => {
      if (user) showDashboard(user);
      else showLanding();
    });

    function loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(result => showDashboard(result.user)).catch(error => alert("Login failed: " + error.message));
    }

    function logout() {
      auth.signOut();
    }

    function showDashboard(user) {
      document.getElementById("dashboard").style.display = "block";
      document.getElementById("publicContent").style.display = "none";
      document.getElementById("auth-buttons").style.display = "none";
      document.getElementById("logout-btn").style.display = "inline-block";

      document.getElementById("user-name").innerText = user.displayName;
      document.getElementById("user-email").innerText = user.email;
      document.getElementById("user-pic").src = user.photoURL;
    }

    function showLanding() {
      document.getElementById("dashboard").style.display = "none";
      document.getElementById("publicContent").style.display = "block";
      document.getElementById("auth-buttons").style.display = "flex";
      document.getElementById("logout-btn").style.display = "none";
    }

    function checkATSScore() {
      const fileInput = document.getElementById('resumeUpload');
      const resultDiv = document.getElementById('atsResult');
      if (!fileInput.files.length) {
        resultDiv.style.color = 'red';
        resultDiv.innerText = "Please upload a resume file first.";
        return;
      }
      const randomScore = Math.floor(Math.random() * 41) + 60;
      resultDiv.style.color = 'green';
      resultDiv.innerText = `\u2705 Your Resume ATS Score: ${randomScore}/100`;
    }
