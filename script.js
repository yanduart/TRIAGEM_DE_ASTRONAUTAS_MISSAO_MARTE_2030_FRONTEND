// Array inicial com dados aleatórios de candidatos
let candidatos = [
    { nome: "Ana Silva", idade: 32, horasVoo: 1500, notaPsico: 8.5 },
    { nome: "Bruno Costa", idade: 28, horasVoo: 800, notaPsico: 9.0 },
    { nome: "Carlos Souza", idade: 35, horasVoo: 2000, notaPsico: 7.5 },
    { nome: "Diana Santos", idade: 29, horasVoo: 1200, notaPsico: 8.2 },
    { nome: "Eduardo Oliveira", idade: 41, horasVoo: 2500, notaPsico: 8.8 },
    { nome: "Fernanda Lima", idade: 26, horasVoo: 950, notaPsico: 7.8 },
    { nome: "Gabriel Martins", idade: 38, horasVoo: 1800, notaPsico: 8.6 },
    { nome: "Helena Rocha", idade: 31, horasVoo: 1400, notaPsico: 9.1 },
    { nome: "Igor Ferreira", idade: 27, horasVoo: 1100, notaPsico: 8.3 },
    { nome: "Julia Alves", idade: 34, horasVoo: 2200, notaPsico: 8.9 },
    { nome: "Kevin Gomes", idade: 25, horasVoo: 700, notaPsico: 7.9 },
    { nome: "Larissa Pereira", idade: 33, horasVoo: 1600, notaPsico: 8.4 },
    { nome: "Marcelo Ribeiro", idade: 42, horasVoo: 2800, notaPsico: 8.7 },
    { nome: "Natalia Cardoso", idade: 30, horasVoo: 1350, notaPsico: 8.1 },
    { nome: "Otavio Mendes", idade: 36, horasVoo: 1950, notaPsico: 8.5 }
];

// Critérios da Missão Marte 2030
const CRITERIOS = {
    idadeMinima: 25,
    idadeMaxima: 45,
    horasVooMinima: 1000,
    notaPsicoMinima: 8
};

// Função para avaliar um candidato
function avaliarCandidato(candidato) {
    return candidato.idade >= CRITERIOS.idadeMinima &&
           candidato.idade <= CRITERIOS.idadeMaxima &&
           candidato.horasVoo >= CRITERIOS.horasVooMinima &&
           candidato.notaPsico >= CRITERIOS.notaPsicoMinima;
}

// Função para adicionar um novo candidato
function adicionarCandidato() {
    // Obter valores dos inputs
    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const horasVoo = Number(document.getElementById("horasVoo").value);
    const notaPsico = Number(document.getElementById("notaPsico").value);

    // Validar se todos os campos foram preenchidos
    if (!nome || !idade || !horasVoo || !notaPsico) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Validar valores
    if (idade < 18 || idade > 65) {
        alert("Idade deve estar entre 18 e 65 anos!");
        return;
    }

    if (horasVoo < 0) {
        alert("Horas de voo não pode ser negativa!");
        return;
    }

    if (notaPsico < 0 || notaPsico > 10) {
        alert("Nota psicológica deve estar entre 0 e 10!");
        return;
    }

    // Criar novo objeto candidato
    const novoCandidato = { nome, idade, horasVoo, notaPsico };

    candidatos.push(novoCandidato);

    alert("Candidato adicionado com sucesso!");

    // Avaliar o candidato
    const isApto = avaliarCandidato(novoCandidato);
    const resultado = document.getElementById("resultado");
    
    if (isApto) {
        resultado.innerHTML = `${nome} foi <strong>APROVADO</strong> para a Missão Marte 2030!`;
        resultado.className = "apto";
    } else {
        resultado.innerHTML = `${nome} foi <strong>REPROVADO</strong>. Não atende aos critérios da missão.`;
        resultado.className = "inapto";
    }
    resultado.style.display = "block";

    
    document.getElementById("formCandidato").reset();

    console.log(`Candidato adicionado: ${nome}. Total de candidatos: ${candidatos.length}`);

    // Atualiza a lista se ela estiver aberta
    const resultsContainer = document.getElementById("resultsContainer");
    if (resultsContainer.style.display === "block") {
    exibirResultados(true); // chama sua função de exibir resultados
    resultsContainer.style.display = "block"; // garante que continue visível
}
}



// Função para exibir os resultados
function exibirResultados(atualizar = false) {
    const resultsContainer = document.getElementById("resultsContainer");
    const estaVisivel = resultsContainer.style.display === "block";

if (estaVisivel && !atualizar) {
    resultsContainer.style.display = "none";
    return; // 👈 importante: para a função aqui
}

    resultsContainer.style.display = "block";

    // Separar candidatos em aptos e inaptos
    const aptos = candidatos.filter(c => avaliarCandidato(c));
    const inaptos = candidatos.filter(c => !avaliarCandidato(c));

    // Filtros especiais
    const maiorIdade = candidatos.filter(c => c.idade > 30);
    document.getElementById("maiorIdadeColumn").innerHTML = 
    maiorIdade.map(c => `<p>${c.nome}</p>`).join("");

    const maiorVoo = candidatos.filter(c => c.horasVoo > 2000);
    document.getElementById("maiorVooColumn").innerHTML =
    maiorVoo.map(c => `<p>${c.nome}</p>`).join("");

    const maiorPsico = candidatos.filter(c => c.notaPsico > 8);
    document.getElementById("maiorPsicoColumn").innerHTML =
    maiorPsico.map(c => `<p>${c.nome}</p>`).join("");

    // Preencher coluna de Aptos
    const aptosColumn = document.getElementById("aptosColumn");
    if (aptos.length > 0) {
        aptosColumn.innerHTML = aptos.map(c => 
            `<div class="candidate-item">
                <strong>${c.nome}</strong>
                <small>Idade: ${c.idade} | Voo: ${c.horasVoo}h | Psico: ${c.notaPsico}</small>
            </div>`
        ).join("");
    } else {
        aptosColumn.innerHTML = '<div class="empty-message">Nenhum candidato apto</div>';
    }

    // Preencher coluna de Inaptos
    const inaptosColumn = document.getElementById("inaptosColumn");

    if (inaptos.length > 0) {
        let html = "";

        for (let i = 0; i < inaptos.length; i++) {
            const c = inaptos[i];

            html += `<div class="candidate-item">
                        <strong>${c.nome}</strong>
                        <small>Idade: ${c.idade} | Voo: ${c.horasVoo}h | Psico: ${c.notaPsico}</small>
                     </div>`;
        }

        inaptosColumn.innerHTML = html;
    } else {
        inaptosColumn.innerHTML = '<div class="empty-message">Nenhum candidato inapto</div>';
    }


    // Calcular estatísticas
    const total = candidatos.length;
    // Calcular taxa de aprovação
    const taxaAprovacao = (aptos.length / total) * 100;

// Calcular idade média
    let somaIdade = 0;
    candidatos.forEach(c => {
    somaIdade += c.idade;
});
    const idadeMedia = somaIdade / total;

// Calcular média de voo
    let somaVoo = 0;
    candidatos.forEach(c => {
    somaVoo += c.horasVoo;
});
    const vooMedia = somaVoo / total;


    // Atualizar estatísticas
    document.getElementById("totalCandidatos").innerHTML = total;

    document.getElementById("taxaAprovacao").innerHTML = taxaAprovacao.toFixed(1) + "%";
    document.getElementById("idadeMedia").innerHTML = idadeMedia.toFixed(1);
    document.getElementById("vooMedia").innerHTML = vooMedia.toFixed(1);

    console.log(`Resultados exibidos: ${aptos.length} aptos, ${inaptos.length} inaptos`);
}


