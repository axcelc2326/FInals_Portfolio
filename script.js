$(document).ready(function() {
    // Toggle Fun Facts
    $("#toggleFunFacts").click(function() {
      $("#funFacts").slideToggle();
    });
  
    // List of quotes (Updated)
    const quotes = [
      "Stay hungry, stay foolish.",
      "The only limit to our realization of tomorrow is our doubts of today.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "Dream big and dare to fail.",
      "Your time is limited, so don’t waste it living someone else’s life."
    ];
  
    // Random Quote Button (Updated)
    $("#randomQuote").click(function() {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
      // Fade out the old quote, then fade in the new quote
      $("#selectedQuote").fadeOut(300, function() {
        $(this).text(randomQuote).fadeIn(300);
      });
    });
  
    // Initialize Datepicker
    $("#datepicker").datepicker();
  
    // Contact Form Validation
    $("#contactForm").submit(function(e) {
      e.preventDefault();
  
      const name = $("#name").val().trim();
      const email = $("#email").val().trim();
      const message = $("#message").val().trim();
  
      if (name === "" || email === "" || message === "") {
        alert("Please fill out all fields.");
        return;
      }
  
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      // Show success message
      $("#formSuccess").fadeIn().delay(2000).fadeOut();
      
      // Clear form
      $(this).trigger("reset");
    });
  
    // Fetch GitHub API
    $("#fetchGithub").click(function() {
      $.ajax({
        url: "https://api.github.com/users/axcelc2326",
        method: "GET",
        success: function(data) {
          $("#githubData").html(`
            <h3>${data.name}</h3>
            <img src="${data.avatar_url}" alt="GitHub Avatar" style="width:100px; border-radius:50%;">
            <p><strong>Username:</strong> ${data.login}</p>
            <p><strong>Bio:</strong> ${data.bio || 'No bio available.'}</p>
            <p><strong>Public Repos:</strong> ${data.public_repos}</p>
            <p><a href="${data.html_url}" target="_blank">View Profile</a></p>
          `);
        },
        error: function() {
          $("#githubData").html("<p>Failed to load GitHub profile.</p>");
        }
      });
    });
  
    // Initialize Accordion
    $("#accordion").accordion();
  });
  
  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  