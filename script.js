// ===== MODAL =====
function abrirModal(tipo) {

    const modal = document.getElementById("modal");

    const imagens = {
        busto: "img/busto.jpg",
        cintura: "img/cintura.jpg",
        frente: "img/frente.jpg",
        costas: "img/costas.jpg",
        ombro: "img/ombro.jpg"
    };

    const textos = {
        busto: "Passe a fita ao redor da parte mais cheia do busto.",
        cintura: "Meça a parte mais fina da cintura.",
        frente: "Do ombro até a cintura pela frente.",
        costas: "Do ombro até a cintura pelas costas.",
        ombro: "De um ombro ao outro. Com a fita métrica solta"
    };

    document.getElementById("modal-img").src = imagens[tipo];
    document.getElementById("texto").innerText = textos[tipo];

    modal.classList.remove("hidden");
}

function fecharModal() {
    document.getElementById("modal").classList.add("hidden");
}

// FECHAR CLICANDO FORA
window.onclick = function(e) {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
        fecharModal();
    }
};

// ===== PDF + WHATSAPP =====
function gerarPDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const nome = document.getElementById("nome").value;
    const whats = document.getElementById("whats").value;

    const dados = {
        busto: document.getElementById("busto").value,
        cintura: document.getElementById("cintura").value,
        alturaFrente: document.getElementById("alturaFrente").value,
        alturaCostas: document.getElementById("alturaCostas").value,
        ombro: document.getElementById("ombro").value
    };

    // HEADER
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 25, "F");

    doc.setTextColor(255,255,255);
    doc.text("FICHA DE MEDIDAS", 20, 15);

    doc.setTextColor(0,0,0);

    doc.text(`Nome: ${nome}`, 20, 40);
    doc.text(`WhatsApp: ${whats}`, 20, 50);

    let y = 70;

    const medidas = [
        ["Busto", dados.busto],
        ["Cintura", dados.cintura],
        ["Altura Frente", dados.alturaFrente],
        ["Altura Costas", dados.alturaCostas],
        ["Ombro", dados.ombro]
    ];

    medidas.forEach(m => {
        doc.text(`${m[0]}: ${m[1]} cm`, 20, y);
        y += 10;
    });

    doc.save(`medidas_${nome}.pdf`);

    const numero = "5551998899069";

    const msg = `Olá, meu nome é ${nome}.
Segue minhas medidas:

Busto: ${dados.busto} cm
Cintura: ${dados.cintura} cm
Altura Frente: ${dados.alturaFrente} cm
Altura Costas: ${dados.alturaCostas} cm
Ombro: ${dados.ombro} cm`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;

    window.open(url, "_blank");
}