import { BotAction, BotData } from "../core/bots/Bot"
import { getMeaningWord } from "../infrastructure/api/RappidAPI"
import { getCoordinatesByCity, getWeatherByCoordinates, translateTo } from "../infrastructure/api/WeatherAPI"
const j_actions = [
  {
    command: 'Meteo:',
    description: "Optenir la météo d'une ville. Ex: meteo Pekin",
  },
  {
    command: 'Translate:',
    description: "Je traduis votre mot en Espagnol. Ex: translate Bonjour",
  }
]

const t_actions = [
  {
    command: 'Def:',
    description: "Donnes une définition sur le mot donné. Ex: def epiloguer",
  },
  {
    command: 'Translate:',
    description: "Je traduis votre mot en Anglais Américain. Ex: translate Bonjour",
  }
]

const m_actions = [
  {
    command: 'Translate:',
    description: "Je traduis votre mot en Chinois. Ex: translate Bonjour",
  }
]

const helpCreator = (acts: Omit<BotAction, 'execute'>[]) => ({
  command: 'Help:',
  description: "L'ensemble de mes commandes.",
  async execute() {

    const text = acts.map(action => `<li>Commande: <b>${action.command}</b> - ${action.description}</li>`).join('')
  return `<ul class="list-disc">${text}</ul>`
  }
})

const actions = {
  jackson: [
    helpCreator(j_actions),
    {
    ...j_actions[0],
    execute: async (params: string) => {
      const coordinates = await getCoordinatesByCity(params)
      const weather = await getWeatherByCoordinates(coordinates.lat, coordinates.lng)
      const text = await translateTo(weather.summary)
      return `${weather.temperature}˚C <img class="inline" src="https://api.iconify.design/bi/${weather.icon}.svg" /> <br /> ${text}`
    }
  },
  {
    ...j_actions[1],
    execute: async (params: string) => {
      const text = await translateTo(params, "ES")
      return `En Espagnol: ${text}`
    }
  }
],
  torador: [
    helpCreator(t_actions),
    {
      ...t_actions[0],
      execute: async (params: string) => {
        const def = await getMeaningWord(params)
        return translateTo(def)
      }
    },
    {
      ...t_actions[1],
      execute: async (params: string) => {
        const text = await translateTo(params, "EN-US")
        return `En Anglais Américain: ${text}`
      }
    }
  ] as BotAction[],
  mike: [
    helpCreator(m_actions),
    {
      ...m_actions[0],
      execute: async (params: string) => {
        const text = await translateTo(params, "ZH")
        return `En Chinois: ${text}`
      }
    },
] as BotAction[]
}

export const BOTS: BotData[] = [
  {
    name: "Jackson",
    avatar: "https://t3.ftcdn.net/jpg/01/36/49/90/360_F_136499077_xp7bSQB4Dx13ktQp0OYJ5ricWXhiFtD2.jpg",
    actions: actions.jackson
  },
  {
    name: "Torador",
    avatar: "https://www.shutterstock.com/image-vector/cute-chat-bot-smiling-flat-600nw-2175518705.jpg",
    actions: actions.torador
  },
  {
    name: "Mike",
    avatar: "https://st5.depositphotos.com/72897924/62255/v/450/depositphotos_622556394-stock-illustration-robot-web-icon-vector-illustration.jpg",
    actions: actions.mike
  }
]