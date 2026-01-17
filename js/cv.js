const cvs = [
	{
		title: "CV - ALMACENES LA 13",
		file: "assets/cv/CurriculumProfesionalLa13.pdf",
		tags: ["Full-Stack", "Backend", "APIs REST", "Bases de Datos"],
		description: "Curriculum profesional envíado a la empresa ALMACENES LA 13 S.A.",
	},
    {
		title: "CV - Fiducoomeva",
		file: "assets/cv/CurriculumProfesionalFiducoomeva.pdf",
		tags: ["Full-Stack", "Backend", "APIs REST", "Bases de Datos"],
		description: "Curriculum profesional envíado a la entidad Fiducoomeva.",
	},
    {
		title: "CV - Dynamo Brand",
		file: "assets/cv/CurriculumProfesionalDynamo.pdf",
		tags: ["Full-Stack", "Backend", "APIs REST", "Bases de Datos"],
		description: "Curriculum profesional envíado a la empresa Dynamo Brand.",
	},
    {
		title: "CV - Siesa",
		file: "assets/cv/CurriculumProfesionalSiesa.pdf",
		tags: ["Full-Stack", "Backend", "APIs REST", "Bases de Datos"],
		description: "Curriculum profesional envíado a la empresa Siesa.",
	},
    {
		title: "CV - Colegio Sagrado Corazón de Jesús",
		file: "assets/cv/CurriculumProfesionalCorazóndeJesús.pdf",
		tags: ["Full-Stack", "Backend", "APIs REST", "Bases de Datos"],
		description: "Curriculum profesional envíado a la institucioón Colegio Sagrado Corazón de Jesús.",
	},
	
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

function matchesCv(cv, query) {
	if (!query) return true;
	const q = normalize(query);
	const haystack = normalize([cv.title, cv.description, ...(cv.tags || [])].filter(Boolean).join(" "));
	return haystack.includes(q);
}

function renderCvs(items) {
	const grid = $("#cvGrid");
	const count = $("#cvCount");
	if (!grid) return;

	grid.innerHTML = items
		.map((cv) => {
			const tags = (cv.tags || []).map((t) => `<li>${escapeHtml(t)}</li>`).join("");
			const file = escapeHtml(cv.file);
			return `
				<article class="card cv-card">
					<h3 class="cv-title">${escapeHtml(cv.title)}</h3>
					<p class="cv-desc">${escapeHtml(cv.description || "")}</p>
					<ul class="chips" aria-label="Tags">${tags}</ul>
					<div class="cv-actions" aria-label="Acciones">
						<button class="btn btn-small" type="button" data-preview="${file}" data-title="${escapeHtml(cv.title)}">Previsualizar</button>
						<a class="btn btn-small btn-ghost" href="${file}" download>Descargar</a>
					</div>
					<p class="muted cv-file">${file}</p>
				</article>
			`;
		})
		.join("");

	if (count) {
		count.textContent = `${items.length} CV${items.length === 1 ? "" : "s"}`;
	}
}

function setupSearch() {
	const search = $("#cvSearch");
	if (!search) return;

	const update = () => {
		const query = search.value.trim();
		const filtered = cvs.filter((cv) => matchesCv(cv, query));
		renderCvs(filtered);
	};

	search.addEventListener("input", update);
	update();
}

function setupModal() {
	const modal = $("#cvModal");
	const modalClose = $("#cvModalClose");
	const title = $("#cvModalTitle");
	const frame = $("#cvModalFrame");
	const download = $("#cvModalDownload");
	const open = $("#cvModalOpen");
	if (!modal || !frame || !download || !open) return;

	const close = () => {
		modal.classList.remove("is-open");
		modal.setAttribute("aria-hidden", "true");
		frame.src = "about:blank";
	};

	const show = (file, cvTitle) => {
		modal.classList.add("is-open");
		modal.setAttribute("aria-hidden", "false");
		frame.src = file;
		download.href = file;
		open.href = file;
		if (title) title.textContent = cvTitle || "Previsualización";
	};

	document.addEventListener("click", (e) => {
		const target = e.target;
		if (!(target instanceof HTMLElement)) return;

		if (target.matches("[data-close='true']")) {
			close();
			return;
		}

		const previewBtn = target.closest("button[data-preview]");
		if (previewBtn instanceof HTMLButtonElement) {
			const file = previewBtn.dataset.preview;
			const cvTitle = previewBtn.dataset.title;
			if (file) show(file, cvTitle);
		}
	});

	modalClose?.addEventListener("click", close);

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.classList.contains("is-open")) close();
	});
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

function setupFooterYear() {
	const year = $("#year");
	if (year) year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
	setupMobileNav();
	setupModal();
	setupSearch();
	setupFooterYear();
});
