export class Tarefa {
    _id?: string;
    descricao: string;
    statusRealizada: boolean;
    constructor(_descricao: string, _statusRealizada: boolean) {
        this.descricao = _descricao;
        this.statusRealizada = _statusRealizada;
    }
}