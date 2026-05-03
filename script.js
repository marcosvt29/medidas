// ===== CONFIGURAÇÃO CENTRAL =====
const MEDIDAS = [
    {
        id: "busto",
        label: "Busto (cm)",
        img: "img/busto.jpg",
        texto: "Passe a fita ao redor da parte mais cheia do busto."
    },
    {
        id: "cintura",
        label: "Cintura (cm)",
        img: "img/cintura.jpg",
        texto: "Meça a parte mais fina da cintura."
    },
    {
        id: "alturaFrente",
        label: "Altura Frente (cm)",
        img: "img/frente.jpg",
        texto: "Do ombro até a cintura pela frente. Passar a fita por cima do seio."
    },
    {
        id: "alturaCostas",
        label: "Altura Costas (cm)",
        img: "img/costas.jpg",
        texto: "Do ombro até a cintura pelas costas."
    },
    {
        id: "ombro",
        label: "Ombro a Ombro (cm)",
        img: "img/ombro.jpg",
        texto: "De um ombro ao outro. Medir com a fita métrica solta."
    },
    
    {
        id: "alt busto",
        label: "Altura do Busto (cm)",
        img: "img/altbusto.jpg",
        texto: "Da ponta do ombro até o bico do seio ou a parte mais volumosa do seio."
    },
    
    
    
    
];

// ===== GERAR CAMPOS =====
function renderCampos() {

    const container = document.getElementById("campos-medidas");

    MEDIDAS.forEach(m => {
        const div = document.createElement("div");
        div.className = "field";

        div.innerHTML = `
            <input type="number" id="${m.id}" placeholder="${m.label}">
            <span class="help" onclick="abrirModal('${m.id}')">?</span>
        `;

        container.appendChild(div);
    });
}

renderCampos();

// ===== MODAL =====
function abrirModal(tipo) {
    const medida = MEDIDAS.find(m => m.id === tipo);

    document.getElementById("modal-img").src = medida.img;
    document.getElementById("texto").innerText = medida.texto;

    document.getElementById("modal").classList.remove("hidden");
}

function fecharModal() {
    document.getElementById("modal").classList.add("hidden");
}

// fechar clicando fora
window.onclick = function(e) {
    const modal = document.getElementById("modal");
    if (e.target === modal) fecharModal();
};

// ===== PDF + WHATSAPP =====
function gerarPDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const nome = document.getElementById("nome").value;
    const whats = document.getElementById("whats").value;

     // HEADER
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 25, "F");

    doc.setTextColor(255,255,255);
    doc.text("FICHA DE MEDIDAS", 20, 15);

    doc.setTextColor(0,0,0);

    doc.text(`Nome: ${nome}`, 20, 40);
    doc.text(`WhatsApp: ${whats}`, 20, 50);
    
        
    
    let y = 40;

    doc.text(`Nome: ${nome}`, 20, y);
    y += 10;
    doc.text(`WhatsApp: ${whats}`, 20, y);
    y += 15;

    MEDIDAS.forEach(m => {
        const valor = document.getElementById(m.id).value;
        doc.text(`${m.label}: ${valor} cm`, 20, y);
        y += 10;
    });

    doc.save(`medidas_${nome}.pdf`);

    const numero = "5551998899069";

    let msg = `Olá, meu nome é ${nome}.
Segue minhas medidas:\n`;

    MEDIDAS.forEach(m => {
        const valor = document.getElementById(m.id).value;
        msg += `${m.label}: ${valor} cm\n`;
    });

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
}