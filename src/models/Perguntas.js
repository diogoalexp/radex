class Perguntas {
    constructor(id, enunciado, imagem, pergunta, alternativas, resposta) {
        this.id = id;
        this.enunciado = enunciado;
        this.imagem = imagem;
        this.pergunta = pergunta;
        this.alternativas = alternativas;
        this.resposta = resposta;
    }

    // Firestore data converter
    static converter = {
        toFirestore: function (data) {
            return {
                id: data.id,
                enunciado: data.enunciado,
                imagem: data.imagem,
                pergunta: data.pergunta,
                alternativas: data.alternativas,
                resposta: data.resposta
            };
        },
        fromFirestore: function (snapshot, options) {
            const data = snapshot.data(options);
            return new Perguntas(snapshot.id, data.enunciado, data.imagem, data.pergunta, data.alternativas, data.resposta);
        }
    };
}

export default Perguntas;
