/**
 * Data Proyek Portofolio
 * Menambah proyek cukup dengan menambah objek baru ke dalam array projectsData.
 * Kolom: title, summary, tags, category, image, demoUrl, repoUrl, placeholder
 */
const projectsData = [
  {
    title: "Sistem kamera detector berbasis YOLO",
    summary: "Pendeteksian objek berbasis YOLO untuk membantu inspeksi produk. Deskripsi umum, tanpa data rahasia perusahaan.",
    tags: ["YOLO", "Python", "Computer Vision"],
    category: "Computer Vision",
    image: "",
    demoUrl: "",
    repoUrl: "",
    placeholder: false
  },
  {
    title: "Desain antarmuka aplikasi",
    summary: "Wireframe dan prototipe antarmuka. Ganti dengan karya saya.",
    tags: ["UI/UX", "Canva"],
    category: "UI/UX",
    image: "",
    demoUrl: "",
    repoUrl: "",
    placeholder: true
  },
  {
    title: "Aplikasi basis data",
    summary: "Proyek sekolah memakai MySQL. Ganti dengan karya saya.",
    tags: ["MySQL", "Python"],
    category: "MySQL",
    image: "",
    demoUrl: "",
    repoUrl: "",
    placeholder: true
  }
];

if (typeof window !== "undefined") {
  window.projectsData = projectsData;
}

