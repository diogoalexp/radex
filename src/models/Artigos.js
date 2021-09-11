class Artigos {
    constructor(id, nome, file) {
        this.id = id;
        this.nome = nome;
        this.file = file;
    }

    // Firestore data converter
    static converter = {
        toFirestore: function (data) {
            return {
                id: data.id,
                nome: data.nome,
                file: data.file
            };
        },
        fromFirestore: function (snapshot, options) {
            const data = snapshot.data(options);
            return new Artigos(snapshot.id, data.nome, data.file);
        }
    };
}

export default Artigos;
