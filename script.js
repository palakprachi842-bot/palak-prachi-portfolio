
document.addEventListener("DOMContentLoaded", () => {

    // 1. Smooth scrolling for navigation links

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );

    links.forEach(link => {
        link.addEventListener("click", function(e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // 2. Highlight active navigation link

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav-links a"
    );

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") ===
                "#" + currentSection) {

                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();


    // 3. Reveal cards when scrolling

    const cards = document.querySelectorAll(
        ".card, .project-card, .education-card, .vision-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.1
            }
        );

        cards.forEach(card => {
            card.classList.add("reveal");
            observer.observe(card);
        });
    }


    // 4. Back to Top button

    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";
    topButton.className = "back-to-top";
    topButton.setAttribute("aria-label", "Back to top");

    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topButton.classList.add("visible");
        } else {
            topButton.classList.remove("visible");
        }
    });

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});
