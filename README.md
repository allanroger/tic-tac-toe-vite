# Jogo da Velha (Tic Tac Toe) - React + Vite + Vitest + Docker

Este é um projeto completo de um **Jogo da Velha (Tic Tac Toe)** desenvolvido com **React** e empacotado com **Vite**. Ele possui funcionalidades modernas como:

- Modo escuro
- Timer para jogadas (turno limitado por tempo)
- Placar acumulativo (vitórias e empates)
- Customização de cores para jogadores
- Suporte a build e execução com Docker e Nginx

---

## 🎮 Como Jogar

- O jogo é disputado entre dois jogadores: `X` e `O`
- Cada jogador tem **5 segundos** para realizar sua jogada
- Caso o tempo esgote, o turno é passado automaticamente
- Vence quem alinhar 3 símbolos (horizontal, vertical ou diagonal)
- Empates são contabilizados no placar
- É possível reiniciar a partida ou zerar o placar a qualquer momento

---

## 🧠 Visão Geral e Justificativas Técnicas

| Tecnologia       | Justificativa |
|------------------|---------------|
| **React**        | Componentização eficiente da UI |
| **Vite**         | Build rápido e leve para projetos modernos |
| **Vitest**       | Testes rápidos e integrados ao ecossistema Vite |
| **Docker + Nginx** | Ambiente de produção leve e portátil |
| **@testing-library/react** | Foco em testes com comportamento real do usuário |
| **Hooks customizados (`useGameState`)** | Separação de lógica e controle de estado do jogo |

---

## 📁 Estrutura de Pastas

```
├── public/                # Arquivos públicos (favicons etc.)
├── src/
│   ├── components/        # Componentes React (Board, Square, etc.)
│   ├── hooks/             # Hook personalizado: useGameState
│   ├── utils/             # Funções auxiliares (ex: calculateWinner)
│   └── App.jsx            # Componente principal do app
├── tests/                 # Testes unitários (Vitest)
├── Dockerfile             # Build em duas etapas: node + nginx
├── docker-compose.yml     # Serviço web mapeado na porta 3000
├── nginx.conf             # Configuração customizada para React Router
└── README.md              # Este arquivo
```

---

## 🧪 Rodando os Testes

Antes de rodar os testes, instale as dependências:

```bash
npm install
```

Em seguida, execute os testes com:

```bash
npm run test
```

> Os testes usam `Vitest` com `jsdom` e `@testing-library/react`

---

## 🐳 Execução com Docker

### 1. Build e start do projeto

```bash
docker-compose up --build
```

Acesse [http://localhost:3000](http://localhost:3000)

### 2. Estrutura do container

- **Builder**: Node 18 com Alpine
- **Servidor**: Nginx Alpine servindo a build do Vite
- A porta 3000 é exposta para acesso local
