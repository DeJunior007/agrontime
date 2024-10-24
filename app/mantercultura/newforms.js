import { obterFazendas } from "../api/gerenciarFazendaApi";
import formsConfig from "./forms.json";

export const obterJson = async () => {
    try {
        const fazendas = await obterFazendas(); 
        let forms = formsConfig;

        forms.dados.safra.idFazenda.options = fazendas.data.map(fazenda => ({
            value: fazenda.idFazenda, 
            label: fazenda.nome
        }));

        return forms; 
    } catch (error) {
        console.error('Erro ao obter JSON:', error);
        throw error; 
    }
};
