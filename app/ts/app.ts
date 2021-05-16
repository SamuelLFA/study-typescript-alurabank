import { NegociacaoController } from './controllers/index'

const controller = new NegociacaoController()

$('.form').on('submit', controller.adiciona.bind(controller))