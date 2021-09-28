class Artigos {
    constructor(id, nome, file, url) {
        this.id = id;
        this.nome = nome;
        this.file = file;
        this.url = url;
    }

    // Firestore data converter
    static converter = {
        toFirestore: function (data) {
            return {
                id: data.id,
                nome: data.nome,
                file: data.file,
                url: data.url
            };
        },
        fromFirestore: function (snapshot, options) {
            const data = snapshot.data(options);
            return new Artigos(snapshot.id, data.nome, data.file, data.url);
        }
    };
}

export default Artigos;
