class RecintosZoo {
    constructor() {
        // Definindo as espécies de animais
        this.animais = [
            { especie: 'Leao', tamanho: 3, bioma: 'Savana' },
            { especie: 'Leopardo', tamanho: 2, bioma: 'Savana' },
            { especie: 'Crocodilo', tamanho: 3, bioma: 'Rio' },
            { especie: 'Macaco', tamanho: 1, bioma: ['Savana', 'Floresta'] },
            { especie: 'Gazela', tamanho: 2, bioma: 'Savana' },
            { especie: 'Hipopotamo', tamanho: 4, bioma: ['Savana', 'Rio'] }
        ];

        // Definindo os recintos do zoológico
        this.recintos = [
            { recinto: 1, bioma: 'Savana', tamanho: 10, ocupacao: 3 },  // 3 Macacos já ocupam o recinto
            { recinto: 2, bioma: 'Floresta', tamanho: 5, ocupacao: 0 }, // Vazio
            { recinto: 3, bioma: ['Savana', 'Rio'], tamanho: 7, ocupacao: 2 }, // 1 Gazela já ocupa o recinto
            { recinto: 4, bioma: 'Rio', tamanho: 8, ocupacao: 0 },      // Vazio
            { recinto: 5, bioma: 'Savana', tamanho: 9, ocupacao: 3 }    // 1 Leão já ocupa o recinto
        ];
    }

    // Método para analisar quais recintos estão disponíveis para o animal especificado
    analisaRecintos(animal, quantidade) {
        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }
        // Encontrar o animal especificado na lista de animais
        const animalInfo = this.animais.find(a => a.especie.toLowerCase() === animal.toLowerCase());

        if (!animalInfo) {
            return { erro: 'Animal inválido' };
        }

        const { tamanho, bioma } = animalInfo;
        const tamanhoTotal = tamanho * quantidade;

        // Filtrar os recintos compatíveis com o bioma e com espaço disponível
        const recintosDisponiveis = this.recintos
            .filter(recinto => {
                // Verifica se o bioma é compatível
                const biomaCompativel = Array.isArray(animalInfo.bioma)
                    ? animalInfo.bioma.some(b => Array.isArray(recinto.bioma) ? recinto.bioma.includes(b) : recinto.bioma === b)
                    : Array.isArray(recinto.bioma)
                        ? recinto.bioma.includes(animalInfo.bioma)
                        : recinto.bioma === animalInfo.bioma;

                // Verifica se o recinto tem espaço suficiente disponível (tamanho total - ocupação)
                const espacoLivre = recinto.tamanho - recinto.ocupacao;
                const espacoSuficiente = espacoLivre >= tamanhoTotal;

                return biomaCompativel && espacoSuficiente;
            })
            .map(recinto => {
                const espacoLivre = recinto.tamanho - recinto.ocupacao;
                return `Recinto ${recinto.recinto} (espaço livre: ${espacoLivre - (tamanhoTotal - (recinto.tamanho - espacoLivre)) - recinto.ocupacao} total: ${recinto.tamanho})`;
            });
        if (recintosDisponiveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis: recintosDisponiveis };
    }
}

export { RecintosZoo as RecintosZoo };

const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos('Crocodilo', 1)); 