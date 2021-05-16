import { Negociacao } from "../models/Negociacao"
import { NegociacaoParcial } from "../models/NegociacaoParcial"

export class NegociacaoService {

    async obterNegociacoes(): Promise<Negociacao[]> {
        try {
            const response = await fetch('http://localhost:8080/dados')
            const jsonResponse: NegociacaoParcial[] = await response.json()

            return jsonResponse
                .map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante))
        } catch (err) {
            console.log(err);
            
            throw new Error('Não foi possivel importas as negociações')
        }
    }
}