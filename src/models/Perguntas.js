class Perguntas {
    constructor(id, enunciado, imagem, pergunta, alternativas, resposta, afirmativas) {
        this.id = id;
        this.enunciado = enunciado;
        this.imagem = imagem;
        this.pergunta = pergunta;
        this.alternativas = alternativas;
        this.resposta = resposta;
        this.afirmativas = afirmativas;
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
                resposta: data.resposta,
                afirmativas: data.afirmativas
            };
        },
        fromFirestore: function (snapshot, options) {
            const data = snapshot.data(options);
            return new Perguntas(snapshot.id, data.enunciado, data.imagem, data.pergunta, data.alternativas, data.resposta, data.afirmativas);
        }
    };
}

export default Perguntas;
