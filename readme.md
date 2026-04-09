# ⚔️ RPG.JS - A Jornada de Cloud

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)

![RPG Banner](./docs/rpg-header.gif)

## 🎮 Sobre o Projeto

**RPG.JS** é um jogo de RPG baseado em texto, desenvolvido em JavaScript para o terminal. O jogador controla **Cloud**, um guerreiro em busca de aventuras, enfrentando monstros, encontrando NPCs amigáveis e descobrindo tesouros enquanto evolui seu personagem.

> 🎯 **Desafio do Felipão**: Criar uma lógica de jogo RPG com sistema de combate, level up e atributos!

---

## 📖 História

Cloud, um aventureiro solitário, parte em uma jornada para explorar terras desconhecidas. Armado apenas com sua espada e determinação, ele precisa enfrentar criaturas perigosas, fazer aliados e coletar tesouros para se tornar mais forte. **Sua missão:** sobreviver a 15 encontros e provar seu valor!

---

## 👤 Personagem Principal

### Cloud - O Guerreiro Solitário

| Atributo | Valor Inicial | Descrição |
|----------|---------------|-----------|
| **Nível** | 1 | Quanto maior, mais forte |
| **Vida** | 50/50 | Pontos de vida (não pode cair a 0) |
| **Experiência** | 0/100 | Evolui para subir de nível |
| **Força** | 5 | Dano em ataques físicos |
| **Poder** | 5 | Dano em ataques mágicos |
| **Sorte** | 5 | Chance de fugir e encontrar itens raros |
| **Resistência** | 5 | Reduz dano recebido |
| **Velocidade** | 5 | Define quem ataca primeiro |

---

## 👾 Monstros

| Nome | Força | Poder | Resistência | Velocidade | Vida | EXP | Nível Mínimo |
|------|-------|-------|-------------|------------|------|-----|--------------|
| **Slime** 🟢 | 3 | 2 | 2 | 2 | 20 | 30 | 1 |
| **Lobo Selvagem** 🐺 | 5 | 3 | 3 | 6 | 35 | 50 | 1 |
| **Orc Guerreiro** 🟢 | 7 | 4 | 6 | 3 | 55 | 80 | 2 |
| **Cavaleiro das Sombras** ⚫ | 8 | 9 | 5 | 7 | 70 | 120 | 2 |
| **Dragão Jovem** 🐉 | 10 | 8 | 7 | 5 | 90 | 150 | 3 |
| **Gigante da Montanha** 🪨 | 12 | 6 | 10 | 2 | 120 | 200 | 3 |

---

## 👥 NPCs Amigáveis

| NPC | Efeito | Mensagem |
|-----|--------|----------|
| **Velho Sábio** 🧙 | +20 de Vida | "Aqui, tome esta poção de cura!" |
| **Comerciante Viajante** 🧳 | +40 de EXP | "Você parece promissor, aceite este presente!" |
| **Treinador Mestre** 🥋 | +2 em atributo aleatório | "Deixe-me te ensinar algumas técnicas!" |
| **Fada da Sorte** ✨ | +80 de EXP | "Que a sorte esteja sempre ao seu lado!" |

---

## 🎁 Loots e Tesouros

| Item | Efeito | Raridade |
|------|--------|----------|
| **Poção de Cura Pequena** 🧪 | +15 Vida | Comum |
| **Poção de Cura Grande** 🧪✨ | +35 Vida | Incomum |
| **Elixir de Experiência** 💫 | +50 EXP | Incomum |
| **Essência de Poder** 💪 | +2 Força (permanente) | Raro |
| **Tomo da Sabedoria** 📖 | +2 Poder (permanente) | Raro |
| **Amuleto da Sorte** 🍀 | +2 Sorte (permanente) | Raro |
| **Armadura Reforçada** 🛡️ | +2 Resistência (permanente) | Raro |
| **Botas da Velocidade** 👢 | +2 Velocidade (permanente) | Raro |
| **Poção da Vitalidade** 💚 | +50 Vida +30 EXP | Muito Raro |
| **Baú de Tesouros** 👑 | +1 em todos atributos +100 EXP | **LENDÁRIO** |

---

## 🕹️ Regras e Mecânicas

### 📋 Sistema de Progressão

- ✅ **Level Up**: Ao acumular experiência, Cloud sobe de nível
- ✅ **Atributos**: Ganha 5 pontos para distribuir a cada nível
- ✅ **Vida Máxima**: Aumenta 15 pontos por nível

### 🎲 Sistema de Encontros

Um **dado de 12 lados** decide o destino:

| Resultado | Tipo | Chance |
|-----------|------|--------|
| 1-4 | 🐉 **Monstro** | 33.3% |
| 5-6 | 👤 **NPC Amigável** | 16.7% |
| 7-9 | 🎁 **Loot** | 25% |
| 10-12 | 🍃 **Nada** | 25% |

### ⚔️ Sistema de Combate

#### Ações disponíveis:
1. **Ataque Físico** - Baseado na Força
2. **Ataque Mágico** - Baseado no Poder
3. **Tentar Fugir** - Requer Sorte > 15

#### Cálculo de Dano:
```javascript
danoFisico = FORÇA + (dado 1-6) - (resistência do inimigo / 5)
danoMagico = PODER + (dado 1-8) - (resistência do inimigo / 5)