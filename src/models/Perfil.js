class Perfil {
    constructor(id, nome, idade, cargo, img) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.img = img;
    }

    // Firestore data converter
    static converter = {
        toFirestore: function (data) {
            return {
                id: data.id,
                nome: data.nome,
                idade: data.idade,
                cargo: data.cargo,
                img: data.img
            };
        },
        fromFirestore: function (snapshot, options) {
            const data = snapshot.data(options);
            return new Perfil(snapshot.id, data.nome, data.idade, data.cargo, data.img);
        }
    };
}

export default Perfil;
