class Respostas {
    constructor(id, form, nota, data) {
        this.id = id;
        this.form = form;
        this.nota = nota;
        this.data = data;
    }

    // Firestore data converter
    static converter = {
        toFirestore: function (data) {
            return {
                id: data.id,
                form: data.form,
                nota: data.nota,
                data: data.data,
            };
        },
        fromFirestore: function (snapshot, options) {
            const data = snapshot.data(options);
            return new Respostas(snapshot.id, data.form, data.nota, data.data);
        }
    };
}

export default Respostas;
