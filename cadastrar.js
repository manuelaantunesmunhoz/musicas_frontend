
const urlBackend = "https://musicas-backendantunes.vercel.app";

const inputTitulo = document.getElementById("titulo");
const inputArtista = document.getElementById("artista");
const inputGenero = document.getElementById("genero");
const inputAno = document.getElementById("ano");
const inputDuracao = document.getElementById("duracao");

const botaoCadastrar = document.getElementById("botaoCadastrar");

botaoCadastrar.addEventListener("click", cadastrarMusica);

async function cadastrarMusica(event) {

    event.preventDefault();

    if (
        inputTitulo.value.trim() === "" ||
        inputArtista.value.trim() === "" ||
        inputGenero.value.trim() === "" ||
        inputAno.value === "" ||
        inputDuracao.value === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    const musica = {
        titulo: inputTitulo.value.trim(),
        artista: inputArtista.value.trim(),
        genero: inputGenero.value.trim(),
        ano: inputAno.valueAsNumber,
        duracao: inputDuracao.valueAsNumber
    };

    try {

        const resposta = await fetch(`${urlBackend}/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(musica)
        });

        const respostaTransformada = await resposta.json();

        if (!resposta.ok) {
            throw new Error(respostaTransformada.erro);
        }

        alert(respostaTransformada.mensagem);

        window.location.href = "index.html";

    } catch (error) {

        console.log("Erro:", error);

        alert(error.message || "Não foi possível cadastrar a música.");
    }
}
