document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal")
  
    const messages = [
      "Olá, seja muito mais que bem-vinda ao terminal, '@kalineray_'.",
      "Me chamo César, é um enorme prazer te conhecer!",
      "Tenho 17 anos, sou cristão e quero muito seguir na área de tecnologia.",
      "Então meio que queria encontrar alguém semelhante, pra ter uma certa motivação.",
      "Em minha escola pouquíssimas pessoas queriam essa área, e as que queriam desistiram...",
      "Foi quando seu Instagram apareceu pra mim nos 'recomendados', acho que por conta da Hack in Cariri (peguei top 1 em um desafio lá tá) ou Expoanime talvez.",
      "Eu sei que poderia ter mandado mensagem normalmente e tals, mas acho que assim é bem mais divertido né?",
      "Bem, antes de tudo, vamos fazer um pequeno desafio, ok?",
      "Existe uma senha escondida nessa página, preciso que você encontre ela.",
      "Após encontrar, por favor digite-a no campo abaixo:",
    ]
  
    const afterPasswordMessages = [
      "Caramba, você realmente encontrou a senha!",
      "Você definitivamente é uma pessoa inteligente viu.",
      "Acho que poucas pessoas pensariam em abrir o console do navegador assim do nada...",
      "De toda forma...",
      "Não, na verdade ainda não está na hora certa, preciso que você resolva mais algumas coisas...",
      "Uma vez minha mãe me disse que as garotas bonitas costumam prestar muita atenção nos detalhes.",
      "Será que isso realmente é uma verdade?",
      "Bom, coloquei outra senha escondida aqui, essa é bem mais simples tá, eu acho.",
      "É bem mais relacionada a sua observação do que sobre seu conhecimento em si...",
      "Bem, quando encontrar, já sabe o que fazer:",
    ]
    const finalMessages = [
      "Carambaaaaaaaa, você encontrou essa também!!!",
      "Essa senha na verdade, é a data do dia em que eu nasci...",
      "Você realmente é uma ótima observadora viu!",
      "Admito que eu tinha muitas expectativas, mas você realmente é incrível!",
      "Sinto que isso pode me motivar a evoluir muitooo!!!",
      "Finalmente encontrei alguém do mesmo ramo que eu!",
      "Pera, você quer seguir na programação também né? Acho que esqueci de perguntar isso antes...",
      "Perdão, acabei me empolgando muito, mas bem, caso essa seja a área que você deseja mesmo...",
      "Peço que observe a última senha que você encontrou.",
      "Porém, faça isso somente se você estiver pronta.",
      "Com isso em mente...",
      "Vá exatamente onde você a encontrou e substitua ela pelo seguinte valor '250325.html'"
    ]
  
    let activeCursor = null
    let secretPassword = ""
    const secondPassword = "090907"
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
  
    function clearTerminal() {
      while (terminal.firstChild) {
        terminal.removeChild(terminal.firstChild)
      }
    }
    function generatePassword() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      let password = ""
      for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return password
    }
  
    function createPasswordInput() {
      const line = document.createElement("div")
      line.className = "terminal-line"
  
      const prompt = document.createElement("div")
      prompt.className = "terminal-prompt"
      prompt.textContent = ">"
  
      const inputContainer = document.createElement("div")
      inputContainer.className = "terminal-input-container"
  
      const input = document.createElement("input")
      input.type = "text"
      input.className = "terminal-input"
      input.placeholder = "Digite a senha aqui..."
      input.autofocus = true
  
      inputContainer.appendChild(input)
      line.appendChild(prompt)
      line.appendChild(inputContainer)
      terminal.appendChild(line)
  
      terminal.scrollTop = terminal.scrollHeight
  
      setTimeout(() => input.focus(), 100)
  
      return input
    }
  
    function displayMessages(index = 0) {
      if (index >= messages.length) {
        secretPassword = generatePassword()
        console.log("SENHA SECRETA:", secretPassword)
  
        setTimeout(() => {
          const input = createPasswordInput()
  
          input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              const enteredPassword = input.value
              input.disabled = true
              const { text } = createTerminalLine()
              text.textContent = enteredPassword
  
              setTimeout(() => {
                if (enteredPassword === secretPassword) {
                  const { text } = createTerminalLine()
                  typeText("Senha correta! Executando comando: clear", text, () => {
                    setTimeout(() => {
                      clearTerminal()
                      displayAfterPasswordMessages(0)
                    }, 1500)
                  })
                } else {
                  const { text } = createTerminalLine()
                  typeText("Senha incorreta! Tente novamente.", text, () => {
                    createPasswordInput().addEventListener("keydown", handlePasswordInput)
                  })
                }
              }, 500)
            }
          })
  
          function handlePasswordInput(e) {
            if (e.key === "Enter") {
              const enteredPassword = this.value
              this.disabled = true
              const { text } = createTerminalLine()
              text.textContent = enteredPassword
  
              setTimeout(() => {
                if (enteredPassword === secretPassword) {
                  const { text } = createTerminalLine()
                  typeText("Senha correta! Executando comando: clear", text, () => {
                    setTimeout(() => {
                      clearTerminal()
                      displayAfterPasswordMessages(0)
                    }, 1500)
                  })
                } else {
                  const { text } = createTerminalLine()
                  typeText("Senha incorreta! Tente novamente.", text, () => {
                    createPasswordInput().addEventListener("keydown", handlePasswordInput)
                  })
                }
              }, 500)
            }
          }
        }, 1000)
  
        return
      }
  
      const { text } = createTerminalLine()
  
      typeText(messages[index], text, () => {
        setTimeout(() => {
          displayMessages(index + 1)
        }, 1000)
      })

      terminal.scrollTop = terminal.scrollHeight
    }

    function displayAfterPasswordMessages(index = 0) {
      if (index >= afterPasswordMessages.length) {
        setTimeout(() => {
          const input = createPasswordInput()
  
          input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              const enteredPassword = input.value
              input.disabled = true

              const { text } = createTerminalLine()
              text.textContent = enteredPassword
  
              setTimeout(() => {
                if (enteredPassword === secondPassword) {
                  const { text } = createTerminalLine()
                  typeText("Senha correta! Executando comando: clear", text, () => {
                    setTimeout(() => {
                      clearTerminal()
                      displayFinalMessages(0)
                    }, 1500)
                  })
                } else {
                  const { text } = createTerminalLine()
                  typeText("Senha incorreta! Tente novamente.", text, () => {
                    createPasswordInput().addEventListener("keydown", handleSecondPasswordInput)
                  })
                }
              }, 500)
            }
          })
  
          function handleSecondPasswordInput(e) {
            if (e.key === "Enter") {
              const enteredPassword = this.value
              this.disabled = true
              const { text } = createTerminalLine()
              text.textContent = enteredPassword
  
              setTimeout(() => {
                if (enteredPassword === secondPassword) {
                  const { text } = createTerminalLine()
                  typeText("Senha correta! Executando comando: clear", text, () => {
                    setTimeout(() => {
                      clearTerminal()
                      displayFinalMessages(0)
                    }, 1500)
                  })
                } else {
                  const { text } = createTerminalLine()
                  typeText("Senha incorreta! Tente novamente.", text, () => {
                    createPasswordInput().addEventListener("keydown", handleSecondPasswordInput)
                  })
                }
              }, 500)
            }
          }
        }, 1000)
  
        return
      }
  
      const { text } = createTerminalLine()
  
      typeText(afterPasswordMessages[index], text, () => {
        setTimeout(() => {
          displayAfterPasswordMessages(index + 1)
        }, 1000)
      })

      terminal.scrollTop = terminal.scrollHeight
    }

    function displayFinalMessages(index = 0) {
      if (index >= finalMessages.length) return
  
      const { text } = createTerminalLine()
  
      typeText(finalMessages[index], text, () => {

        setTimeout(() => {
          displayFinalMessages(index + 1)
        }, 1000)
      })

      terminal.scrollTop = terminal.scrollHeight
    }
  
    setTimeout(() => {
      displayMessages()
    }, 1000)
  })
  
  