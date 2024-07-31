document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
document.addEventListener('DOMContentLoaded', function() {
  const skillSection = document.getElementById('Skills');
  const skills = document.querySelectorAll('.skill-hex');
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function animateSkillBars() {
    skills.forEach(skill => {
      if (isInViewport(skill) && !skill.classList.contains('active')) {
        skill.classList.add('active');
        const progress = skill.querySelector('.progress');
        const targetPercent = progress.getAttribute('data-skill');
        
        progress.style.width = `${targetPercent}%`;
      }
    });
  }

  window.addEventListener('scroll', animateSkillBars);
  animateSkillBars(); // Initial check
  

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(skillSection);
});
const sections = document.querySelectorAll('.section');

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', function() {

       // Parallax effect
       window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax');
        let scrollPosition = window.pageYOffset;

        parallaxElements.forEach(element => {
            let speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });

    // Scroll animations
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 75)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        })
    }

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });


    



    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Typing effect for main heading
    function typeEffect(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    const mainHeading = document.querySelector('.home-content h1');
    typeEffect(mainHeading, "Hi, I'm Meet Jasoliya");


    // Animated Counter for Statistics
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounters() {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Check if sections are visible and trigger animations
    function checkSectionVisibility() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('active');
                if (section.id === 'Skills') {
                    animateSkillBars();
                }
            }
        });
    }

    // Animate skill bars
    function animateSkillBars() {
        const skills = document.querySelectorAll('.skill');
        skills.forEach(skill => {
            const progress = skill.querySelector('.progress');
            const percent = skill.querySelector('.percent');
            const targetPercent = parseInt(percent.textContent);
            progress.style.width = `${targetPercent}%`;
        });
    }

    // Dark mode toggle functionality with animations
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    function toggleDarkMode(isDark) {
        if (isDark) {
            body.classList.add('dark-mode-transition');
            setTimeout(() => {
                body.classList.add('dark-mode');
                setTimeout(() => {
                    body.classList.remove('dark-mode-transition');
                }, 500);
            }, 10);
        } else {
            body.classList.add('dark-mode-transition');
            setTimeout(() => {
                body.classList.remove('dark-mode');
                setTimeout(() => {
                    body.classList.remove('dark-mode-transition');
                }, 500);
            }, 10);
        }
    }

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        toggleDarkMode(true);
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            toggleDarkMode(true);
            localStorage.setItem('darkMode', 'enabled');
        } else {
            toggleDarkMode(false);
            localStorage.setItem('darkMode', null);
        }
    });

    // Reveal animations for sections
    const revealElements = document.querySelectorAll('.reveal');

    function reveal() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);

    // Parallax effect for home and about images
    function parallax() {
        const homeImage = document.querySelector('.home-image img');
        const aboutImage = document.querySelector('.about-img img');
        const scrolled = window.pageYOffset;

        homeImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        aboutImage.style.transform = `translateY(${(scrolled - aboutImage.offsetTop) * 0.1}px)`;
    }

    window.addEventListener('scroll', parallax);

    // Initialize animations
    checkSectionVisibility();
    reveal();
});
function animateExperience() {
    const experienceItems = document.querySelectorAll('.experience-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    experienceItems.forEach(item => {
        observer.observe(item);
    });
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', animateExperience);

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.testimonial-container');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const testimonials = document.querySelectorAll('.testimonial-card');

    let currentIndex = 0;

    function showTestimonial(index) {
        container.scrollTo({
            left: testimonials[index].offsetLeft,
            behavior: 'smooth'
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        }
    });

    // Your existing code...
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert(result); // Display success or error message
            form.reset(); // Reset the form
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});
// // Particle background effect
// const canvas = document.createElement('canvas');
// const ctx = canvas.getContext('2d');
// document.body.appendChild(canvas);

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// canvas.style.position = 'fixed';
// canvas.style.top = '0';
// canvas.style.left = '0';
// canvas.style.zIndex = '-1';

// let particles = [];

// class Particle {
//     constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 5 + 1;
//         this.speedX = Math.random() * 3 - 1.5;
//         this.speedY = Math.random() * 3 - 1.5;
//     }

//     update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.size > 0.2) this.size -= 0.1;
//     }

//     draw() {
//         ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//     }
// }

// function init() {
//     for (let i = 0; i < 100; i++) {
//         particles.push(new Particle());
//     }
// }

// function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     for (let i = 0; i < particles.length; i++) {
//         particles[i].update();
//         particles[i].draw();
        
//         if (particles[i].size <= 0.2) {
//             particles.splice(i, 1);
//             i--;
//             particles.push(new Particle());
//         }
//     }
//     requestAnimationFrame(animate);
// }

// init();
// animate();

document.addEventListener('DOMContentLoaded', function() {
    const skillSection = document.getElementById('Skills');
    const skills = document.querySelectorAll('.skill');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate skill bars
    function animateSkillBars() {
        skills.forEach(skill => {
            if (isInViewport(skill) && !skill.classList.contains('active')) {
                skill.classList.add('active');
                const percent = skill.querySelector('.percent');
                const progress = skill.querySelector('.progress');
                const targetPercent = parseInt(progress.style.getPropertyValue('--skill-level'));
                
                let currentPercent = 0;
                const interval = setInterval(() => {
                    if (currentPercent >= targetPercent) {
                        clearInterval(interval);
                    } else {
                        currentPercent++;
                        percent.textContent = `${currentPercent}%`;
                    }
                }, 20);
            }
        });
    }

    // Trigger animation on scroll
    window.addEventListener('scroll', animateSkillBars);

    // Initial check in case skills are already in viewport on page load
    animateSkillBars();

    // Intersection Observer for more efficient scroll handling
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(skillSection);
});

// document.addEventListener('DOMContentLoaded', function() {
//     // Create canvas for particle effect
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     document.body.appendChild(canvas);

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     canvas.style.position = 'fixed';
//     canvas.style.top = '0';
//     canvas.style.left = '0';
//     canvas.style.zIndex = '-1';

//     let particles = [];
//     const particleCount = 100;
//     const connectionDistance = 100;
//     const mouseRadius = 150;

//     let mouse = {
//         x: null,
//         y: null
//     };

//     // Particle class
//     class Particle {
//         constructor() {
//             this.x = Math.random() * canvas.width;
//             this.y = Math.random() * canvas.height;
//             this.size = Math.random() * 2 + 1;
//             this.baseX = this.x;
//             this.baseY = this.y;
//             this.density = (Math.random() * 30) + 1;
//         }

//         draw() {
//             ctx.fillStyle = 'rgba(200, 200, 255, 0.8)';
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//             ctx.closePath();
//             ctx.fill();
//         }

//         update() {
//             let dx = mouse.x - this.x;
//             let dy = mouse.y - this.y;
//             let distance = Math.sqrt(dx * dx + dy * dy);
//             let forceDirectionX = dx / distance;
//             let forceDirectionY = dy / distance;

//             const maxDistance = mouseRadius;
//             let force = (maxDistance - distance) / maxDistance;
//             if (force < 0) force = 0;

//             let directionX = forceDirectionX * force * this.density;
//             let directionY = forceDirectionY * force * this.density;

//             if (distance < mouseRadius) {
//                 this.x -= directionX;
//                 this.y -= directionY;
//             } else {
//                 if (this.x !== this.baseX) {
//                     let dx = this.x - this.baseX;
//                     this.x -= dx / 10;
//                 }
//                 if (this.y !== this.baseY) {
//                     let dy = this.y - this.baseY;
//                     this.y -= dy / 10;
//                 }
//             }
//         }
//     }

//     function init() {
//         particles = [];
//         for (let i = 0; i < particleCount; i++) {
//             particles.push(new Particle());
//         }
//     }

//     function animate() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (let i = 0; i < particles.length; i++) {
//             particles[i].update();
//             particles[i].draw();
//         }
//         connect();
//         requestAnimationFrame(animate);
//     }

//     function connect() {
//         for (let a = 0; a < particles.length; a++) {
//             for (let b = a; b < particles.length; b++) {
//                 let dx = particles[a].x - particles[b].x;
//                 let dy = particles[a].y - particles[b].y;
//                 let distance = Math.sqrt(dx * dx + dy * dy);

//                 if (distance < connectionDistance) {
//                     ctx.strokeStyle = 'rgba(200, 200, 255,' + (1 - distance / connectionDistance) + ')';
//                     ctx.lineWidth = 1;
//                     ctx.beginPath();
//                     ctx.moveTo(particles[a].x, particles[a].y);
//                     ctx.lineTo(particles[b].x, particles[b].y);
//                     ctx.stroke();
//                 }
//             }
//         }
//     }

//     window.addEventListener('mousemove', function(event) {
//         mouse.x = event.x;
//         mouse.y = event.y;
//     });

//     window.addEventListener('resize', function() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         init();
//     });

//     init();
//     animate();

//     // Your existing code...
// });

//COLORINH BUBOLSD

// document.addEventListener('DOMContentLoaded', function() {
//     // Create canvas for bubble effect
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     document.body.appendChild(canvas);

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     canvas.style.position = 'fixed';
//     canvas.style.top = '0';
//     canvas.style.left = '0';
//     canvas.style.zIndex = '-1';

//     let bubbles = [];
//     let mouse = {
//         x: undefined,
//         y: undefined
//     }

//     // Color palette for bubbles
//     const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];

//     // Bubble class
//     class Bubble {
//         constructor() {
//             this.x = Math.random() * canvas.width;
//             this.y = canvas.height + Math.random() * 100;
//             this.size = Math.random() * 30 + 10;
//             this.color = colors[Math.floor(Math.random() * colors.length)];
//             this.speedY = Math.random() * 1 + 0.5;
//             this.speedX = Math.random() * 0.5 - 0.25;
//         }

//         update() {
//             this.y -= this.speedY;
//             this.x += this.speedX;

//             // Interact with mouse
//             if (mouse.x - this.x < 50 && mouse.x - this.x > -50
//                 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
//                 if (this.size < 40) {
//                     this.size += 3;
//                 }
//             } else if (this.size > 10) {
//                 this.size -= 0.5;
//             }

//             // Reset bubble when it goes off screen
//             if (this.y < 0 - this.size) {
//                 this.y = canvas.height + this.size;
//                 this.x = Math.random() * canvas.width;
//             }
//         }

//         draw() {
//             ctx.fillStyle = this.color;
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//             ctx.fill();
//         }
//     }

//     function initBubbles() {
//         for (let i = 0; i < 100; i++) {
//             bubbles.push(new Bubble());
//         }
//     }

//     function animateBubbles() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (let i = 0; i < bubbles.length; i++) {
//             bubbles[i].update();
//             bubbles[i].draw();
//         }
//         requestAnimationFrame(animateBubbles);
//     }

//     // Initialize and start the bubble animation
//     initBubbles();
//     animateBubbles();

//     // Event listeners
//     window.addEventListener('resize', function() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     });

//     window.addEventListener('mousemove', function(event) {
//         mouse.x = event.x;
//         mouse.y = event.y;
//     });

//     // Your existing code...
// });

//blue and white dotes

// document.addEventListener('DOMContentLoaded', function() {
//     // Create canvas for starry night effect
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     document.body.appendChild(canvas);

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     canvas.style.position = 'fixed';
//     canvas.style.top = '0';
//     canvas.style.left = '0';
//     canvas.style.zIndex = '-1';

//     let stars = [];
//     const starCount = 200;

//     // Star class
//     class Star {
//         constructor() {
//             this.x = Math.random() * canvas.width;
//             this.y = Math.random() * canvas.height;
//             this.size = Math.random() * 2;
//             this.twinkleSpeed = Math.random() * 0.05 + 0.01;
//             this.angle = Math.random() * Math.PI * 2;
//         }

//         twinkle() {
//             this.angle += this.twinkleSpeed;
//             this.size = Math.abs(Math.sin(this.angle)) * 2 + 0.5;
//         }

//         draw() {
//             ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.size / 2.5) + ')';
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//             ctx.fill();
//         }
//     }

//     function initStars() {
//         for (let i = 0; i < starCount; i++) {
//             stars.push(new Star());
//         }
//     }

//     function animateStars() {
//         ctx.fillStyle = 'rgba(10, 20, 40, 0.1)';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
        
//         for (let i = 0; i < stars.length; i++) {
//             stars[i].twinkle();
//             stars[i].draw();
//         }
//         requestAnimationFrame(animateStars);
//     }

//     // Initialize and start the star animation
//     initStars();
//     animateStars();

//     // Event listener for window resize
//     window.addEventListener('resize', function() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         stars = [];
//         initStars();
//     });

//     // Your existing code...
// });


//coloring shapes

document.addEventListener('DOMContentLoaded', function() {
    // Create canvas for geometric shapes effect
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';

    let shapes = [];
    const shapeCount = 30;

    // Color palette
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

    class Shape {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 60 + 20;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.rotation = 0;
            this.rotationSpeed = Math.random() * 0.02 - 0.01;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.sides = Math.floor(Math.random() * 3) + 3; // 3 to 5 sides
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            ctx.moveTo(this.size * Math.cos(0), this.size * Math.sin(0));
            for (let i = 1; i <= this.sides; i++) {
                ctx.lineTo(
                    this.size * Math.cos(i * 2 * Math.PI / this.sides),
                    this.size * Math.sin(i * 2 * Math.PI / this.sides)
                );
            }
            ctx.closePath();
            ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
            ctx.fill();
            ctx.restore();
        }
    }

    function initShapes() {
        for (let i = 0; i < shapeCount; i++) {
            shapes.push(new Shape());
        }
    }

    function animateShapes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });
        requestAnimationFrame(animateShapes);
    }

    // Initialize and start the shape animation
    initShapes();
    animateShapes();

    // Event listener for window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        shapes = [];
        initShapes();
    });

    // Your existing code...
});

//pratik's

// document.addEventListener('DOMContentLoaded', function() {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     document.body.appendChild(canvas);

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     canvas.style.position = 'fixed';
//     canvas.style.top = '0';
//     canvas.style.left = '0';
//     canvas.style.zIndex = '-1';

//     const nodes = [];
//     const nodeCount = 100;
//     const connectionDistance = 150;

//     class Node {
//         constructor() {
//             this.x = Math.random() * canvas.width;
//             this.y = Math.random() * canvas.height;
//             this.size = Math.random() * 2 + 1;
//             this.speedX = (Math.random() - 0.5) * 2;
//             this.speedY = (Math.random() - 0.5) * 2;
//         }

//         update() {
//             this.x += this.speedX;
//             this.y += this.speedY;

//             if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
//             if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
//         }

//         draw() {
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//             ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
//             ctx.fill();
//         }
//     }

//     function init() {
//         for (let i = 0; i < nodeCount; i++) {
//             nodes.push(new Node());
//         }
//     }

//     function animate() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
        
//         // Update and draw nodes
//         nodes.forEach(node => {
//             node.update();
//             node.draw();
//         });

//         // Draw connections
//         for (let i = 0; i < nodes.length; i++) {
//             for (let j = i + 1; j < nodes.length; j++) {
//                 const dx = nodes[i].x - nodes[j].x;
//                 const dy = nodes[i].y - nodes[j].y;
//                 const distance = Math.sqrt(dx * dx + dy * dy);

//                 if (distance < connectionDistance) {
//                     ctx.beginPath();
//                     ctx.moveTo(nodes[i].x, nodes[i].y);
//                     ctx.lineTo(nodes[j].x, nodes[j].y);
//                     const opacity = 1 - (distance / connectionDistance);
//                     ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
//                     ctx.stroke();
//                 }
//             }
//         }

//         requestAnimationFrame(animate);
//     }

//     init();
//     animate();

//     window.addEventListener('resize', function() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     });

//     // Optional: Add interactivity with mouse
//     let mouse = { x: null, y: null };
//     canvas.addEventListener('mousemove', function(event) {
//         mouse.x = event.x;
//         mouse.y = event.y;

//         // Create temporary nodes at mouse position
//         for (let i = 0; i < 3; i++) {
//             nodes.push(new Node());
//             nodes[nodes.length - 1].x = mouse.x;
//             nodes[nodes.length - 1].y = mouse.y;
//             nodes[nodes.length - 1].size = 1;
//             nodes[nodes.length - 1].speedX = (Math.random() - 0.5) * 5;
//             nodes[nodes.length - 1].speedY = (Math.random() - 0.5) * 5;
//         }

//         // Remove excess nodes
//         if (nodes.length > nodeCount + 20) {
//             nodes.splice(0, 3);
//         }
//     });

//     // Your existing code...
// });




