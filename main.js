// Main JavaScript for FlaskApp Pro

// Import Bootstrap
const bootstrap = window.bootstrap

document.addEventListener("DOMContentLoaded", () => {
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Form validation and submission
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        // Add loading state to submit button
        const submitBtn = form.querySelector('button[type="submit"]')
        if (submitBtn) {
          submitBtn.classList.add("loading")
          submitBtn.disabled = true
        }
      }
      form.classList.add("was-validated")
    })
  })

  // Auto-hide alerts after 5 seconds
  const alerts = document.querySelectorAll(".alert")
  alerts.forEach((alert) => {
    setTimeout(() => {
      const bsAlert = new bootstrap.Alert(alert)
      bsAlert.close()
    }, 5000)
  })

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  }

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe cards and other elements for animation
  const animateElements = document.querySelectorAll(".card, .feature-card, .team-card, .service-card, .stat-card")
  animateElements.forEach((el) => {
    observer.observe(el)
  })

  // Counter animation for stats
  const counters = document.querySelectorAll(".stat-number")
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.textContent)
        let current = 0
        const increment = target / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            counter.textContent = target
            clearInterval(timer)
          } else {
            counter.textContent = Math.floor(current)
          }
        }, 50)
        counterObserver.unobserve(counter)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })

  // Mobile menu close on link click
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    imageObserver.observe(img)
  })

  // Back to top button
  const backToTopBtn = document.createElement("button")
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  backToTopBtn.className = "btn btn-primary btn-floating"
  backToTopBtn.id = "back-to-top"
  backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `

  document.body.appendChild(backToTopBtn)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "block"
    } else {
      backToTopBtn.style.display = "none"
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Theme toggle (optional)
  const themeToggle = document.querySelector("#theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")
      localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light")
    })

    // Load saved theme
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme")
    }
  }

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here
  }, 10)

  window.addEventListener("scroll", debouncedScrollHandler)
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background-color: rgba(13, 110, 253, 0.95) !important;
        backdrop-filter: blur(10px);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`
document.head.appendChild(style)
