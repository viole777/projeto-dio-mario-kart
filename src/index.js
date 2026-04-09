const readline = require('readline');

// Configuração do input do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para perguntar no terminal
function perguntar(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, resolve);
  });
}

// Definição do protagonista e seus atributos
const cloud = {
  NOME: "Cloud",
  NIVEL: 1,
  EXPERIENCIA: 0,
  EXPERIENCIA_PROXIMO_NIVEL: 100,
  FORCA: 5,
  PODER: 5,
  SORTE: 5,
  RESISTENCIA: 5,
  VELOCIDADE: 5,
  VIDA: 50,
  VIDA_MAXIMA: 50,
  PONTOS_ATRIBUTOS: 0,
};

// Lista de monstros que podem aparecer
const monstros = [
  { NOME: "Slime", FORCA: 3, PODER: 2, RESISTENCIA: 2, VELOCIDADE: 2, VIDA: 20, EXPERIENCIA: 30, NIVEL_MINIMO: 1 },
  { NOME: "Lobo Selvagem", FORCA: 5, PODER: 3, RESISTENCIA: 3, VELOCIDADE: 6, VIDA: 35, EXPERIENCIA: 50, NIVEL_MINIMO: 1 },
  { NOME: "Orc Guerreiro", FORCA: 7, PODER: 4, RESISTENCIA: 6, VELOCIDADE: 3, VIDA: 55, EXPERIENCIA: 80, NIVEL_MINIMO: 2 },
  { NOME: "Dragão Jovem", FORCA: 10, PODER: 8, RESISTENCIA: 7, VELOCIDADE: 5, VIDA: 90, EXPERIENCIA: 150, NIVEL_MINIMO: 3 },
  { NOME: "Cavaleiro das Sombras", FORCA: 8, PODER: 9, RESISTENCIA: 5, VELOCIDADE: 7, VIDA: 70, EXPERIENCIA: 120, NIVEL_MINIMO: 2 },
  { NOME: "Gigante da Montanha", FORCA: 12, PODER: 6, RESISTENCIA: 10, VELOCIDADE: 2, VIDA: 120, EXPERIENCIA: 200, NIVEL_MINIMO: 3 }
];

// Lista de NPCs amigáveis
const npcs = [
  { NOME: "Velho Sábio", ACAO: "Curou suas feridas!", EFEITO: { VIDA: 20, EXPERIENCIA: 0 }, MENSAGEM: "Aqui, tome esta poção de cura!" },
  { NOME: "Comerciante Viajante", ACAO: "Te deu itens valiosos!", EFEITO: { VIDA: 0, EXPERIENCIA: 40 }, MENSAGEM: "Você parece promissor, aceite este presente!" },
  { NOME: "Treinador Mestre", ACAO: "Te treinou e aumentou seus atributos!", EFEITO: { VIDA: 0, EXPERIENCIA: 60 }, MENSAGEM: "Deixe-me te ensinar algumas técnicas!" },
  { NOME: "Fada da Sorte", ACAO: "Abençoou sua jornada!", EFEITO: { VIDA: 0, EXPERIENCIA: 80 }, MENSAGEM: "Que a sorte esteja sempre ao seu lado!" }
];

// Lista de loots
const loots = [
  { NOME: "Poção de Cura Pequena", EFEITO: { VIDA: 15, EXPERIENCIA: 0, FORCA: 0, PODER: 0, SORTE: 0, RESISTENCIA: 0, VELOCIDADE: 0 }, MENSAGEM: "Você encontrou uma poção que restaura 15 de vida!" },
  { NOME: "Poção de Cura Grande", EFEITO: { VIDA: 35, EXPERIENCIA: 0, FORCA: 0, PODER: 0, SORTE: 0, RESISTENCIA: 0, VELOCIDADE: 0 }, MENSAGEM: "Você encontrou uma poção poderosa que restaura 35 de vida!" },
  { NOME: "Elixir de Experiência", EFEITO: { VIDA: 0, EXPERIENCIA: 50, FORCA: 0, PODER: 0, SORTE: 0, RESISTENCIA: 0, VELOCIDADE: 0 }, MENSAGEM: "Você encontrou um elixir místico que concede 50 de experiência!" },
  { NOME: "Essência de Poder", EFEITO: { VIDA: 0, EXPERIENCIA: 0, FORCA: 2, PODER: 0, SORTE: 0, RESISTENCIA: 0, VELOCIDADE: 0 }, MENSAGEM: "Você sente sua força aumentar permanentemente!" },
  { NOME: "Tomo da Sabedoria", EFEITO: { VIDA: 0, EXPERIENCIA: 0, FORCA: 0, PODER: 2, SORTE: 0, RESISTENCIA: 0, VELOCIDADE: 0 }, MENSAGEM: "O conhecimento mágico flui através de você!" },
  { NOME: "Amuleto da Sorte", EFEITO: { VIDA: 0, EXPERIENCIA: 0, FORCA: 0, PODER: 0, SORTE: 2, RESISTENCIA: 0, VELOCIDADE: 0 }, MENSAGEM: "Você se sente mais sortudo!" },
  { NOME: "Armadura Reforçada", EFEITO: { VIDA: 0, EXPERIENCIA: 0, FORCA: 0, PODER: 0, SORTE: 0, RESISTENCIA: 2, VELOCIDADE: 0 }, MENSAGEM: "Sua resistência aumenta!" },
  { NOME: "Botas da Velocidade", EFEITO: { VIDA: 0, EXPERIENCIA: 0, FORCA: 0, PODER: 0, SORTE: 0, RESISTENCIA: 0, VELOCIDADE: 2 }, MENSAGEM: "Você se move mais rapidamente!" },
  { NOME: "Baú de Tesouros", EFEITO: { VIDA: 0, EXPERIENCIA: 100, FORCA: 1, PODER: 1, SORTE: 1, RESISTENCIA: 1, VELOCIDADE: 1 }, MENSAGEM: "Tesouro lendário! Todos os seus atributos aumentam!" },
  { NOME: "Poção da Vitalidade", EFEITO: { VIDA: 50, EXPERIENCIA: 30, FORCA: 0, PODER: 0, SORTE: 0, RESISTENCIA: 0, VELOCIDADE: 0 }, MENSAGEM: "Você recupera toda sua vida e ganha experiência!" }
];

// Função que simula um dado de 12 lados
async function rollD12() {
  return Math.floor(Math.random() * 12) + 1;
}

// Função que sorteia o tipo de encontro
async function getRandomEncounter() {
  let dice = await rollD12();
  
  // 1-4: Monstro, 5-6: NPC amigável, 7-9: Loot, 10-12: Nada acontece
  if (dice <= 4) {
    return { TIPO: "MONSTRO", VALOR: dice };
  } else if (dice <= 6) {
    return { TIPO: "NPC", VALOR: dice };
  } else if (dice <= 9) {
    return { TIPO: "LOOT", VALOR: dice };
  } else {
    return { TIPO: "NADA", VALOR: dice };
  }
}

// Função para selecionar monstro baseado no nível do jogador
function selecionarMonstro(nivelJogador) {
  const monstrosDisponiveis = monstros.filter(m => m.NIVEL_MINIMO <= nivelJogador);
  const monstroAleatorio = monstrosDisponiveis[Math.floor(Math.random() * monstrosDisponiveis.length)];
  return { ...monstroAleatorio, VIDA_ATUAL: monstroAleatorio.VIDA };
}

// Função para selecionar NPC aleatório
function selecionarNPC() {
  return npcs[Math.floor(Math.random() * npcs.length)];
}

// Função para selecionar loot aleatório
function selecionarLoot() {
  return loots[Math.floor(Math.random() * loots.length)];
}

// Função para aplicar loot
function aplicarLoot(cloud, loot) {
  console.log(`\n🎁 ${loot.MENSAGEM}`);
  
  if (loot.EFEITO.VIDA > 0) {
    cloud.VIDA = Math.min(cloud.VIDA + loot.EFEITO.VIDA, cloud.VIDA_MAXIMA);
    console.log(`💚 +${loot.EFEITO.VIDA} de vida!`);
  }
  
  if (loot.EFEITO.EXPERIENCIA > 0) {
    cloud.EXPERIENCIA += loot.EFEITO.EXPERIENCIA;
    console.log(`✨ +${loot.EFEITO.EXPERIENCIA} de experiência!`);
  }
  
  if (loot.EFEITO.FORCA > 0) {
    cloud.FORCA += loot.EFEITO.FORCA;
    console.log(`💪 Força +${loot.EFEITO.FORCA}!`);
  }
  
  if (loot.EFEITO.PODER > 0) {
    cloud.PODER += loot.EFEITO.PODER;
    console.log(`🔮 Poder +${loot.EFEITO.PODER}!`);
  }
  
  if (loot.EFEITO.SORTE > 0) {
    cloud.SORTE += loot.EFEITO.SORTE;
    console.log(`🍀 Sorte +${loot.EFEITO.SORTE}!`);
  }
  
  if (loot.EFEITO.RESISTENCIA > 0) {
    cloud.RESISTENCIA += loot.EFEITO.RESISTENCIA;
    console.log(`🛡️ Resistência +${loot.EFEITO.RESISTENCIA}!`);
  }
  
  if (loot.EFEITO.VELOCIDADE > 0) {
    cloud.VELOCIDADE += loot.EFEITO.VELOCIDADE;
    console.log(`⚡ Velocidade +${loot.EFEITO.VELOCIDADE}!`);
  }
}

// Função para calcular dano baseado nos atributos
function calcularDano(atacante, defensor, tipoAtaque = "fisico") {
  let danoBase;
  
  if (tipoAtaque === "fisico") {
    danoBase = atacante.FORCA + Math.floor(Math.random() * 6);
  } else {
    danoBase = atacante.PODER + Math.floor(Math.random() * 8);
  }
  
  const reducaoDano = defensor.RESISTENCIA / 5;
  const danoFinal = Math.max(1, Math.floor(danoBase - reducaoDano));
  
  return danoFinal;
}

// Sistema de combate
async function combate(cloud, monstro) {
  console.log(`\n⚔️ Um ${monstro.NOME} selvagem apareceu! ⚔️`);
  console.log(`❤️ Vida do ${monstro.NOME}: ${monstro.VIDA_ATUAL}/${monstro.VIDA}`);
  console.log(`❤️ Vida do Cloud: ${cloud.VIDA}/${cloud.VIDA_MAXIMA}\n`);
  
  let combateAtivo = true;
  let rodada = 1;
  
  while (combateAtivo) {
    console.log(`--- Rodada ${rodada} ---`);
    
    console.log("\n🎮 Escolha sua ação:");
    console.log("1 - Ataque Físico");
    console.log("2 - Ataque Mágico");
    console.log("3 - Tentar Fugir (precisa de sorte > 8)");
    
    let escolha = await perguntar("Digite o número da ação: ");
    
    // Determina quem ataca primeiro baseado na velocidade
    let primeiroAtacante = cloud.VELOCIDADE >= monstro.VELOCIDADE ? "CLOUD" : "MONSTRO";
    
    if (primeiroAtacante === "CLOUD") {
      // Turno do Cloud
      if (escolha === "1") {
        const dano = calcularDano(cloud, monstro, "fisico");
        monstro.VIDA_ATUAL -= dano;
        console.log(`🗡️ Cloud causou ${dano} de dano físico ao ${monstro.NOME}!`);
      } else if (escolha === "2") {
        const dano = calcularDano(cloud, monstro, "magico");
        monstro.VIDA_ATUAL -= dano;
        console.log(`🔮 Cloud causou ${dano} de dano mágico ao ${monstro.NOME}!`);
      } else if (escolha === "3") {
        const sorteTeste = await rollD12();
        const sorteTotal = sorteTeste + cloud.SORTE;
        console.log(`🎲 Sorte: ${sorteTeste} + ${cloud.SORTE} = ${sorteTotal}`);
        if (sorteTotal > 15) {
          console.log("🏃‍♂️ Você conseguiu fugir do combate!");
          return true; // Fugiu
        } else {
          console.log("😰 Falha ao tentar fugir!");
          // Monstro ataca por ter tentado fugir
          const danoMonstro = calcularDano(monstro, cloud);
          cloud.VIDA -= danoMonstro;
          console.log(`💥 ${monstro.NOME} aproveitou sua distração e causou ${danoMonstro} de dano!`);
        }
      } else {
        console.log("Opção inválida! Usando ataque físico.");
        const dano = calcularDano(cloud, monstro, "fisico");
        monstro.VIDA_ATUAL -= dano;
        console.log(`🗡️ Cloud causou ${dano} de dano físico ao ${monstro.NOME}!`);
      }
      
      // Verifica se monstro morreu
      if (monstro.VIDA_ATUAL <= 0) {
        console.log(`\n✅ Vitória! Cloud derrotou o ${monstro.NOME}!`);
        const expGanha = monstro.EXPERIENCIA;
        cloud.EXPERIENCIA += expGanha;
        console.log(`✨ Ganhou ${expGanha} de experiência!`);
        return true; // Venceu
      }
      
      // Turno do monstro (se ainda estiver vivo e não fugiu)
      if (escolha !== "3" || (escolha === "3" && sorteTotal <= 15)) {
        console.log(`\n👾 Turno do ${monstro.NOME}:`);
        const danoMonstro = calcularDano(monstro, cloud);
        cloud.VIDA -= danoMonstro;
        console.log(`💥 ${monstro.NOME} causou ${danoMonstro} de dano em Cloud!`);
        
        // Verifica se Cloud morreu
        if (cloud.VIDA <= 0) {
          console.log(`\n💀 Game Over! Cloud foi derrotado pelo ${monstro.NOME}...`);
          return false; // Perdeu
        }
      }
      
    } else {
      // Monstro ataca primeiro
      console.log(`\n👾 Turno do ${monstro.NOME}:`);
      const danoMonstro = calcularDano(monstro, cloud);
      cloud.VIDA -= danoMonstro;
      console.log(`💥 ${monstro.NOME} causou ${danoMonstro} de dano em Cloud!`);
      
      if (cloud.VIDA <= 0) {
        console.log(`\n💀 Game Over! Cloud foi derrotado pelo ${monstro.NOME}...`);
        return false;
      }
      
      // Turno do Cloud
      console.log("\n🎮 Sua vez de agir!");
      console.log("1 - Ataque Físico");
      console.log("2 - Ataque Mágico");
      console.log("3 - Tentar Fugir");
      
      escolha = await perguntar("Digite o número da ação: ");
      
      if (escolha === "1") {
        const dano = calcularDano(cloud, monstro, "fisico");
        monstro.VIDA_ATUAL -= dano;
        console.log(`🗡️ Cloud causou ${dano} de dano físico ao ${monstro.NOME}!`);
      } else if (escolha === "2") {
        const dano = calcularDano(cloud, monstro, "magico");
        monstro.VIDA_ATUAL -= dano;
        console.log(`🔮 Cloud causou ${dano} de dano mágico ao ${monstro.NOME}!`);
      } else if (escolha === "3") {
        const sorteTeste = await rollD12();
        const sorteTotal = sorteTeste + cloud.SORTE;
        console.log(`🎲 Sorte: ${sorteTeste} + ${cloud.SORTE} = ${sorteTotal}`);
        if (sorteTotal > 15) {
          console.log("🏃‍♂️ Você conseguiu fugir do combate!");
          return true;
        } else {
          console.log("😰 Falha ao tentar fugir!");
        }
      }
      
      if (monstro.VIDA_ATUAL <= 0) {
        console.log(`\n✅ Vitória! Cloud derrotou o ${monstro.NOME}!`);
        const expGanha = monstro.EXPERIENCIA;
        cloud.EXPERIENCIA += expGanha;
        console.log(`✨ Ganhou ${expGanha} de experiência!`);
        return true;
      }
    }
    
    console.log(`\n❤️ Vida Cloud: ${cloud.VIDA}/${cloud.VIDA_MAXIMA}`);
    console.log(`❤️ Vida ${monstro.NOME}: ${monstro.VIDA_ATUAL}/${monstro.VIDA}`);
    rodada++;
    
    if (rodada > 10) {
      console.log("\n⏰ O combate se estendeu demais! Um empate foi declarado.");
      return false;
    }
  }
  
  return false;
}

// Função para interagir com NPC
function interagirComNPC(cloud, npc) {
  console.log(`\n👤 Você encontrou ${npc.NOME}!`);
  console.log(`💬 "${npc.MENSAGEM}"`);
  
  if (npc.EFEITO.VIDA > 0) {
    cloud.VIDA = Math.min(cloud.VIDA + npc.EFEITO.VIDA, cloud.VIDA_MAXIMA);
    console.log(`💚 ${npc.ACAO} +${npc.EFEITO.VIDA} de vida!`);
  }
  
  if (npc.EFEITO.EXPERIENCIA > 0) {
    cloud.EXPERIENCIA += npc.EFEITO.EXPERIENCIA;
    console.log(`✨ ${npc.ACAO} +${npc.EFEITO.EXPERIENCIA} de experiência!`);
  }
  
  if (npc.NOME === "Treinador Mestre") {
    const atributoMelhorado = Math.floor(Math.random() * 5);
    const atributos = ["FORCA", "PODER", "SORTE", "RESISTENCIA", "VELOCIDADE"];
    const atributoNome = atributos[atributoMelhorado];
    cloud[atributoNome] += 2;
    console.log(`📈 ${atributoNome} aumentou em 2 pontos!`);
  }
}

// Função para verificar e aplicar level up
async function verificarLevelUp(cloud) {
  let levelUpOcorrido = false;
  
  while (cloud.EXPERIENCIA >= cloud.EXPERIENCIA_PROXIMO_NIVEL) {
    cloud.NIVEL++;
    cloud.EXPERIENCIA -= cloud.EXPERIENCIA_PROXIMO_NIVEL;
    cloud.EXPERIENCIA_PROXIMO_NIVEL = Math.floor(cloud.EXPERIENCIA_PROXIMO_NIVEL * 1.5);
    cloud.PONTOS_ATRIBUTOS += 5;
    cloud.VIDA_MAXIMA += 15;
    cloud.VIDA = cloud.VIDA_MAXIMA;
    
    console.log(`\n🌟🌟 LEVEL UP! Cloud alcançou o nível ${cloud.NIVEL}! 🌟🌟`);
    console.log(`✨ Ganhou 5 pontos para distribuir nos atributos!`);
    console.log(`❤️ Vida máxima aumentou para ${cloud.VIDA_MAXIMA}`);
    
    levelUpOcorrido = true;
  }
  
  if (levelUpOcorrido) {
    await distribuirPontosAtributos(cloud);
  }
}

// Função para distribuir pontos de atributos
async function distribuirPontosAtributos(cloud) {
  while (cloud.PONTOS_ATRIBUTOS > 0) {
    console.log(`\n📊 Pontos restantes para distribuir: ${cloud.PONTOS_ATRIBUTOS}`);
    console.log("Atributos atuais:");
    console.log(`💪 Força: ${cloud.FORCA}`);
    console.log(`🔮 Poder: ${cloud.PODER}`);
    console.log(`🍀 Sorte: ${cloud.SORTE}`);
    console.log(`🛡️ Resistência: ${cloud.RESISTENCIA}`);
    console.log(`⚡ Velocidade: ${cloud.VELOCIDADE}`);
    console.log("\nEscolha um atributo para aumentar:");
    console.log("1 - Força");
    console.log("2 - Poder");
    console.log("3 - Sorte");
    console.log("4 - Resistência");
    console.log("5 - Velocidade");
    
    const escolha = await perguntar("Digite o número do atributo: ");
    
    switch(escolha) {
      case "1":
        cloud.FORCA++;
        console.log("💪 Força aumentou para " + cloud.FORCA + "!");
        break;
      case "2":
        cloud.PODER++;
        console.log("🔮 Poder aumentou para " + cloud.PODER + "!");
        break;
      case "3":
        cloud.SORTE++;
        console.log("🍀 Sorte aumentou para " + cloud.SORTE + "!");
        break;
      case "4":
        cloud.RESISTENCIA++;
        console.log("🛡️ Resistência aumentou para " + cloud.RESISTENCIA + "!");
        break;
      case "5":
        cloud.VELOCIDADE++;
        console.log("⚡ Velocidade aumentou para " + cloud.VELOCIDADE + "!");
        break;
      default:
        console.log("Opção inválida! Tentando novamente...");
        continue;
    }
    
    cloud.PONTOS_ATRIBUTOS--;
  }
}

// Função principal do jogo
async function jogarRPG() {
  console.log("🌟 Bem-vindo ao RPG: A Jornada de Cloud! 🌟");
  console.log("🎲 Um dado de 12 lados determinará seu destino...");
  console.log("💡 Digite 'next' para rolar o dado e explorar a região!\n");
  
  let continuarJogando = true;
  let encontrosRealizados = 0;
  
  while (continuarJogando && cloud.VIDA > 0) {
    const comando = await perguntar("\n📝 Digite 'next' para continuar sua jornada: ");
    
    if (comando.toLowerCase() !== 'next') {
      console.log("Comando inválido! Digite 'next' para continuar.");
      continue;
    }
    
    console.log(`\n🏔️ Explorando a região... (Encontro ${encontrosRealizados + 1})`);
    console.log(`📊 Status - Nível: ${cloud.NIVEL} | Vida: ${cloud.VIDA}/${cloud.VIDA_MAXIMA} | EXP: ${cloud.EXPERIENCIA}/${cloud.EXPERIENCIA_PROXIMO_NIVEL}`);
    console.log(`💪 Força:${cloud.FORCA} 🔮 Poder:${cloud.PODER} 🍀 Sorte:${cloud.SORTE} 🛡️ Res:${cloud.RESISTENCIA} ⚡ Vel:${cloud.VELOCIDADE}`);
    
    // Sorteia o encontro
    const encontro = await getRandomEncounter();
    console.log(`\n🎲 Rolando o D12... Resultado: ${encontro.VALOR}`);
    
    if (encontro.TIPO === "MONSTRO") {
      const monstro = selecionarMonstro(cloud.NIVEL);
      const venceu = await combate(cloud, monstro);
      
      if (!venceu) {
        console.log("\n🏁 Fim da jornada... Obrigado por jogar!");
        rl.close();
        break;
      }
      
      // Recupera um pouco de vida após combate
      const vidaRecuperada = Math.floor(cloud.RESISTENCIA / 2);
      cloud.VIDA = Math.min(cloud.VIDA + vidaRecuperada, cloud.VIDA_MAXIMA);
      console.log(`💚 Você recuperou ${vidaRecuperada} de vida após o combate!`);
      
    } else if (encontro.TIPO === "NPC") {
      const npc = selecionarNPC();
      interagirComNPC(cloud, npc);
    } else if (encontro.TIPO === "LOOT") {
      const loot = selecionarLoot();
      aplicarLoot(cloud, loot);
    } else {
      console.log("\n🍃 A região está tranquila... Nada acontece desta vez.");
      // Recupera um pouco de vida por descanso
      const vidaRecuperada = Math.floor(cloud.RESISTENCIA / 3);
      cloud.VIDA = Math.min(cloud.VIDA + vidaRecuperada, cloud.VIDA_MAXIMA);
      console.log(`💚 Você descansou e recuperou ${vidaRecuperada} de vida.`);
    }
    
    // Verifica level up
    await verificarLevelUp(cloud);
    
    encontrosRealizados++;
    
    if (encontrosRealizados >= 15) {
      console.log("\n🎉🎉🎉 PARABÉNS! Você completou 15 encontros e venceu o jogo! 🎉🎉🎉");
      console.log(`🏆 Cloud alcançou o nível ${cloud.NIVEL} com os seguintes atributos finais:`);
      console.log(`💪 Força: ${cloud.FORCA}`);
      console.log(`🔮 Poder: ${cloud.PODER}`);
      console.log(`🍀 Sorte: ${cloud.SORTE}`);
      console.log(`🛡️ Resistência: ${cloud.RESISTENCIA}`);
      console.log(`⚡ Velocidade: ${cloud.VELOCIDADE}`);
      console.log(`❤️ Vida máxima: ${cloud.VIDA_MAXIMA}`);
      continuarJogando = false;
      rl.close();
    } else {
      console.log("\n" + "=".repeat(60));
    }
  }
}

// Inicia o jogo
jogarRPG();