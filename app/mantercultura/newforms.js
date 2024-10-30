import { obterColheitas, obterCultivos, obterFazendas, obterSafras, obterSementes, obterSolos } from "../api/gerenciarFazendaApi";
import formsConfig from "./forms.json";

export const obterJson = async () => {
    try {
        const fazendas = await obterFazendas(); 
        const cultivos = await obterCultivos(); 
        const sementes = await obterSementes(); 
        const safras = await obterSafras(); 
        const solos = await obterSolos(); 

        let forms = formsConfig;

        forms.dados.safra.idFazenda.options = fazendas.data.map(fazenda => ({
            value: fazenda.idFazenda , 
            label: fazenda.nome
        }));

        forms.dados.cultivo.idSolo.options = solos.data.map(fazenda => ({
            value: fazenda.idSolo, 
            label: fazenda.tipoSolo + '-' + fazenda.idSolo
        }));

        forms.dados.colheita.idCultivo.options = cultivos.data.map(fazenda => ({
            value: fazenda.idCultivo, 
            label: fazenda.nome 
        }));

        forms.dados.cultivo.idSemente.options = sementes.data.map(fazenda => ({
            value: fazenda.idSemente, 
            label: fazenda.nome 
        }));

        forms.dados.cultivo.idSafra.options = safras.data.map(fazenda => ({
            value: fazenda.idSafra, 
            label: fazenda.status + '-' + fazenda.idSafra
        }));

        return forms; 
    } catch (error) {
        console.error('Erro ao obter JSON:', error);
        throw error; 
    }
};
