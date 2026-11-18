/**
 * Data Proyek Portofolio
 * Menambah proyek cukup dengan menambah objek baru ke dalam array projectsData.
 * Kolom: title, summary, tags, category, image, demoUrl, repoUrl, placeholder
 */
const projectsData = [
  {
    title: "Sistem kamera detector berbasis YOLO",
    summary: "Pendeteksian objek berbasis YOLO untuk membantu inspeksi produk.",
    tags: ["YOLO", "Python", "Computer Vision"],
    category: "Computer Vision",
    image: "assets/proyek-yolo.jpg",
    demoUrl: "",
    repoUrl: "",
    placeholder: false
  },
  {
    title: "Desain antarmuka aplikasi",
    summary: "Sebuah website yang dibuat untuk memperkenalkan identitas diri dan menampilkan pengalaman.",
    tags: ["HTML", "CSS", "Javascript", "UI/UX", "Canva"],
    category: "UI/UX",
    image: "assets/website.jpg",
    demoUrl: "",
    repoUrl: "",
    placeholder: false
  },
  {
    title: "Aplikasi basis data",
    summary: "Proyek sekolah memakai MySQL.",
    tags: ["MySQL", "Python"],
    category: "MySQL",
    image: "assets/db.png",
    demoUrl: "",
    repoUrl: "",
    placeholder: false
  }
];

if (typeof window !== "undefined") {
  window.projectsData = projectsData;
}

