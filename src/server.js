import { VenomBot } from './venom.js'
import { stages, getStage } from './stages.js'

// Função principal que inicializa o chatbot
const main = async () => {
  try {
    // Inicializa o VenomBot com as configurações desejadas
    const venombot = await VenomBot.getInstance().init({
      session: 'Lanchonete Atibaia',
      headless: true,
      useChrome: false,
    })

    // Configura o chatbot para responder às mensagens recebidas
    venombot.onMessage(async (message) => {
      // Verifica se a mensagem é de um grupo e retorna se for
      if (message.isGroupMsg) return

      if (message.body) {
        // Obtém a etapa atual do chatbot com base na mensagem recebida
        const currentStage = getStage({ from: message.from })

        // Verifica se a etapa atual existe no objeto "stages" e executa a etapa correspondente
        if (currentStage in stages) {
          await stages[currentStage].stage.exec({
            from: message.from,
            message: message.body,
          })
        } else {
          // Caso a etapa atual não exista, retorna uma mensagem genérica
          await venombot.reply(
            message.from,
            'Desculpe, não entendi o que você quis dizer. Por favor, tente novamente.',
          )
        }
      }
    })
  } catch (error) {
    // Tratamento de erro geral para qualquer erro não tratado
    console.error('Ocorreu um erro inesperado:', error)
  }
}

// Chama a função principal para iniciar o chatbot
main()
