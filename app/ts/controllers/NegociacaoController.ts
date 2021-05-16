import { domInject } from '../helpers/decorators/domInject'
import { throttle } from '../helpers/decorators/throttle'
import { imprime } from '../helpers/index'
import { Negociacao, NegociacaoParcial, Negociacoes } from '../models/index'
import { NegociacaoService } from '../services/NegociacaoService'
import { MensagemView, NegociacoesView } from '../views/index'

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery<HTMLInputElement>
    @domInject('#quantidade')
    private _inputQuantidade: JQuery<HTMLInputElement>
    @domInject('#valor')
    private _inputValor: JQuery<HTMLInputElement>
    private _negociacoes = new Negociacoes()
    private _negociacoesView = new NegociacoesView('#negociacoesView', true)
    private _mensagemView = new MensagemView('#mensagemView', true)
    private _negociacaoService = new NegociacaoService()

    constructor() {

        this._negociacoesView.update(this._negociacoes)
    }

    @throttle()
    adiciona() {

        let data = new Date((this._inputData.val() as string).replace(/-/g, '/'))

        if (!this.ehDiaUtil(data)) {
            this._mensagemView.update('Negociações somente em dias úteis')
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val() as string),
            parseFloat(this._inputValor.val() as string)
        )

        this._negociacoes.adiciona(negociacao)

        imprime(negociacao, this._negociacoes)
        this._negociacoesView.update(this._negociacoes)
        this._mensagemView.update('Negociação adicionada com sucesso!')
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() !== DiaDaSemana.Sabado || data.getDay() !== DiaDaSemana.Domingo
    }

    @throttle()
    async importaDados() {
        try {
            const negociacoesParaImportar = await this._negociacaoService.obterNegociacoes()
            const negociacaoJaImportadas = this._negociacoes.paraArray()

            negociacoesParaImportar
                .filter(negociacao => !negociacaoJaImportadas.some(jaImportada => negociacao.ehIgual(jaImportada)))
                .forEach((negociacao) => {
                    this._negociacoes.adiciona(negociacao)
                })

            this._negociacoesView.update(this._negociacoes)
        } catch (err) {
            console.log(this._mensagemView.update(err.message));
        }
    }
}

enum DiaDaSemana {

    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}