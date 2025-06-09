/**
 * script.js - Sleek Studio
 * Descrição: Scripts de interação da interface
 * Autor: Caio Vinícius
 * Data: 05/06/2025
 */


let servicosData = []; // Variável global para armazenar os serviços
let currentServiceIndex = 0; // Índice do serviço atual


function OnHoverCard() {
    const allCards = document.getElementsByClassName("card");

    Array.from(allCards).forEach(card => {
        card.addEventListener('mouseenter', () => {
            Array.from(allCards).forEach(c => {
                c.classList.toggle('card-not-hover', c !== card);
                c.classList.toggle('card-hover', c === card);
            });
        });
        card.addEventListener('mouseleave', () => {
            Array.from(allCards).forEach(c => {
                c.classList.remove('card-not-hover', 'card-hover');
            });
        });
    });
}

function atualizarServico(index) {
    // Verifica os limites do array
    if (index >= 0 && index < servicosData.length) {
        currentServiceIndex = index;
        document.getElementById('servico-titulo').innerHTML = servicosData[index].titulo;
        document.getElementById('servico-desc').textContent = servicosData[index].descricao;
    }
}

function configurarServicos(servicos) {
    servicosData = servicos; // Armazena os serviços na variável global
    
    // Configura os botões "Saiba Mais"
    const botoes = document.querySelectorAll('.cardButtons');
    botoes.forEach((botao, index) => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            atualizarServico(index);
        });
    });

    // Configura as setas de navegação
    document.getElementById('left-arrow').addEventListener('click', () => {
        const newIndex = (currentServiceIndex - 1 + servicosData.length) % servicosData.length;
        atualizarServico(newIndex);
    });

    document.getElementById('right-arrow').addEventListener('click', () => {
        const newIndex = (currentServiceIndex + 1) % servicosData.length;
        atualizarServico(newIndex);
    });

    // Inicializa com o primeiro serviço
    atualizarServico(0);
}

document.addEventListener('DOMContentLoaded', () => {
    OnHoverCard();

    fetch('assets/data/servicos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON.');
            }
            return response.json();
        })
        .then(servicos => {
            configurarServicos(servicos);
        })
        .catch(error => {
            console.error('Erro ao carregar os serviços:', error);
            // Fallback caso o JSON não carregue
            configurarServicos([{
                titulo: "social<br />media",
                descricao: "Serviço indisponível no momento. Por favor, tente novamente mais tarde."
            }]);
        });
});
