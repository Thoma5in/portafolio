
const projects = [
	{
		name: "Sección Web 3D Interactiva – Hígado",
        date: "Febrero 2025 - Junio 2025",
		description:
			"Desarrollo de una sección web interactiva en 3D que muestra un modelo del hígado con información educativa. Implementé un sistema de medallero (logros) para incentivar la interacción del usuario, utilizando React Three Fiber y React Three Drei. El backend se desarrolló con Node.js y MongoDB Atlas para almacenar las posiciones y estados del medallero.",
		technologies: [
			"React",
			"React Three Fiber",
			"React Three Drei",
			"Node.js",
			"MongoDB Atlas",
			"JavaScript",
			"3D Web",
		],
		github: "https://github.com/Thoma5in",
		demo: "",
	},
	{
		name: "Transmedina Dapa",
        date: "Junio 2024 - Junio 2025",
		description:
			"Aplicación web desarrollada para clientes y conductores de mototaxis en el sector de Dapa. Me enfoqué principalmente en el backend utilizando Django, diseñando y gestionando la base de datos con PostgreSQL. El sistema permite realizar trámites y consultas de manera virtual, mejorando la organización y accesibilidad de la información.",
		technologies: [
			"Django",
			"Python",
			"PostgreSQL",
			"Backend",
			"Modelado de Base de Datos",
		],
		github: "https://github.com/Thoma5in",
		demo: "",
	},
	{
		name: "TiendaMax",
        date: "Agosto 2025 - Diciembre 2025",
		description:
			"Proyecto académico tipo e-commerce desarrollado en la Universidad del Valle. Participé en el desarrollo de la lógica backend y la integración con el frontend, implementando funcionalidades CRUD, manejo de usuarios y gestión de productos. El proyecto se trabajó en equipo aplicando metodología Scrum y organización por sprints.",
		technologies: [
			"Node.js",
			"React",
			"APIs REST",
			"JavaScript",
			"Scrum",
			"Trabajo en Equipo",
		],
		github: "https://github.com/Thoma5in",
		demo: "",
	},
    {
		name: "CryoPath – Plataforma E-commerce",
        date: "Diciembre 2025 - Actualmente",
		description:
			"Desarrollo de una plataforma e-commerce basada en arquitectura de microservicios. Participé en la implementación de APIs REST para la gestión de usuarios, productos, carrito de compras y órdenes, asegurando la correcta comunicación entre servicios. Se desarrolló la lógica de negocio para control de stock, validación de disponibilidad de productos, manejo de estados de órdenes y eliminación de ítems del carrito.",
		technologies: [
			"Node.js",
			"JavaScript",
			"Supabase",
			"PostgreSQL",
			"APIs REST",
			"Microservicios",
			"SQL",
			"Git",
		],
		github: "https://github.com/Thoma5in",
		demo: "",
	},
];

const skills = [
	{ name: "HTML", meta: "Semántica, accesibilidad" },
	{ name: "CSS", meta: "Flexbox, Grid, responsive" },
	{ name: "JavaScript", meta: "DOM, fetch" },
	{ name: "Git/GitHub", meta: "Flujo básico, PRs" },
	{ name: "React", meta: "Componentes, hooks" },
	{ name: "Node.js", meta: "APIs, Express" },
    { name: "Supabase", meta: "Bases de datos, autenticación" },
    { name: "PostgreSQL", meta: "Modelado, consultas SQL" },
    { name: "MongoDB", meta: "NoSQL, consultas" },
    { name: "Django", meta: "Modelos, vistas, templates" },
    { name: "Python", meta: "Sintaxis, POO básica" },

];

function $(selector) {
	return document.querySelector(selector);
}

function escapeHtml(value) {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
}

function normalize(value) {
	return String(value || "")
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "");
}

function renderProjects(items) {
	const grid = $("#projectsGrid");
	const count = $("#projectCount");
	if (!grid) return;

	grid.innerHTML = items
		.map((p) => {
			const tech = (p.technologies || []).map((t) => `<li>${escapeHtml(t)}</li>`).join("");

			const github = p.github
				? `<a href="${escapeHtml(p.github)}" target="_blank" rel="noreferrer">GitHub</a>`
				: "";
			const demo = p.demo
				? `<a href="${escapeHtml(p.demo)}" target="_blank" rel="noreferrer">Demo</a>`
				: "";

			return `
				<article class="card project-card">
					<div class="project-top">
						<h3 class="project-title">${escapeHtml(p.name)}</h3>
                        
					</div>
					<p class="project-desc">${escapeHtml(p.description)}</p>
					<ul class="chips" aria-label="Tecnologías">${tech}</ul>
                    <h2 class="project-title">${escapeHtml(p.date)}</h2>
					<div class="project-links" aria-label="Enlaces">
						${github}
						${demo}
					</div>
				</article>
			`;
		})
		.join("");

	if (count) {
		count.textContent = `${items.length} proyecto${items.length === 1 ? "" : "s"}`;
	}
}

function renderSkills(items) {
	const grid = $("#skillsGrid");
	if (!grid) return;

	grid.innerHTML = items
		.map((s) => {
			return `
				<div class="card skill">
					<div class="skill-name">${escapeHtml(s.name)}</div>
					<div class="skill-meta">${escapeHtml(s.meta || "")}</div>
				</div>
			`;
		})
		.join("");
}

function matchesProject(project, query) {
	if (!query) return true;
	const q = normalize(query);
	const haystack = normalize(
		[project.name, project.description, ...(project.technologies || [])].filter(Boolean).join(" ")
	);
	return haystack.includes(q);
}

function setupProjectSearch() {
	const search = $("#projectSearch");
	if (!search) {
		// Si la página no tiene buscador de proyectos (por ejemplo, otra página), renderiza sin filtro.
		renderProjects(projects);
		return;
	}

	const update = () => {
		const query = search.value.trim();
		const filtered = projects.filter((p) => matchesProject(p, query));
		renderProjects(filtered);
	};

	search.addEventListener("input", update);
	update();
}

function setupMobileNav() {
	const toggle = $(".nav-toggle");
	const nav = $("#site-nav");
	if (!toggle || !nav) return;

	const close = () => {
		nav.classList.remove("is-open");
		toggle.setAttribute("aria-expanded", "false");
	};

	const open = () => {
		nav.classList.add("is-open");
		toggle.setAttribute("aria-expanded", "true");
	};

	toggle.addEventListener("click", () => {
		const isOpen = nav.classList.contains("is-open");
		if (isOpen) close();
		else open();
	});

	nav.addEventListener("click", (e) => {
		const target = e.target;
		if (target instanceof HTMLAnchorElement) close();
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") close();
	});

	document.addEventListener("click", (e) => {
		if (!nav.classList.contains("is-open")) return;
		if (e.target === toggle || nav.contains(e.target)) return;
		close();
	});
}

function setupContactForm() {
	const form = $("#contactForm");
	if (!form) return;

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = $("#name")?.value?.trim() || "";
		const email = $("#email")?.value?.trim() || "";
		const message = $("#message")?.value?.trim() || "";

		const subject = encodeURIComponent(`Contacto desde portafolio: ${name || "(sin nombre)"}`);
		const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);

		// Cambia este correo por el tuyo real si lo deseas:
		const to = "samiospina2006@gmail.com";
		window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
	});
}

function setupFooterYear() {
	const year = $("#year");
	if (year) year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
	setupMobileNav();
	renderSkills(skills);
	setupProjectSearch();
	setupContactForm();
	setupFooterYear();
});
