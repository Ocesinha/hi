document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminal")
  const messages = [
    "...",
    "De verdade, estou impressionado.",
    "Deu muitoooo trabalho construir isso tudo.",
    "E você se esforçou pra chegar até aqui...",
    "Isso me deixa feliz, me faz pensar que o esforço não foi em vão sabe.",
    "Mas...",
    "As próximas mensagens serão para te dar um tempo de reflexão.",
    "Controle sua mente, deixe a calma tomar conta de seu coração...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "Então...",
    "...",
    "...",
    "...",
    "Podemos ser amigos?",
    "Essa resposta deve ser enviada no chat do instagram '@10.cesar_'",
    "Seja ela positiva ou negativa! (mas eu sou muito legal tá prometo)",
    "Então, obrigado por chegar até aquiii!!!",
    "Ficou muito massa né? Eu sei eu sei!",
    "Até mais tarde! Responderei você em breve!"
  ]

  let activeCursor = null
  function createTerminalLine() {
    const line = document.createElement("div")
    line.className = "terminal-line"

    const prompt = document.createElement("div")
    prompt.className = "terminal-prompt"
    prompt.textContent = "$"

    const text = document.createElement("div")
    text.className = "terminal-text"

    line.appendChild(prompt)
    line.appendChild(text)
    terminal.appendChild(line)

    return { line, text }
  }
  function typeText(text, element, onComplete) {
    if (activeCursor) {
      activeCursor.remove()
    }
    activeCursor = document.createElement("div")
    activeCursor.className = "terminal-cursor"
    element.appendChild(activeCursor)

    let index = 0
    const characters = text.split("")

    function type() {
      if (index < characters.length) {
        const textNode = document.createTextNode(characters[index])
        element.insertBefore(textNode, activeCursor)
        index++
        const typingSpeed = Math.floor(Math.random() * 50) + 50
        setTimeout(type, typingSpeed)
      } else {
        setTimeout(() => {
          if (onComplete) onComplete()
        }, 500)
      }
    }

    type()
  }

  function displayMessages(index = 0) {
    if (index >= messages.length) return

    const { text } = createTerminalLine()

    typeText(messages[index], text, () => {
      setTimeout(() => {
        displayMessages(index + 1)
      }, 1000)
    })
    terminal.scrollTop = terminal.scrollHeight
  }

  setTimeout(() => {
    displayMessages()
  }, 1000)
})

