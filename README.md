# History of Dune - Timeline Interativa

Uma linha do tempo interativa e visualmente impressionante do universo ficcional de Dune, criada com React, Tailwind CSS e Vite.

## 🏜️ Sobre o Projeto

Este projeto apresenta uma jornada cronológica através dos principais eventos do universo de Frank Herbert, desde a era pré-Butleriana até a Grande Dispersão. A interface combina design minimalista com animações suaves e interatividade rica, criando uma experiência imersiva para explorar a rica história de Dune.

## ✨ Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Transições e efeitos visuais inspirados no universo de Dune
- **Navegação por Eras**: Explore diferentes períodos históricos com navegação intuitiva
- **Modal Interativo**: Detalhes completos de cada evento em modais elegantes
- **Identidade Visual**: Paleta de cores inspirada nas areias de Arrakis
- **Performance Otimizada**: Carregamento rápido e animações fluidas

## 🎨 Design System

### Paleta de Cores
- **Primária**: Tons de âmbar e laranja (inspirados nas areias de Arrakis)
- **Secundária**: Gradientes suaves e transparências
- **Acentos**: Dourado e marrom para elementos de destaque

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Hierarquia**: Títulos em negrito, texto legível e espaçamento generoso

### Animações
- **Entrada**: Slide-in com delay escalonado
- **Hover**: Elevação e mudança de cor
- **Transições**: Curvas de bezier suaves para movimento natural

## 🚀 Tecnologias Utilizadas

- **React 19**: Framework principal
- **Tailwind CSS 4**: Estilização e design system
- **Vite**: Build tool e desenvolvimento
- **CSS Modules**: Estilos modulares e organizados

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── Timeline/
│       ├── Timeline.jsx          # Componente principal
│       ├── Timeline.css          # Estilos da timeline
│       ├── TimelineEvent.jsx     # Eventos individuais
│       ├── TimelineEvent.css     # Estilos dos eventos
│       ├── TimelineNavigation.jsx # Navegação entre eras
│       └── TimelineNavigation.css # Estilos da navegação
├── data/
│   └── timelineData.js           # Dados dos eventos
├── App.jsx                       # Componente raiz
└── index.css                     # Estilos globais
```

## 🎯 Funcionalidades

### Navegação por Eras
- **Pré-Butleriano**: Antes da Jihad Butleriana
- **Jihad Butleriana**: A guerra contra as máquinas
- **Era Imperial**: O Império Corrino
- **Era Atreides**: A ascensão dos Atreides
- **Pós-Paul**: Após Muad'Dib

### Interatividade
- **Hover Effects**: Feedback visual ao passar o mouse
- **Click Events**: Modais detalhados para cada evento
- **Smooth Transitions**: Animações entre mudanças de era
- **Responsive Design**: Adaptação automática para diferentes telas

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd history-of-dune

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria a build de produção
npm run preview  # Visualiza a build de produção
npm run lint     # Executa o linter
```

## 📱 Responsividade

O projeto é totalmente responsivo e otimizado para:

- **Desktop**: Layout completo com navegação horizontal
- **Tablet**: Adaptação para telas médias
- **Mobile**: Layout vertical otimizado para toque

## 🎨 Customização

### Adicionando Novos Eventos
Edite o arquivo `src/data/timelineData.js` para adicionar novos eventos:

```javascript
{
  id: 'novo-evento',
  era: 'imperial',
  title: 'Título do Evento',
  date: '10.000 AG',
  location: 'Localização',
  description: 'Descrição detalhada...',
  characters: ['Personagem 1', 'Personagem 2'],
  impact: 'Impacto do evento...'
}
```

### Modificando Estilos
- **Cores**: Edite as variáveis CSS em `src/index.css`
- **Animações**: Modifique os keyframes nos arquivos CSS dos componentes
- **Layout**: Ajuste as classes Tailwind nos componentes JSX

## 🔮 Próximas Funcionalidades

- [ ] Filtros por personagens
- [ ] Busca por eventos
- [ ] Modo escuro
- [ ] Animações 3D
- [ ] Sons ambientais
- [ ] Galeria de imagens
- [ ] Mapa interativo do universo

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- Frank Herbert pela criação do universo de Dune
- Comunidade React e Tailwind CSS
- Inspiração visual dos filmes e livros de Dune

---

*"O medo é o assassino da mente."* - Bene Gesserit
