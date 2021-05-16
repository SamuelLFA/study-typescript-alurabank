import { Negociacao, Negociacoes } from '../models/index'
import { MensagemView, NegociacoesView } from '../views/index'

export class NegociacaoController {

    private _inputData: JQuery<HTMLInputElement>
    private _inputQuantidade: JQuery<HTMLInputElement>
    private _inputValor: JQuery<HTMLInputElement>
    private _negociacoes = new Negociacoes()
    private _negociacoesView = new NegociacoesView('#negociacoesView')
    private _mensagemView = new MensagemView('#mensagemView')

    constructor() {

        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
        this._negociacoesView.update(this._negociacoes)
    }

    adiciona(event: Event) {

        event.preventDefault()

        const negociacao = new Negociacao(
            new Date(this._inputData.val().toString()),
            parseInt(this._inputQuantidade.val().toString()),
            parseFloat(this._inputValor.val().toString())
        )

        this._negociacoes.adiciona(negociacao)
        this._negociacoesView.update(this._negociacoes)
        this._mensagemView.update('Negociação adicionada com sucesso!')
    }
}