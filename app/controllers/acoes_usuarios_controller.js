const AcoesUsuarios = require('../models/acao_usuario');
const TOKEN="87uj99882320of"

const AcoesUsuariosController = {
    index: async (req,res,next)=>{
        if(req.headers.token==TOKEN){
            const acoesUsuarios = await AcoesUsuarios.find({});
            return res.status(200).send(acoesUsuarios);
        }else{
            res.status(401).send({error:'Acesso negado API produtos-Token header inválido'});
        }
    },

    create: async(req,res,next) =>{
        if(req.headers.token == TOKEN){
            try{
                await AcoesUsuarios.create({
                codigo_usuario:req.body.codigo_usuario,
                codigo_acao: req.body.codigo_acao,
                valor_investido: req.body.valor_investido
                });
                res.status(204).send({});
            }
            catch(err){
                res.status(401).send(`Erro:${err}`);
            }
        }else{
            res.status(401).send(`Acesso negado, token inválido`)
        }
    },

    valor_investido: async(req, res, next) =>{
        if(req.headers.token == TOKEN){
            const {codigo_usuario, codigo_acao} = req.body;
            try{
                const retorno = await AcoesUsuarios.valorInvestidoPorAcao(codigo_usuario, codigo_acao);
                res.status(200).send({total: retorno.total, acao: retorno.acao});
            }
            catch(err){
                res.status(401).send(`Erro:${err}`);
            }
        }else{
            res.status(401).send(`Acesso negado, token inválido`)
        }
    },

}

module.exports = AcoesUsuariosController;