import { storage } from '../storage.js'
import { VenomBot } from '../venom.js'
import { STAGES } from './index.js'

export const initialStage = {
  async exec({ from }) {
    storage[from].stage = STAGES.MENU

    const venombot = await VenomBot.getInstance()
    const greeting = `👋 Olá, seja bem-vindo(a) ao ${venombot.getSessionName}🍔.`
    const assistancePrompt = '*Posso te ajudar?* 🙋‍♂️'
    const menuOptions = `
      -----------------------------------
      1️⃣ - FAZER PEDIDO
      2️⃣ - VERIFICAR TAXA DE ENTREGA
      0️⃣ - FALAR COM ATENDENTE
    `

    const message = `${greeting}\n${assistancePrompt}\n${menuOptions}`

    await venombot.sendText({ to: from, message })
  },
}
